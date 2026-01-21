// SurviveBase - Game Similarity Calculator

import type { Game } from '@/types';

/**
 * Calculate Jaccard similarity index between two sets
 * Jaccard Index = |A ∩ B| / |A ∪ B|
 * Returns a value between 0 and 1
 */
function jaccardIndex(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 && setB.size === 0) return 0;

  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  return intersection.size / union.size;
}

/**
 * Calculate similarity score between two games based on tags
 */
export function calculateSimilarity(gameA: Game, gameB: Game): number {
  const tagsA = new Set(gameA.tags.map((t) => t.toLowerCase()));
  const tagsB = new Set(gameB.tags.map((t) => t.toLowerCase()));

  return jaccardIndex(tagsA, tagsB);
}

/**
 * Find similar games for a given game
 * Returns top N games sorted by similarity score
 */
export function findSimilarGames(
  targetGame: Game,
  allGames: Game[],
  limit: number = 6
): Game[] {
  // Calculate similarity for all other games
  const similarities: Array<{ game: Game; score: number }> = [];

  for (const game of allGames) {
    // Skip the target game itself
    if (game.appid === targetGame.appid) continue;

    const score = calculateSimilarity(targetGame, game);

    // Only include games with some similarity
    if (score > 0) {
      similarities.push({ game, score });
    }
  }

  // Sort by similarity score (descending), then by popularity for ties
  similarities.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Tie-breaker: use review score
    return b.game.reviews.score - a.game.reviews.score;
  });

  // Return top N games
  return similarities.slice(0, limit).map((s) => s.game);
}

/**
 * Get similarity score as a percentage string
 */
export function getSimilarityLabel(score: number): string {
  const percent = Math.round(score * 100);
  if (percent >= 80) return '매우 유사';
  if (percent >= 60) return '유사';
  if (percent >= 40) return '관련';
  return '약간 관련';
}
