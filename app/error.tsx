'use client';

import { useEffect } from 'react';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Container className="text-center">
        <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-text-primary mb-6">
          오류가 발생했습니다
        </h2>
        <p className="text-text-secondary mb-10 max-w-md mx-auto">
          죄송합니다. 페이지를 불러오는 중에 예상치 못한 오류가 발생했습니다.
          문제가 지속되면 관리자에게 문의해 주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="primary" onClick={() => reset()}>
            다시 시도
          </Button>
          <Button size="lg" variant="secondary" onClick={() => window.location.href = '/'}>
            홈으로 이동
          </Button>
        </div>
      </Container>
    </div>
  );
}
