# NexusLink Phase 1 — Implementation Design

**Date:** 2026-03-31
**Status:** Approved
**Scope:** Phase 1 — Core + CLI + Skills foundation (~90 days)

---

## 1. Overview

NexusLink is a three-layer protocol implementation:

- **Core** (`@nexuslink/core-*`) — all business logic, TypeScript SDK
- **CLI** (`@nexuslink/cli`) — `nexus` command-line tool for developers
- **Skills** (`@nexuslink/skills`) — Agent platform integration (OpenClaw, Claude Code)

Build approach: **CLI-first vertical slices**. Each slice delivers a working CLI command group, the Core module it depends on, and tests. The CLI's requirements drive what Core APIs must exist.

---

## 2. Repository Structure

```
nexuslink/
├── packages/
│   ├── core-config/          # @nexuslink/core-config
│   ├── core-identity/        # @nexuslink/core-identity
│   ├── core-sal/             # @nexuslink/core-sal
│   ├── core-memory/          # @nexuslink/core-memory
│   ├── core-acp/             # @nexuslink/core-acp
│   ├── core-nss/             # @nexuslink/core-nss
│   ├── core-governance/      # @nexuslink/core-governance
│   ├── core-settlement/      # @nexuslink/core-settlement
│   ├── cli/                  # @nexuslink/cli  →  "nexus" binary
│   └── skills/               # @nexuslink/skills
├── contracts/                # Solidity (Hardhat project)
│   ├── DIDRegistry.sol
│   ├── NSSRegistry.sol
│   └── Settlement.sol
├── docs/
│   └── superpowers/specs/
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

Each `packages/core-*/` follows this internal layout:

```
src/
  index.ts        ← public exports
  types.ts        ← interfaces & types
  impl/           ← implementation files
  __tests__/      ← Vitest tests
