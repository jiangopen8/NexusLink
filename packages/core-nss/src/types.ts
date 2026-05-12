export interface NSSDescriptor {
  skillId: string;
  name: string;
  description: string;
  version: string;
  publisherDid: string;
  inputSchema?: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
  priceUsdc?: string;
  tags: string[];
}

export interface DiscoverFilters {
  minPose?: number;
  maxPrice?: string;
  limit?: number;
  tags?: string[];
}

export interface SkillResult {
  success: boolean;
  data: unknown;
  message: string;
  suggestions?: string[];
}
