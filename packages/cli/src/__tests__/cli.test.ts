import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const CLI = resolve(dirname(fileURLToPath(import.meta.url)), '../../dist/index.js');

function run(args: string[], home = mkdtempSync(join(tmpdir(), 'nexuslink-cli-home-'))): string {
  return execFileSync(process.execPath, [CLI, ...args], {
    encoding: 'utf-8',
    env: {
      ...process.env,
      HOME: home,
      USERPROFILE: home,
      AGENT_DID: 'did:nexus:cli-agent',
      PRIVATE_KEY: '',
      DID_REGISTRY_ADDRESS: '',
      NSS_REGISTRY_ADDRESS: '',
      SETTLEMENT_ADDRESS: '',
    },
  });
}

describe('CLI integration', () => {
  it('prints help with core command groups', () => {
    const output = run(['--help']);
    expect(output).toContain('did');
    expect(output).toContain('nss');
    expect(output).toContain('memory');
    expect(output).toContain('pay');
  });

  it('runs DID register and resolve locally', () => {
    const home = mkdtempSync(join(tmpdir(), 'nexuslink-cli-home-'));
    const output = run(['--format', 'json', 'did', 'register', '--type', 'assistant', '--skills', 'analysis'], home);
    expect(output).toContain('did:nexus:');
    const did = output.match(/did:nexus:[^"\s│]+/)?.[0];
    expect(did).toBeDefined();
    const resolved = run(['--format', 'json', 'did', 'resolve', did!], home);
    expect(resolved).toContain(did!);
    expect(run(['--format', 'json', 'did', 'update', did!, '--skills', 'updated'], home)).toContain('updated');
    expect(run(['--format', 'json', 'did', 'set-boundary', did!, '--domains', 'payments', '--max-value', '5'], home)).toContain('payments');
    expect(run(['--format', 'json', 'did', 'export', did!], home)).toContain(did!);
  });

  it('validates, publishes, discovers, and invokes NSS descriptor locally', () => {
    const home = mkdtempSync(join(tmpdir(), 'nexuslink-cli-home-'));
    const descriptor = join(home, 'skill.json');
    writeFileSync(descriptor, JSON.stringify({
      skillId: 'nss://cli-analysis',
      name: 'CLI Analysis',
      description: 'analysis from cli',
      version: '1.0.0',
      publisherDid: 'did:nexus:cli',
      tags: ['analysis'],
    }));
    expect(run(['nss', 'validate', descriptor], home)).toContain('valid');
    expect(run(['nss', 'publish', descriptor], home)).toContain('nss://cli-analysis');
    expect(run(['nss', 'list'], home)).toContain('nss://cli-analysis');
    expect(run(['nss', 'discover', 'analysis'], home)).toContain('CLI Analysis');
    expect(run(['--format', 'json', 'nss', 'invoke', 'nss://cli-analysis', '--input', '{"x":1}'], home)).toContain('invoked');
  });

  it('stores and retrieves memory through local backend', () => {
    const home = mkdtempSync(join(tmpdir(), 'nexuslink-cli-home-'));
    const stored = run(['--format', 'json', 'memory', 'store', 'hello-cli'], home);
    const shardId = JSON.parse(stored).id as string;
    expect(run(['memory', 'retrieve', shardId], home)).toContain('hello-cli');
    expect(run(['--format', 'json', 'memory', 'sync'], home)).toContain('"shards": 1');
    expect(run(['memory', 'status'], home)).toContain('Backend');
    expect(run(['memory', 'delete', shardId], home)).toContain('Memory deleted');
    expect(run(['--format', 'json', 'memory', 'sync'], home)).toContain('"shards": 0');
  });

  it('sends and receives ACP messages locally', () => {
    const home = mkdtempSync(join(tmpdir(), 'nexuslink-cli-home-'));
    expect(run(['--format', 'json', 'acp', 'send', 'did:nexus:bob', 'hello', '--from', 'did:nexus:alice'], home)).toContain('msg-');
    expect(run(['acp', 'listen', '--did', 'did:nexus:bob'], home)).toContain('hello');
    expect(run(['--format', 'json', 'acp', 'ping', 'did:nexus:bob'], home)).toContain('"reachable": true');

    const composition = JSON.stringify({
      id: 'cli-composition',
      name: 'CLI Composition',
      description: 'validate and execute composition',
      steps: [
        { skillId: 'step-a' },
        { skillId: 'step-b', dependsOn: ['step-a'] },
      ],
    });
    expect(run(['--format', 'json', 'acp', 'compose', 'validate', composition], home)).toContain('"valid": true');
    expect(run(['acp', 'compose', 'register', composition], home)).toContain('Composition registered');
    expect(run(['acp', 'compose', 'list'], home)).toContain('CLI Composition');
    expect(run(['--format', 'json', 'acp', 'compose', 'execute', 'cli-composition'], home)).toContain('"success": true');
  });

  it('persists contracts, spaces, and DAO proposals across CLI invocations', () => {
    const home = mkdtempSync(join(tmpdir(), 'nexuslink-cli-home-'));
    const contract = JSON.parse(run(['--format', 'json', 'contract', 'propose', 'did:nexus:bob', 'instant', '--terms', '{"amount":"1"}'], home));
    expect(run(['contract', 'list'], home)).toContain(contract.id);
    expect(run(['--format', 'json', 'contract', 'sign', contract.id], home)).toContain('"signed"');
    expect(run(['--format', 'json', 'contract', 'execute', contract.id], home)).toContain('"executed"');

    const space = JSON.parse(run(['--format', 'json', 'space', 'create', 'Ops'], home));
    expect(run(['space', 'list'], home)).toContain('Ops');
    expect(run(['space', 'members', space.id], home)).toContain('did:nexus:cli-agent');
    expect(run(['--format', 'json', 'space', 'info', space.id], home)).toContain('"name": "Ops"');

    const proposal = JSON.parse(run(['--format', 'json', 'dao', 'create', 'Upgrade', '--description', 'Upgrade protocol'], home));
    expect(run(['dao', 'list'], home)).toContain('Upgrade');
    expect(run(['dao', 'vote', proposal.id, 'for', '--pose-score', '12'], home)).toContain('weight 12');
    expect(run(['--format', 'json', 'dao', 'status', proposal.id], home)).toContain('"votesFor": 12');
    expect(run(['--format', 'json', 'dao', 'info', proposal.id], home)).toContain('"voterCount": 1');
    expect(run(['dao', 'members', proposal.id], home)).toContain('did:nexus:cli-agent');
  });

  it('sends local payment and queries balance', () => {
    const home = mkdtempSync(join(tmpdir(), 'nexuslink-cli-home-'));
    expect(run(['pay', 'send', 'did:nexus:receiver', '2.5'], home)).toContain('Payment sent');
    expect(run(['--format', 'json', 'pay', 'balance', 'did:nexus:receiver'], home)).toContain('2.500000 USDC');
    expect(run(['pay', 'history'], home)).toContain('did:nexus:receiver');
    expect(run(['pay', 'send', 'did:nexus:receiver', '10', '--currency', 'CNY'], home)).toContain('e-CNY payment');
    expect(run(['pay', 'rate'], home)).toContain('USDC');

    const nano = run(['pay', 'nano', 'create', 'did:nexus:receiver', '1.0'], home);
    const channelId = nano.match(/nano-[a-f0-9-]+/)?.[0];
    expect(channelId).toBeDefined();
    const signed = JSON.parse(run(['--format', 'json', 'pay', 'nano', 'sign', channelId!, '0.1', '1'], home));
    expect(signed.channelId).toBe(channelId);
    expect(run(['--format', 'json', 'pay', 'nano', 'info', channelId!], home)).toContain(channelId!);
    expect(run(['pay', 'nano', 'list'], home)).toContain(channelId!.slice(0, 16));
  });
});