package.json
tsconfig.json
```

---

## 3. Technology Stack

| Category | Choice | Reason |
|---|---|---|
| Language | TypeScript 5.x, strict mode, ESM | Type safety across all layers |
| Runtime | Node.js 20+ LTS | Stable, long-term support |
| Monorepo | pnpm workspaces + Turborepo | Fast builds, workspace linking |
| CLI framework | commander.js v12 | Lightweight, well-typed |
| CLI output | cli-table3 + chalk + ora | Tables, colors, spinners |
| Blockchain client | viem | Modern, TypeScript-native |
| Local EVM | Hardhat | Deployment scripts + local node |
| Target chain | Arbitrum One (prod) / Arbitrum Sepolia (testnet) | Low fees, EVM compatible |
| Storage | IPFS via @pinata/sdk | Mature, good TypeScript SDK |
| Crypto | @noble/curves + @noble/hashes | Audited, zero-dependency |
| W3C VC | @digitalbazaar/vc | Standards-compliant |
| Testing | Vitest + @vitest/coverage-v8 | Fast, TS-native, monorepo-friendly |
| Schema validation | zod | TypeScript-first, used in Skills layer |

---

## 4. Build Order — CLI-First Vertical Slices

Each slice is a complete unit: CLI handler → Core interface → Core implementation → tests.

### Slice 1 — `config` group
**CLI commands:** `nexus config init | set | get | network`
**Core module:** `@nexuslink/core-config`
**What it does:** Reads/writes `~/.nexuslink/config.yaml`. No blockchain required.
**Why first:** Every other module depends on config for network, wallet, and storage settings.

### Slice 2 — `did` group
**CLI commands:** `nexus did register | resolve | update | deactivate | bind-owner | set-boundary | export`
**Core module:** `@nexuslink/core-identity`
**Contract:** `DIDRegistry.sol`
**What it does:** W3C DID registration on Arbitrum. DID document metadata stored on IPFS; on-chain stores the IPFS hash. viem handles contract interaction.

### Slice 3 — `memory` group
**CLI commands:** `nexus memory store | retrieve | sync | import | switch-backend`
**Core modules:** `@nexuslink/core-sal` + `@nexuslink/core-memory`
**What it does:** SAL abstraction layer with IPFS/Pinata as Phase 1 backend. Memory encrypted before storage. SAL interface designed for easy 0G/Arweave swap in Phase 2.

### Slice 4 — `nss` group
**CLI commands:** `nexus nss publish | discover | invoke | validate | compose | list`
**Core module:** `@nexuslink/core-nss`
**Contract:** `NSSRegistry.sol`
**What it does:** Skill registry. On-chain maps `skillId → (publisher DID, IPFS descriptor hash, price, callCount)`. Discovery uses an off-chain keyword/tag index (Phase 1: SQLite full-text search over cached descriptors) + on-chain verification of results.

### Slice 5 — `pose` + `credential` group
**CLI commands:** `nexus pose query | history | leaderboard` + `nexus credential issue | verify | list`
**Core module:** `@nexuslink/core-governance`
**What it does:** PoSE score computed from on-chain interaction events using formula `score = α×contribution + β×successRate - γ×disputes`. W3C VCs signed by issuer DID key, stored on IPFS.

### Slice 6 — `contract` group
**CLI commands:** `nexus contract propose | sign | execute | status | list`
**Core module:** `@nexuslink/core-acp`
**What it does:** ERC X402 cooperation contracts. Three templates: instant, milestone, subscription. A2A messaging for contract negotiation.

### Slice 7 — `pay` group
**CLI commands:** `nexus pay send | balance | history`
**Core module:** `@nexuslink/core-settlement`
**What it does:** USDC transfers on Arbitrum using official USDC contract. Emits `NexusPayment` event for auditability. Balance queries via viem.

### Slice 8 — `space` + `dao` + `acp` groups
**CLI commands:** `nexus space *` + `nexus dao *` + `nexus acp *`
**Core module:** `@nexuslink/core-governance` (extended) + `@nexuslink/core-acp` (extended)
**What it does:** Collaboration spaces, DAO creation/voting, direct ACP messaging between agents.

### Slice 9 — Skills layer
**Package:** `@nexuslink/skills`
**What it does:** ~15 core skills wrapping Core modules. Platform adapters for OpenClaw and Claude Code. Skills call Core directly (not via CLI) for performance.

---

## 5. Core Module Interfaces

### Config
```typescript
interface NexusConfig {
  network: 'testnet' | 'mainnet' | 'local';
  defaultDid?: string;
  storage: { backend: 'ipfs'; pinataApiKey: string; pinataSecret: string };
  wallet: { keystore: string; defaultAccount: string };
  output: { format: 'table' | 'json' | 'yaml' | 'quiet'; color: boolean };
}
```

### Identity
```typescript
interface IdentityModule {
  register(options: DIDRegisterOptions): Promise<DIDDocument>;
  resolve(did: string): Promise<DIDDocument>;
  update(did: string, patch: DIDPatch): Promise<DIDDocument>;
  deactivate(did: string): Promise<void>;
  bindOwner(agentDid: string, ownerDid: string): Promise<void>;
  setIntentBoundary(did: string, boundary: IntentBoundary): Promise<void>;
}
```

### NSS
```typescript
interface NSSModule {
  publish(descriptor: NSSDescriptor): Promise<{ skillId: string; txHash: string }>;
  discover(intent: string, filters?: DiscoverFilters): Promise<NSSDescriptor[]>;
  invoke(skillId: string, input: unknown, contract?: ContractRef): Promise<SkillResult>;
  compose(pipeline: CompositionPipeline): Promise<CompositeResult>;
  validate(descriptor: NSSDescriptor): ValidationResult;
}
```

### Governance
```typescript
interface GovernanceModule {
  queryPoSE(did: string): Promise<PoSEScore>;
  issueCredential(subject: CredentialSubject): Promise<VerifiableCredential>;
  verifyCredential(vc: VerifiableCredential): Promise<boolean>;
  evaluateCooperation(agentA: string, agentB: string): Promise<CooperationDecision>;
}
```

---

## 6. Smart Contracts

Three Solidity contracts deployed to Arbitrum:

**DIDRegistry.sol**
- Maps `did → (owner, ipfsMetadataHash, active)`
- Events: `DIDRegistered`, `DIDUpdated`, `DIDDeactivated`

**NSSRegistry.sol**
- Maps `skillId → (publisherDid, ipfsDescriptorHash, priceWei, callCount, active)`
- Events: `SkillPublished`, `SkillInvoked`, `SkillDeactivated`

**Settlement.sol**
- Wraps USDC `transfer()` with `NexusPayment(from, to, amount, contractId)` event
- Enables on-chain payment history queryable by DID

---

## 7. Error Handling

- All Core methods throw typed `NexusError` subclasses: `NetworkError`, `ContractError`, `StorageError`, `ValidationError`, `AuthError`
- CLI catches all errors, displays human-readable messages, exits with non-zero code
- `--verbose` flag exposes full stack traces
- `--format json` outputs errors as `{ "error": { "code": "...", "message": "..." } }`

---

## 8. CLI Output Format

All commands support `--format table|json|yaml|quiet` (default: `table`).

```bash
# Human use
nexus did resolve did:nexus:0xABC123

# Script use
POSE=$(nexus pose query did:nexus:0xABC123 --format quiet)

# CI/CD use
nexus nss publish ./skill.json --format json | jq '.skillId'
```

---

## 9. Skills Layer Architecture

Skills call Core directly — not via CLI — to avoid process overhead and string parsing.

```
Skills → Core  (direct function call, ~1ms)
CLI    → Core  (direct function call, ~1ms)

NOT: Skills → CLI → Core  (process spawn, ~50ms, no type safety)
```

Platform adapters implement a three-method interface:
```typescript
interface PlatformAdapter {
  registerSkill(skill: SkillDescriptor): Promise<void>;
  parseInvocation(raw: unknown): SkillInvocation;
  formatResult(result: SkillResult): unknown;
}
```

Phase 1 delivers: OpenClaw adapter + Claude Code adapter.

---

## 10. Testing Strategy

- **Unit tests:** Vitest for all Core module methods, mocking contract calls
- **Integration tests:** Vitest + local Hardhat node for contract interaction
- **CLI tests:** Vitest spawning CLI process, asserting stdout/exit codes
- **Coverage target:** 70%+ on `packages/core-*`
- **CI:** Turborepo pipeline runs `test` task across all packages in dependency order

---

## 11. Phase 1 Acceptance Criteria

- Developer can run `nexus did register` and get a real DID on Arbitrum Sepolia
- Developer can run `nexus nss publish` and have a skill discoverable via `nexus nss discover`
- Two agents can complete: skill invocation → USDC settlement → VC credential issuance
- OpenClaw platform can load NexusLink Skills and invoke them
- Claude Code can use NexusLink as tools via the Claude Code adapter
- All Core modules have ≥70% test coverage
