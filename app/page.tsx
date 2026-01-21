import { Suspense } from 'react';
import { getGames } from '@/lib/cache';
import Container from '@/components/layout/Container';
import ClientGameList from '@/components/game/ClientGameList';
import GameCardSkeleton from '@/components/game/GameCardSkeleton';

export const revalidate = 3600; // Revalidate every hour

function GameListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function HomePage() {
  const games = await getGames();

  return (
    <div className="py-10">
      <Container>
        <section className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
            탐색하세요, <span className="text-accent">SurviveBase</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            최고의 오픈월드 생존 건설 게임들을 한눈에 확인하세요. 스팀의 수많은 게임들 중에서 당신에게 꼭 맞는 생존 경험을 찾아드립니다.
          </p>
        </section>

        <Suspense fallback={<GameListSkeleton />}>
          <ClientGameList initialGames={games} />
        </Suspense>
      </Container>
    </div>
  );
}
