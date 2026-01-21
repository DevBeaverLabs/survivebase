// SurviveBase - Steam Store API Client

import { STEAM_STORE_API_URL, STEAM_STORE_RATE_LIMIT } from '@/lib/constants';
import { delay } from '@/lib/utils';

/**
 * Steam Store API Response Types
 */
interface SteamStoreResponse {
  [appid: string]: {
    success: boolean;
    data?: SteamStoreGameRaw;
  };
}

interface SteamStoreGameRaw {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  header_image: string;
  screenshots?: Array<{
    id: number;
    path_thumbnail: string;
    path_full: string;
  }>;
  price_overview?: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
    initial_formatted: string;
    final_formatted: string;
  };
  release_date?: {
    coming_soon: boolean;
    date: string;
  };
  genres?: Array<{
    id: string;
    description: string;
  }>;
  categories?: Array<{
    id: number;
    description: string;
  }>;
}

export interface SteamStoreGame {
  appid: number;
  name: string;
  description: string;
  headerImage: string;
  screenshots: string[];
  price: {
    initial: number;
    final: number;
    discountPercent: number;
    isFree: boolean;
  };
  releaseDate: string;
  genres: string[];
  categories: {
    singleplayer: boolean;
    multiplayer: boolean;
    coop: boolean;
  };
}

// Category IDs from Steam
const CATEGORY_IDS = {
  SINGLEPLAYER: 2,
  MULTIPLAYER: 1,
  COOP: 9,
  ONLINE_COOP: 38,
  LAN_COOP: 48,
};

/**
 * Fetch game details from Steam Store API
 * Rate limit: ~200 req/5min (recommend 1 req/sec)
 */
export async function fetchSteamStoreGame(appid: number): Promise<SteamStoreGame | null> {
  const url = `${STEAM_STORE_API_URL}/appdetails?appids=${appid}&cc=kr&l=korean`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Steam Store API error: ${response.status}`);
    }

    const data: SteamStoreResponse = await response.json();
    const gameData = data[appid.toString()];

    if (!gameData?.success || !gameData.data) {
      return null;
    }

    const game = gameData.data;

    // Only process games (not DLC, videos, etc.)
    if (game.type !== 'game') {
      return null;
    }

    // Parse categories
    const categoryIds = new Set(game.categories?.map((c) => c.id) || []);
    const categories = {
      singleplayer: categoryIds.has(CATEGORY_IDS.SINGLEPLAYER),
      multiplayer: categoryIds.has(CATEGORY_IDS.MULTIPLAYER),
      coop:
        categoryIds.has(CATEGORY_IDS.COOP) ||
        categoryIds.has(CATEGORY_IDS.ONLINE_COOP) ||
        categoryIds.has(CATEGORY_IDS.LAN_COOP),
    };

    // Parse price (Steam returns price in cents for KRW, but sometimes in won directly)
    const priceOverview = game.price_overview;
    const price = {
      initial: priceOverview?.initial ?? 0,
      final: priceOverview?.final ?? 0,
      discountPercent: priceOverview?.discount_percent ?? 0,
      isFree: game.is_free,
    };

    // Parse release date
    let releaseDate = '';
    if (game.release_date && !game.release_date.coming_soon) {
      // Steam date format varies, try to normalize
      releaseDate = game.release_date.date;
    }

    return {
      appid: game.steam_appid,
      name: game.name,
      description: game.short_description || '',
      headerImage: game.header_image,
      screenshots: game.screenshots?.slice(0, 5).map((s) => s.path_full) || [],
      price,
      releaseDate,
      genres: game.genres?.map((g) => g.description) || [],
      categories,
    };
  } catch (error) {
    console.error(`Failed to fetch Steam Store data for appid ${appid}:`, error);
    return null;
  }
}

/**
 * Fetch multiple games with rate limiting
 * Returns a Map of appid -> SteamStoreGame
 */
export async function fetchSteamStoreGames(
  appids: number[],
  onProgress?: (current: number, total: number) => void
): Promise<Map<number, SteamStoreGame>> {
  const gamesMap = new Map<number, SteamStoreGame>();
  const total = appids.length;

  for (let i = 0; i < appids.length; i++) {
    const appid = appids[i];

    try {
      const game = await fetchSteamStoreGame(appid);

      if (game) {
        gamesMap.set(appid, game);
      }
    } catch (error) {
      console.error(`Failed to fetch appid ${appid}, skipping...`);
    }

    // Progress callback
    if (onProgress) {
      onProgress(i + 1, total);
    }

    // Rate limiting: wait 1 second before next request
    if (i < appids.length - 1) {
      await delay(STEAM_STORE_RATE_LIMIT);
    }
  }

  return gamesMap;
}
