import { getGames } from '@/lib/cache';
import Container from '@/components/layout/Container';
import GameListWithScroll from '@/components/game/GameListWithScroll';
import SortDropdown from '@/components/filter/SortDropdown';

export const revalidate = 3600; // Revalidate every hour

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

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-text-primary">전체 게임</h2>
            <p className="text-sm text-text-secondary">{games.length}개의 게임이 등록되어 있습니다.</p>
          </div>
          
          {/* Default sort is 'popular' as per requirements */}
          <SortDropdown value="popular" />
        </div>

        <GameListWithScroll games={games} />
      </Container>
    </div>
  );
}
