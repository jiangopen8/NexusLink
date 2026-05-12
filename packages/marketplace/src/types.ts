export interface MarketplaceListing {
  skillId: string;
  name: string;
  description: string;
  version: string;
  publisherDid: string;
  priceUsdc: string;
  tags: string[];
  poseScore?: number;
  totalInvocations?: number;
  successRate?: number;
  publishedAt: string;
}

export interface SearchQuery {
  q?: string;
  tags?: string[];
  maxPrice?: string;
  minPose?: number;
  sort?: 'price' | 'pose' | 'popularity' | 'newest';
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  total: number;
  items: MarketplaceListing[];
  page: number;
  pageSize: number;
}

export interface ReviewSubmission {
  reviewerDid: string;
  rating: number;  // 1-5
  comment: string;
}

export interface SkillReview {
  skillId: string;
  reviewerDid: string;
  rating: number;
  comment: string;
  reviewedAt: string;
}

export interface MarketplaceStats {
  totalSkills: number;
  totalPublishers: number;
  totalInvocations: number;
  avgSuccessRate: number;
  topSkills: MarketplaceListing[];
  categories: Record<string, number>;
}
