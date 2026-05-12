import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { homedir } from 'node:os';
import { Command } from 'commander';
import { SpaceModule } from '@nexuslink/core-governance';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

const STATE_PATH = '~/.nexuslink/spaces.json'.replace(/^~/, homedir());

function loadSpaces(): SpaceModule {
  const module = new SpaceModule();
  if (existsSync(STATE_PATH)) module.importState(JSON.parse(readFileSync(STATE_PATH, 'utf-8')));
  return module;
}

function saveSpaces(module: SpaceModule): void {
  const dir = dirname(STATE_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(STATE_PATH, JSON.stringify(module.exportState(), null, 2), 'utf-8');
}

export function spaceCommands(program: Command, formatter: OutputFormatter): void {
  const space = program.command('space').description('Collaboration spaces management');

  space
    .command('create <name>')
    .description('Create a new collaboration space')
    .option('--description <desc>', 'Space description', '')
    .option('--visibility <v>', 'Visibility: public|private|invite-only', 'public')
    .option('--min-pose <score>', 'Minimum PoSE score to join', '0')
    .option('--tags <tags>', 'Comma-separated tags')
    .action(async (name: string, options) => {
      try {
        const module = loadSpaces();
        const created = module.create(process.env.AGENT_DID ?? 'did:nexus:local', name, options.description, {
          visibility: options.visibility,
          minPoSEScore: parseFloat(options.minPose ?? '0'),
          tags: options.tags ? options.tags.split(',').map((t: string) => t.trim()) : [],
        });
        saveSpaces(module);
        formatter.json(created);
      } catch (err) {
        throw new CLIError((err as Error).message, 'SPACE_CREATE_FAILED');
      }
    });

  space
    .command('list')
    .description('List available collaboration spaces')
    .option('--search <query>', 'Search by name or tag')
    .action(async (options) => {
      try {
        const module = loadSpaces();
        const spaces = options.search ? module.search(options.search) : module.list(process.env.AGENT_DID);
        if (spaces.length === 0) {
          formatter.success('No spaces found');
          return;
        }
        formatter.table(
          ['ID', 'Name', 'Visibility', 'Members', 'Min PoSE'],
          spaces.map(s => [s.id, s.name, s.visibility, s.members.length.toString(), s.minPoSEScore.toString()])
        );
      } catch (err) {
        throw new CLIError((err as Error).message, 'SPACE_LIST_FAILED');
      }
    });

  space
    .command('join <spaceId>')
    .description('Join a public collaboration space')
    .option('--pose-score <score>', 'Your PoSE score', '0')
    .action(async (spaceId: string, options) => {
      try {
        const module = loadSpaces();
        const updated = module.join(spaceId, process.env.AGENT_DID ?? 'did:nexus:local', parseFloat(options.poseScore ?? '0'));
        saveSpaces(module);
        formatter.success(`Joined space: ${updated.name} (${updated.members.length} members)`);
      } catch (err) {
        throw new CLIError((err as Error).message, 'SPACE_JOIN_FAILED');
      }
    });

  space
    .command('leave <spaceId>')
    .description('Leave a collaboration space')
    .action(async (spaceId: string) => {
      try {
        const module = loadSpaces();
        module.leave(spaceId, process.env.AGENT_DID ?? 'did:nexus:local');
        saveSpaces(module);
        formatter.success(`Left space: ${spaceId}`);
      } catch (err) {
        throw new CLIError((err as Error).message, 'SPACE_LEAVE_FAILED');
      }
    });

  space
    .command('members <spaceId>')
    .description('Show space members')
    .action(async (spaceId: string) => {
      try {
        const s = loadSpaces().get(spaceId);
        if (!s) throw new CLIError(`Space not found: ${spaceId}`, 'SPACE_NOT_FOUND');
        formatter.table(['DID', 'Role', 'PoSE', 'Joined At'], s.members.map(member => [
          member.did,
          member.role,
          member.poseScore.toString(),
          member.joinedAt,
        ]));
      } catch (err) {
        throw new CLIError((err as Error).message, 'SPACE_MEMBERS_FAILED');
      }
    });

  space
    .command('info <spaceId>')
    .description('Show space details and members')
    .action(async (spaceId: string) => {
      try {
        const s = loadSpaces().get(spaceId);
        if (!s) throw new CLIError(`Space not found: ${spaceId}`, 'SPACE_NOT_FOUND');
        formatter.json(s);
      } catch (err) {
        throw new CLIError((err as Error).message, 'SPACE_INFO_FAILED');
      }
    });
}
