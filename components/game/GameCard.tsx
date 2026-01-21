import Link from 'next/link';
import { Game } from '@/types';
import { formatPrice, getReviewLabel, cn } from '@/lib/utils';
import ImageWithFallback from '../ui/ImageWithFallback';
import Badge from '../ui/Badge';
import BookmarkButton from './BookmarkButton';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const hasDiscount = game.price.discountPercent > 0;

  return (
    <Link href={`/game/${game.appid}`} className="group block">
      <div className="bg-bg-secondary border border-border rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-accent/10 group-hover:border-accent/30 flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <ImageWithFallback
            src={game.headerImage}
            alt={game.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <BookmarkButton
            appid={game.appid}
            size="sm"
            className="absolute top-2 left-2 shadow-lg shadow-bg-primary/40"
          />
          {hasDiscount && (
            <div className="absolute bottom-2 right-2">
              <Badge variant="success" className="text-xs px-2 py-1">
                -{game.price.discountPercent}%
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow gap-3">
          <h3 className="font-bold text-text-primary line-clamp-2 leading-snug group-hover:text-accent transition-colors">
            {game.name}
          </h3>

          <div className="mt-auto flex flex-col gap-2">
            {/* Review */}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'text-xs font-medium',
                  game.reviews.score >= 70 ? 'text-success' : 'text-warning'
                )}
              >
                {getReviewLabel(game.reviews.score)}
              </span>
              <span className="text-[10px] text-text-secondary">
                ({game.reviews.score}%)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-xs text-text-secondary line-through">
                    {formatPrice(game.price.initial)}
                  </span>
                  <span className="text-sm font-bold text-accent">
                    {formatPrice(game.price.final)}
                  </span>
                </>
              ) : (
                <span className="text-sm font-bold text-text-primary">
                  {formatPrice(game.price.final)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
