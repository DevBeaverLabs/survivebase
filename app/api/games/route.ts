import { NextResponse } from 'next/server';
import { getGames } from '@/lib/cache';

export async function GET() {
  try {
    const games = await getGames();
    return NextResponse.json(games);
  } catch (error) {
    console.error('Failed to get games:', error);
    return NextResponse.json(
      { error: 'Failed to get games' },
      { status: 500 }
    );
  }
}
