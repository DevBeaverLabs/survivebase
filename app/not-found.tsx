import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Container className="text-center">
        <h1 className="text-9xl font-black text-bg-tertiary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-text-primary mb-6">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-text-secondary mb-10 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          홈으로 돌아가 새로운 서바이벌 게임을 찾아보세요.
        </p>
        <Link href="/">
          <Button size="lg" variant="primary">
            홈으로 돌아가기
          </Button>
        </Link>
      </Container>
    </div>
  );
}
