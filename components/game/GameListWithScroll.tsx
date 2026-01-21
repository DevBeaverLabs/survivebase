'use client';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { GAMES_PER_PAGE } from '@/lib/constants';
import type { Game } from '@/types';
import GameGrid from './GameGrid';
import GameCardSkeleton from './GameCardSkeleton';

interface GameListWithScrollProps {
  games: Game[];
}

export default function GameListWithScroll({ games }: GameListWithScrollProps) {
  const { visibleItems, hasMore, loaderRef } = useInfiniteScroll({
    items: games,
    itemsPerPage: GAMES_PER_PAGE,
  });

  return (
    <>
      <GameGrid games={visibleItems} />

      {/* Loader trigger element */}
      {hasMore && (
        <div
          ref={loaderRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* End of list message */}
      {!hasMore && games.length > GAMES_PER_PAGE && (
        <p className="text-center text-text-secondary mt-8 py-4">
          모든 게임을 불러왔습니다
        </p>
      )}
    </>
  );
}
