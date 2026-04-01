import { describe, it, expect, beforeEach } from 'vitest';
import { SkillMarketplace } from '../marketplace.js';

function makeListing(overrides: Partial<any> = {}) {
  return {
    skillId: 'nexuslink:did:register',
    name: 'Register Agent DID',
    description: 'Register a W3C DID for an AI agent',
    version: '1.0.0',
    publisherDid: 'did:nl:publisher',
    priceUsdc: '1.00',
    tags: ['identity', 'did'],
    poseScore: 80,
    ...overrides,
  };
}

describe('SkillMarketplace', () => {
  let market: SkillMarketplace;

  beforeEach(() => { market = new SkillMarketplace(); });

  describe('publish', () => {
    it('publishes a skill with correct fields', () => {
      const listing = market.publish(makeListing());
      expect(listing.skillId).toBe('nexuslink:did:register');
      expect(listing.totalInvocations).toBe(0);
      expect(listing.successRate).toBe(100);
      expect(listing.publishedAt).toBeDefined();
    });

    it('allows getting a published listing by ID', () => {
      market.publish(makeListing());
      expect(market.getListing('nexuslink:did:register')).toBeDefined();
    });
  });

  describe('search', () => {
    beforeEach(() => {
      market.publish(makeListing({ skillId: 'skill-a', name: 'Alpha DID', tags: ['identity'], priceUsdc: '1.00', poseScore: 90 }));
      market.publish(makeListing({ skillId: 'skill-b', name: 'Beta NSS', description: 'Skill naming service', tags: ['nss'], priceUsdc: '2.00', poseScore: 70 }));
      market.publish(makeListing({ skillId: 'skill-c', name: 'Gamma Pay', description: 'Payment skill', tags: ['payment'], priceUsdc: '0.50', poseScore: 50 }));
    });

    it('returns all skills with empty query', () => {
      expect(market.search().total).toBe(3);
    });

    it('filters by text query', () => {
      expect(market.search({ q: 'NSS' }).total).toBe(1);
    });

    it('filters by tag', () => {
      expect(market.search({ tags: ['identity'] }).total).toBe(1);
      expect(market.search({ tags: ['payment'] }).total).toBe(1);
    });

    it('filters by max price', () => {
      expect(market.search({ maxPrice: '1.00' }).total).toBe(2); // skill-a (1.00) and skill-c (0.50)
    });

    it('filters by min PoSE score', () => {
      expect(market.search({ minPose: 80 }).total).toBe(1);
    });

    it('sorts by price ascending', () => {
      const result = market.search({ sort: 'price' });
      expect(result.items[0].priceUsdc).toBe('0.50');
    });

    it('sorts by PoSE score descending', () => {
      const result = market.search({ sort: 'pose' });
      expect(result.items[0].poseScore).toBe(90);
    });

    it('paginates correctly', () => {
      const page1 = market.search({ limit: 2, offset: 0 });
      const page2 = market.search({ limit: 2, offset: 2 });
      expect(page1.items.length).toBe(2);
      expect(page2.items.length).toBe(1);
      expect(page1.page).toBe(1);
      expect(page2.page).toBe(2);
    });
  });

  describe('invocation tracking', () => {
    it('tracks invocations and updates success rate', () => {
      market.publish(makeListing());
      market.recordInvocation('nexuslink:did:register', true);
      market.recordInvocation('nexuslink:did:register', true);
      market.recordInvocation('nexuslink:did:register', false);

      const listing = market.getListing('nexuslink:did:register')!;
      expect(listing.totalInvocations).toBe(3);
      expect(listing.successRate).toBe(67); // 2/3 rounded
    });
  });

  describe('reviews', () => {
    beforeEach(() => { market.publish(makeListing()); });

    it('submits a review', () => {
      const review = market.submitReview('nexuslink:did:register', {
        reviewerDid: 'did:nl:alice',
        rating: 5,
        comment: 'Excellent!',
      });
      expect(review.rating).toBe(5);
      expect(review.reviewedAt).toBeDefined();
    });

    it('prevents duplicate reviews from same user', () => {
      market.submitReview('nexuslink:did:register', { reviewerDid: 'did:nl:alice', rating: 4, comment: 'Good' });
      expect(() => market.submitReview('nexuslink:did:register', { reviewerDid: 'did:nl:alice', rating: 3, comment: 'Meh' }))
        .toThrow('already reviewed');
    });

    it('rejects invalid ratings', () => {
      expect(() => market.submitReview('nexuslink:did:register', { reviewerDid: 'did:nl:bob', rating: 6, comment: 'Over' }))
        .toThrow('between 1 and 5');
    });

    it('calculates average rating', () => {
      market.submitReview('nexuslink:did:register', { reviewerDid: 'did:nl:alice', rating: 4, comment: 'Good' });
      market.submitReview('nexuslink:did:register', { reviewerDid: 'did:nl:bob', rating: 2, comment: 'OK' });
      expect(market.getAverageRating('nexuslink:did:register')).toBe(3);
    });

    it('returns null rating for skill with no reviews', () => {
      expect(market.getAverageRating('nexuslink:did:register')).toBeNull();
    });
  });

  describe('stats', () => {
    it('returns marketplace stats', () => {
      market.publish(makeListing({ skillId: 'skill-a', tags: ['identity'] }));
      market.publish(makeListing({ skillId: 'skill-b', tags: ['payment'] }));
      market.recordInvocation('skill-a', true);
      market.recordInvocation('skill-a', false);

      const stats = market.getStats();
      expect(stats.totalSkills).toBe(2);
      expect(stats.totalInvocations).toBe(2);
      expect(stats.categories.identity).toBe(1);
      expect(stats.categories.payment).toBe(1);
    });
  });

  describe('featured', () => {
    it('returns top skills by PoSE score', () => {
      market.publish(makeListing({ skillId: 'a', poseScore: 90 }));
      market.publish(makeListing({ skillId: 'b', poseScore: 80 }));
      market.publish(makeListing({ skillId: 'c', poseScore: 50 })); // below 70
      const featured = market.getFeatured();
      expect(featured).toHaveLength(2);
      expect(featured[0].poseScore).toBe(90);
    });
  });

  describe('unlist', () => {
    it('allows publisher to unlist', () => {
      market.publish(makeListing());
      market.unlist('nexuslink:did:register', 'did:nl:publisher');
      expect(market.getListing('nexuslink:did:register')).toBeUndefined();
    });

    it('prevents non-publisher from unlisting', () => {
      market.publish(makeListing());
      expect(() => market.unlist('nexuslink:did:register', 'did:nl:other')).toThrow('Only the publisher');
    });
  });
});
