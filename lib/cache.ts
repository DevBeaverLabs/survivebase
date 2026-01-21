// SurviveBase - Caching System

import { promises as fs } from 'fs';
import path from 'path';
import type { Game } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const GAMES_CACHE_FILE = path.join(DATA_DIR, 'games.json');
const MOCK_GAMES_FILE = path.join(DATA_DIR, 'mock-games.json');

interface CacheData {
  games: Game[];
  updatedAt: string;
  version: number;
}

const CACHE_VERSION = 1;

/**
 * Ensure data directory exists
 */
async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory already exists
  }
}

/**
 * Read games from cache file
 */
export async function readGamesCache(): Promise<Game[]> {
  try {
    const content = await fs.readFile(GAMES_CACHE_FILE, 'utf-8');
    const data: CacheData = JSON.parse(content);

    // Version check
    if (data.version !== CACHE_VERSION) {
      console.warn('Cache version mismatch, returning empty array');
      return [];
    }

    return data.games;
  } catch (error) {
    console.warn('Failed to read games cache:', error);
    return [];
  }
}

/**
 * Write games to cache file
 */
export async function writeGamesCache(games: Game[]): Promise<void> {
  await ensureDataDir();

  const data: CacheData = {
    games,
    updatedAt: new Date().toISOString(),
    version: CACHE_VERSION,
  };

  await fs.writeFile(GAMES_CACHE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Wrote ${games.length} games to cache`);
}

/**
 * Read mock games for development
 */
export async function readMockGames(): Promise<Game[]> {
  try {
    const content = await fs.readFile(MOCK_GAMES_FILE, 'utf-8');
    const data: CacheData = JSON.parse(content);
    return data.games;
  } catch (error) {
    console.warn('Failed to read mock games:', error);
    return [];
  }
}

/**
 * Get games (cache first, then mock fallback)
 */
export async function getGames(): Promise<Game[]> {
  // Try cache first
  const cachedGames = await readGamesCache();
  if (cachedGames.length > 0) {
    return cachedGames;
  }

  // Fallback to mock data
  console.log('No cached games found, using mock data');
  return readMockGames();
}

/**
 * Get a single game by appid
 */
export async function getGameById(appid: number): Promise<Game | null> {
  const games = await getGames();
  return games.find((game) => game.appid === appid) || null;
}

/**
 * Check if cache is stale (older than 24 hours)
 */
export async function isCacheStale(): Promise<boolean> {
  try {
    const content = await fs.readFile(GAMES_CACHE_FILE, 'utf-8');
    const data: CacheData = JSON.parse(content);
    const updatedAt = new Date(data.updatedAt);
    const now = new Date();
    const hoursDiff = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60);
    return hoursDiff > 24;
  } catch {
    return true; // No cache = stale
  }
}

/**
 * Get cache info
 */
export async function getCacheInfo(): Promise<{
  exists: boolean;
  gameCount: number;
  updatedAt: string | null;
}> {
  try {
    const content = await fs.readFile(GAMES_CACHE_FILE, 'utf-8');
    const data: CacheData = JSON.parse(content);
    return {
      exists: true,
      gameCount: data.games.length,
      updatedAt: data.updatedAt,
    };
  } catch {
    return {
      exists: false,
      gameCount: 0,
      updatedAt: null,
    };
  }
}
