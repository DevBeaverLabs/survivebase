import { getGameById, getGames } from '@/lib/cache';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { formatPrice, getReviewLabel, getSteamUrl, cn } from '@/lib/utils';

interface GamePageProps {
  params: {
    id: string;
  };
}

// Generate static params for SSG
export async function generateStaticParams() {
  const games = await getGames();
  return games.map((game) => ({
    id: game.appid.toString(),
  }));
}

export default async function GamePage({ params }: GamePageProps) {
  const gameId = parseInt(params.id);
  const game = await getGameById(gameId);

  if (!game) {
    notFound();
  }

  const hasDiscount = game.price.discountPercent > 0;

  return (
    <div className="pb-20">
      {/* Hero Header */}
      <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
        <ImageWithFallback
          src={game.headerImage}
          alt={game.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <Container>
            <div className="max-w-4xl">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-text-secondary hover:text-accent transition-colors mb-6 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 transition-transform group-hover:-translate-x-1"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                목록으로 돌아가기
              </Link>
              <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight mb-6">
                {game.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-8">
                {game.tags.slice(0, 8).map((tag) => (
                  <Badge key={tag} className="px-3 py-1 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container className="mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 border-l-4 border-accent pl-4">게임 정보</h2>
              <p className="text-lg text-text-secondary leading-relaxed whitespace-pre-wrap">
                {game.description}
              </p>
            </section>

            {game.screenshots.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 border-l-4 border-accent pl-4">스크린샷</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {game.screenshots.slice(0, 4).map((screenshot, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-border">
                      <ImageWithFallback
                        src={screenshot}
                        alt={`${game.name} screenshot ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-bg-secondary border border-border rounded-xl p-6 sticky top-24">
              <div className="space-y-6">
                {/* Price Section */}
                <div>
                  <h3 className="text-sm text-text-secondary font-medium mb-2">현재 가격</h3>
                  <div className="flex items-center gap-3">
                    {hasDiscount ? (
                      <>
                        <Badge variant="success" className="text-sm px-2 py-1">
                          -{game.price.discountPercent}%
                        </Badge>
                        <div className="flex flex-col">
                          <span className="text-sm text-text-secondary line-through">
                            {formatPrice(game.price.initial)}
                          </span>
                          <span className="text-2xl font-bold text-accent">
                            {formatPrice(game.price.final)}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-text-primary">
                        {formatPrice(game.price.final)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Review Section */}
                <div className="pt-6 border-t border-border">
                  <h3 className="text-sm text-text-secondary font-medium mb-2">최근 평가</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'text-lg font-bold',
                        game.reviews.score >= 70 ? 'text-success' : 'text-warning'
                      )}
                    >
                      {getReviewLabel(game.reviews.score)}
                    </span>
                    <span className="text-sm text-text-secondary">
                      ({game.reviews.score}%)
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="pt-6 border-t border-border space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">출시일</span>
                    <span className="text-text-primary">{game.releaseDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">개발사/배급사</span>
                    <span className="text-text-primary truncate ml-4">Steam Store 참조</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 space-y-3">
                  <a
                    href={getSteamUrl(game.appid)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full py-6 text-lg" variant="primary">
                      Steam에서 보기
                    </Button>
                  </a>
                  <Button className="w-full py-6 text-lg" variant="secondary" disabled>
                    관심 목록에 추가
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
