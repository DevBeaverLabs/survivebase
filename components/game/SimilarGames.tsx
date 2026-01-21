import Link from 'next/link';
import Image from 'next/image';
import type { Game } from '@/types';
import { findSimilarGames } from '@/lib/similarity';
import { formatPrice, getReviewLabel } from '@/lib/utils';

interface SimilarGamesProps {
  currentGame: Game;
  allGames: Game[];
}

export default function SimilarGames({ currentGame, allGames }: SimilarGamesProps) {
  const similarGames = findSimilarGames(currentGame, allGames, 6);

  if (similarGames.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-text-primary mb-6">비슷한 게임</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {similarGames.map((game) => (
          <Link
            key={game.appid}
            href={`/game/${game.appid}`}
            className="group block bg-bg-secondary rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-200 hover:scale-[1.02]"
          >
            {/* Thumbnail */}
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={game.headerImage}
                alt={game.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="p-3">
              <h3 className="text-sm font-medium text-text-primary line-clamp-2 mb-2">
                {game.name}
              </h3>

              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">
                  {getReviewLabel(game.reviews.score)}
                </span>
                <span
                  className={
                    game.price.isFree
                      ? 'text-success font-medium'
                      : game.price.discountPercent > 0
                        ? 'text-success font-medium'
                        : 'text-text-secondary'
                  }
                >
                  {game.price.isFree
                    ? '무료'
                    : game.price.discountPercent > 0
                      ? formatPrice(game.price.final)
                      : formatPrice(game.price.final)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
