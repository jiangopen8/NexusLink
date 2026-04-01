import type { PoSEScore } from '../types.js';

export class PoSEModule {
  private readonly ALPHA = 0.5;
  private readonly BETA = 0.5;
  private readonly GAMMA = 0.2;

  calculateScore(contributionUsdc: number, successRate: number, disputeRate: number): number {
    const contributionScore = Math.min(100, contributionUsdc / 100);
    const raw = this.ALPHA * contributionScore
      + this.BETA * successRate
      - this.GAMMA * disputeRate;
    return Math.max(0, Math.min(100, Math.round(raw * 100) / 100));
  }

  buildScore(did: string, contributionUsdc = 0, successRate = 0, disputeRate = 0, totalTasks = 0): PoSEScore {
    return {
      did,
      score: this.calculateScore(contributionUsdc, successRate, disputeRate),
      contributionUsdc,
      successRate,
      disputeRate,
      totalTasks,
      calculatedAt: new Date().toISOString(),
    };
  }
}
