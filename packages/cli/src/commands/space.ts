import { Command } from 'commander';
import { SpaceModule } from '@nexuslink/core-governance';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

// In-memory space module instance (Phase 2: should persist to storage)
const spaceModule = new SpaceModule();

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
        const ownerDid = process.env.AGENT_DID ?? 'did:nexus:local';
        const space = spaceModule.create(ownerDid, name, options.description, {
          visibility: options.visibility,
          minPoSEScore: parseFloat(options.minPose ?? '0'),
          tags: options.tags ? options.tags.split(',').map((t: string) => t.trim()) : [],
        });
        formatter.table(
          ['Field', 'Value'],
          [
            ['ID', space.id],
            ['Name', space.name],
            ['Visibility', space.visibility],
            ['Min PoSE', space.minPoSEScore.toString()],
            ['Members', space.members.length.toString()],
            ['Created', space.createdAt],
          ]
        );
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
        const spaces = options.search
          ? spaceModule.search(options.search)
          : spaceModule.list();

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
        const memberDid = process.env.AGENT_DID ?? 'did:nexus:local';
        const poseScore = parseFloat(options.poseScore ?? '0');
        const updated = spaceModule.join(spaceId, memberDid, poseScore);
        formatter.success(`Joined space: ${updated.name} (${updated.members.length} members)`);
      } catch (err) {
        throw new CLIError((err as Error).message, 'SPACE_JOIN_FAILED');
      }
    });

  space
    .command('info <spaceId>')
    .description('Show space details and members')
    .action(async (spaceId: string) => {
      try {
        const s = spaceModule.get(spaceId);
        if (!s) throw new CLIError(`Space not found: ${spaceId}`, 'SPACE_NOT_FOUND');

        formatter.json({
          id: s.id,
          name: s.name,
          description: s.description,
          visibility: s.visibility,
          minPoSEScore: s.minPoSEScore,
          members: s.members.map(m => ({ did: m.did, role: m.role, poseScore: m.poseScore })),
          tags: s.tags,
          createdAt: s.createdAt,
        });
      } catch (err) {
        throw new CLIError((err as Error).message, 'SPACE_INFO_FAILED');
      }
    });
}
