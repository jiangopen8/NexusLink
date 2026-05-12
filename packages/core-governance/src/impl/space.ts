import { randomUUID } from 'node:crypto';
import type { CollaborationSpace, SpaceMember, SpaceVisibility } from '../types.js';

/**
 * SpaceModule - Phase 2: Collaboration Spaces
 *
 * Collaboration spaces are group contexts where multiple agents can:
 * - Share memory and knowledge
 * - Coordinate on tasks
 * - Pool PoSE reputation
 * - Run DAO governance
 */
export class SpaceModule {
  private spaces = new Map<string, CollaborationSpace>();

  /**
   * Create a new collaboration space
   */
  create(
    ownerDid: string,
    name: string,
    description: string,
    options: {
      visibility?: SpaceVisibility;
      minPoSEScore?: number;
      tags?: string[];
    } = {}
  ): CollaborationSpace {
    const id = `space-${randomUUID()}`;
    const now = new Date().toISOString();

    const ownerMember: SpaceMember = {
      did: ownerDid,
      role: 'owner',
      joinedAt: now,
      poseScore: 0, // will be updated when PoSE is queried
    };

    const space: CollaborationSpace = {
      id,
      name,
      description,
      ownerDid,
      members: [ownerMember],
      visibility: options.visibility ?? 'public',
      minPoSEScore: options.minPoSEScore ?? 0,
      tags: options.tags ?? [],
      createdAt: now,
      updatedAt: now,
    };

    this.spaces.set(id, space);
    return space;
  }

  /**
   * Join an existing space
   */
  join(spaceId: string, memberDid: string, poseScore: number): CollaborationSpace {
    const space = this.spaces.get(spaceId);
    if (!space) throw new Error(`Space not found: ${spaceId}`);
    if (space.visibility === 'invite-only') throw new Error('Space is invite-only');
    if (space.visibility === 'private') throw new Error('Space is private');
    if (poseScore < space.minPoSEScore) {
      throw new Error(
        `Insufficient PoSE score: ${poseScore} < minimum ${space.minPoSEScore}`
      );
    }
    if (space.members.some(m => m.did === memberDid)) {
      throw new Error(`${memberDid} is already a member`);
    }

    const member: SpaceMember = {
      did: memberDid,
      role: 'member',
      joinedAt: new Date().toISOString(),
      poseScore,
    };

    const updated: CollaborationSpace = {
      ...space,
      members: [...space.members, member],
      updatedAt: new Date().toISOString(),
    };
    this.spaces.set(spaceId, updated);
    return updated;
  }

  /**
   * Invite a member to a private/invite-only space
   */
  invite(spaceId: string, inviterDid: string, inviteeDid: string, poseScore: number): CollaborationSpace {
    const space = this.spaces.get(spaceId);
    if (!space) throw new Error(`Space not found: ${spaceId}`);

    const inviter = space.members.find(m => m.did === inviterDid);
    if (!inviter) throw new Error(`${inviterDid} is not a member of this space`);
    if (inviter.role === 'member') throw new Error('Only admins/owners can invite members');

    if (space.members.some(m => m.did === inviteeDid)) {
      throw new Error(`${inviteeDid} is already a member`);
    }

    const member: SpaceMember = {
      did: inviteeDid,
      role: 'member',
      joinedAt: new Date().toISOString(),
      poseScore,
    };

    const updated: CollaborationSpace = {
      ...space,
      members: [...space.members, member],
      updatedAt: new Date().toISOString(),
    };
    this.spaces.set(spaceId, updated);
    return updated;
  }

  /**
   * Leave a space
   */
  leave(spaceId: string, memberDid: string): void {
    const space = this.spaces.get(spaceId);
    if (!space) throw new Error(`Space not found: ${spaceId}`);

    const member = space.members.find(m => m.did === memberDid);
    if (!member) throw new Error(`${memberDid} is not a member`);
    if (member.role === 'owner') throw new Error('Owner cannot leave the space. Transfer ownership first.');

    const updated: CollaborationSpace = {
      ...space,
      members: space.members.filter(m => m.did !== memberDid),
      updatedAt: new Date().toISOString(),
    };
    this.spaces.set(spaceId, updated);
  }

  /**
   * Get a space by ID
   */
  get(spaceId: string): CollaborationSpace | undefined {
    return this.spaces.get(spaceId);
  }

  /**
   * List spaces visible to a given DID
   */
  list(viewerDid?: string): CollaborationSpace[] {
    const all = Array.from(this.spaces.values());
    return all.filter(space => {
      if (space.visibility === 'public') return true;
      if (!viewerDid) return false;
      return space.members.some(m => m.did === viewerDid);
    });
  }

  /**
   * Search spaces by name or tag
   */
  search(query: string): CollaborationSpace[] {
    const q = query.toLowerCase();
    return Array.from(this.spaces.values()).filter(s =>
      s.visibility === 'public' &&
      (s.name.toLowerCase().includes(q) ||
       s.description.toLowerCase().includes(q) ||
       s.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  exportState(): { spaces: CollaborationSpace[] } {
    return { spaces: Array.from(this.spaces.values()) };
  }

  importState(state: { spaces?: CollaborationSpace[] }): void {
    this.spaces = new Map((state.spaces ?? []).map(space => [space.id, space]));
  }
}
