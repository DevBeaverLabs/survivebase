import Link from 'next/link';
import Container from './Container';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border h-16 flex items-center">
      <Container className="flex items-center justify-between w-full">
        <Link href="/" className="text-2xl font-bold text-accent tracking-tighter">
          SurviveBase
        </Link>
        <div className="flex items-center gap-4">
          {/* Theme toggle placeholder */}
          <div className="w-9 h-9 rounded-md border border-border flex items-center justify-center bg-bg-secondary text-text-secondary cursor-not-allowed">
            <span className="sr-only">Theme Toggle</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </div>
        </div>
      </Container>
    </header>
  );
}
