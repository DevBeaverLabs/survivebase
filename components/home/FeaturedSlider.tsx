'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Game } from '@/types';
import { formatPrice, getReviewVariant, getReviewLabel } from '@/lib/utils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface FeaturedSliderProps {
  games: Game[];
}

export default function FeaturedSlider({ games }: FeaturedSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  // Don't render if no games
  if (games.length === 0) return null;

  // Single game - no slider needed
  if (games.length === 1) {
    const game = games[0];
    return (
      <div className="relative w-full h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden mb-12">
        <ImageWithFallback
          src={game.headerImage}
          alt={game.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
        <SlideContent game={game} />
      </div>
    );
  }

  return (
    <div className="relative w-full mb-12">
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {games.map((game) => (
            <div
              key={game.appid}
              className="relative flex-[0_0_100%] min-w-0 h-[50vh] md:h-[60vh]"
            >
              <ImageWithFallback
                src={game.headerImage}
                alt={game.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
              <SlideContent game={game} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-bg-secondary/80 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-bg-tertiary transition-colors"
        aria-label="이전"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-bg-secondary/80 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-bg-tertiary transition-colors"
        aria-label="다음"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {games.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? 'w-8 bg-accent'
                : 'bg-text-secondary/50 hover:bg-text-secondary'
            }`}
            aria-label={`슬라이드 ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function SlideContent({ game }: { game: Game }) {
  const hasDiscount = game.price.discountPercent > 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
      <div className="max-w-2xl">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {game.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-bg-secondary/50 backdrop-blur-sm">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mb-4">
          {game.name}
        </h2>

        {/* Review & Price */}
        <div className="flex items-center gap-4 mb-6">
          <Badge reviewVariant={getReviewVariant(game.reviews.score)} className="text-sm">
            {getReviewLabel(game.reviews.score)}
          </Badge>
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <Badge variant="success" className="text-sm">
                -{game.price.discountPercent}%
              </Badge>
            )}
            <span className="text-xl font-bold text-text-primary">
              {formatPrice(game.price.final)}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link href={`/game/${game.appid}`}>
          <Button variant="primary" className="px-8 py-3">
            자세히 보기
          </Button>
        </Link>
      </div>
    </div>
  );
}
