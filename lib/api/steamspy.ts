// SurviveBase - SteamSpy API Client

import { STEAMSPY_API_URL, STEAMSPY_RATE_LIMIT } from '@/lib/constants';
import { delay } from '@/lib/utils';

/**
 * SteamSpy API Response Types
 */
interface SteamSpyGameRaw {
  appid: number;
  name: string;
  positive: number;
  negative: number;
  owners: string;
  average_forever: number;
  average_2weeks: number;
  median_forever: number;
  price: string;
  initialprice: string;
  discount: string;
  tags?: Record<string, number>;
}

interface SteamSpyTagResponse {
  [appid: string]: SteamSpyGameRaw;
}

export interface SteamSpyGame {
  appid: number;
  name: string;
  positive: number;
  negative: number;
  owners: string;
  averagePlaytime: number;
  tags: string[];
}

/**
 * Fetch games by tag from SteamSpy
 * Rate limit: 1 request per second
 */
export async function fetchGamesByTag(tag: string): Promise<SteamSpyGame[]> {
  const url = `${STEAMSPY_API_URL}?request=tag&tag=${encodeURIComponent(tag)}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`SteamSpy API error: ${response.status}`);
    }

    const data: SteamSpyTagResponse = await response.json();

    // Convert to array and map to our format
    const games: SteamSpyGame[] = Object.values(data).map((game) => ({
      appid: game.appid,
      name: game.name,
      positive: game.positive,
      negative: game.negative,
      owners: game.owners,
      averagePlaytime: game.average_forever,
      tags: game.tags ? Object.keys(game.tags) : [],
    }));

    return games;
  } catch (error) {
    console.error(`Failed to fetch games for tag "${tag}":`, error);
    throw error;
  }
}

/**
 * Fetch game details from SteamSpy
 * Rate limit: 1 request per second
 */
export async function fetchGameDetails(appid: number): Promise<SteamSpyGame | null> {
  const url = `${STEAMSPY_API_URL}?request=appdetails&appid=${appid}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`SteamSpy API error: ${response.status}`);
    }

    const game: SteamSpyGameRaw = await response.json();

    // Check if valid response (SteamSpy returns empty object for invalid appid)
    if (!game.appid) {
      return null;
    }

    return {
      appid: game.appid,
      name: game.name,
      positive: game.positive,
      negative: game.negative,
      owners: game.owners,
      averagePlaytime: game.average_forever,
      tags: game.tags ? Object.keys(game.tags) : [],
    };
  } catch (error) {
    console.error(`Failed to fetch details for appid ${appid}:`, error);
    return null;
  }
}

/**
 * Fetch games for multiple tags with rate limiting
 * Deduplicates by appid and merges tags
 */
export async function fetchGamesForTags(tags: string[]): Promise<Map<number, SteamSpyGame>> {
  const gamesMap = new Map<number, SteamSpyGame>();

  for (const tag of tags) {
    console.log(`Fetching games for tag: ${tag}`);

    try {
      const games = await fetchGamesByTag(tag);

      for (const game of games) {
        const existing = gamesMap.get(game.appid);

        if (existing) {
          // Merge tags (deduplicate)
          const mergedTags = [...new Set([...existing.tags, ...game.tags])];
          gamesMap.set(game.appid, { ...existing, tags: mergedTags });
        } else {
          gamesMap.set(game.appid, game);
        }
      }

      console.log(`  Found ${games.length} games, total unique: ${gamesMap.size}`);
    } catch (error) {
      console.error(`  Failed to fetch tag "${tag}", skipping...`);
    }

    // Rate limiting: wait 1 second before next request
    await delay(STEAMSPY_RATE_LIMIT);
  }

  return gamesMap;
}
