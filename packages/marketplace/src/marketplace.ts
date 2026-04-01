import type {
  MarketplaceListing, SearchQuery, SearchResult,
  ReviewSubmission, SkillReview, MarketplaceStats
} from './types.js';

/**
 * NexusLink NSS Skill Marketplace
 *
 * Provides discovery, search, rating, and analytics for NexusLink skills.
 * Backed by NSS (NexusLink Skill Service) registry on-chain.
 */
export class SkillMarketplace {
  private listings = new Map<string, MarketplaceListing>();
  private reviews = new Map<string, SkillReview[]>(); // skillId → reviews
  private invocations = new Map<string, { total: number; success: number }>();

  /**
   * Publish a skill to the marketplace (wraps NSS publish)
   */
  publish(listing: Omit<MarketplaceListing, 'publishedAt'>): MarketplaceListing {
    const entry: MarketplaceListing = {
      ...listing,
      totalInvocations: 0,
      successRate: 100,
      publishedAt: new Date().toISOString(),
    };
    this.listings.set(listing.skillId, entry);
    this.reviews.set(listing.skillId, []);
    this.invocations.set(listing.skillId, { total: 0, success: 0 });
    return entry;
  }

  /**
   * Search skills with filters, sorting, and pagination
   */
  search(query: SearchQuery = {}): SearchResult {
    const { q, tags, maxPrice, minPose, sort = 'popularity', limit = 20, offset = 0 } = query;

    let results = Array.from(this.listings.values());

    // Text search
    if (q) {
      const lower = q.toLowerCase();
      results = results.filter(s =>
        s.name.toLowerCase().includes(lower) ||
        s.description.toLowerCase().includes(lower) ||
        s.tags.some(t => t.toLowerCase().includes(lower))
      );
    }

    // Tag filter
    if (tags && tags.length > 0) {
      results = results.filter(s => tags.some(t => s.tags.includes(t)));
    }

    // Price filter
    if (maxPrice !== undefined) {
      const maxP = parseFloat(maxPrice);
      results = results.filter(s => parseFloat(s.priceUsdc) <= maxP);
    }

    // PoSE score filter
    if (minPose !== undefined) {
      results = results.filter(s => (s.poseScore ?? 0) >= minPose);
    }

    // Sort
    results = results.sort((a, b) => {
      switch (sort) {
        case 'price': return parseFloat(a.priceUsdc) - parseFloat(b.priceUsdc);
        case 'pose': return (b.poseScore ?? 0) - (a.poseScore ?? 0);
        case 'popularity': return (b.totalInvocations ?? 0) - (a.totalInvocations ?? 0);
        case 'newest': return b.publishedAt.localeCompare(a.publishedAt);
        default: return 0;
      }
    });

    const total = results.length;
    const page = Math.floor(offset / limit) + 1;

    return {
      total,
      items: results.slice(offset, offset + limit),
      page,
      pageSize: limit,
    };
  }

  /**
   * Get full skill listing details
   */
  getListing(skillId: string): MarketplaceListing | undefined {
    return this.listings.get(skillId);
  }

  /**
   * Record an invocation result for analytics
   */
  recordInvocation(skillId: string, success: boolean): void {
    const stats = this.invocations.get(skillId) ?? { total: 0, success: 0 };
    stats.total++;
    if (success) stats.success++;
    this.invocations.set(skillId, stats);

    const listing = this.listings.get(skillId);
    if (listing) {
      this.listings.set(skillId, {
        ...listing,
        totalInvocations: stats.total,
        successRate: Math.round((stats.success / stats.total) * 100),
      });
    }
  }

  /**
   * Submit a review for a skill
   */
  submitReview(skillId: string, review: ReviewSubmission): SkillReview {
    const listing = this.listings.get(skillId);
    if (!listing) throw new Error(`Skill not found: ${skillId}`);

    const existingReviews = this.reviews.get(skillId) ?? [];
    if (existingReviews.some(r => r.reviewerDid === review.reviewerDid)) {
      throw new Error(`${review.reviewerDid} has already reviewed this skill`);
    }

    if (review.rating < 1 || review.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const entry: SkillReview = {
      skillId,
      reviewerDid: review.reviewerDid,
      rating: review.rating,
      comment: review.comment,
      reviewedAt: new Date().toISOString(),
    };

    existingReviews.push(entry);
    this.reviews.set(skillId, existingReviews);
    return entry;
  }

  /**
   * Get reviews for a skill
   */
  getReviews(skillId: string): SkillReview[] {
    return this.reviews.get(skillId) ?? [];
  }

  /**
   * Get average rating for a skill
   */
  getAverageRating(skillId: string): number | null {
    const reviews = this.reviews.get(skillId) ?? [];
    if (reviews.length === 0) return null;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }

  /**
   * Get marketplace-wide statistics
   */
  getStats(): MarketplaceStats {
    const allListings = Array.from(this.listings.values());
    const totalInvocations = allListings.reduce((sum, s) => sum + (s.totalInvocations ?? 0), 0);
    const publishers = new Set(allListings.map(s => s.publisherDid)).size;

    const avgSuccessRate = allListings.length > 0
      ? allListings.reduce((sum, s) => sum + (s.successRate ?? 100), 0) / allListings.length
      : 0;

    const categories: Record<string, number> = {};
    for (const listing of allListings) {
      for (const tag of listing.tags) {
        categories[tag] = (categories[tag] ?? 0) + 1;
      }
    }

    const topSkills = [...allListings]
      .sort((a, b) => (b.totalInvocations ?? 0) - (a.totalInvocations ?? 0))
      .slice(0, 5);

    return {
      totalSkills: allListings.length,
      totalPublishers: publishers,
      totalInvocations,
      avgSuccessRate: Math.round(avgSuccessRate),
      topSkills,
      categories,
    };
  }

  /**
   * Get featured/recommended skills
   */
  getFeatured(limit = 5): MarketplaceListing[] {
    return Array.from(this.listings.values())
      .filter(s => (s.poseScore ?? 0) >= 70)
      .sort((a, b) => (b.poseScore ?? 0) - (a.poseScore ?? 0))
      .slice(0, limit);
  }

  /**
   * Unlist a skill from the marketplace
   */
  unlist(skillId: string, publisherDid: string): void {
    const listing = this.listings.get(skillId);
    if (!listing) throw new Error(`Skill not found: ${skillId}`);
    if (listing.publisherDid !== publisherDid) throw new Error('Only the publisher can unlist this skill');
    this.listings.delete(skillId);
  }
}
