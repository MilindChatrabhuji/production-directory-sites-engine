// Hacker News Style Gravity Trending Ranking Algorithm
// Score = (Upvotes - 1) / (Hours + 2)^1.8

export interface UpvoteRecord {
  toolId: string;
  ipHash: string;
  timestamp: number;
}

export class RankingAlgorithm {
  private static readonly GRAVITY = 1.8;
  private upvoteLog: UpvoteRecord[] = [];

  /**
   * Calculates trending score with anti-gaming gravity decay.
   */
  public static calculateScore(upvotes: number, submittedAtIso: string): number {
    const submittedMs = new Date(submittedAtIso).getTime();
    const nowMs = Date.now();
    const hoursSinceSubmission = Math.max(0, (nowMs - submittedMs) / (1000 * 60 * 60));

    const effectiveVotes = Math.max(1, upvotes);
    const denominator = Math.pow(hoursSinceSubmission + 2, this.GRAVITY);
    return parseFloat(((effectiveVotes - 1) / denominator).toFixed(4));
  }

  /**
   * Prevents duplicate voting with client IP rate limiting.
   */
  public registerUpvote(toolId: string, ipHash: string): boolean {
    const recent = this.upvoteLog.find(
      r => r.toolId === toolId && r.ipHash === ipHash && (Date.now() - r.timestamp < 24 * 60 * 60 * 1000)
    );
    if (recent) {
      return false; // Already voted in last 24h
    }

    this.upvoteLog.push({ toolId, ipHash, timestamp: Date.now() });
    return true;
  }
}
