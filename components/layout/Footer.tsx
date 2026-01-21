import { cn } from '@/lib/utils';
import Container from './Container';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t border-border bg-bg-secondary py-12 mt-auto", className)}>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold text-accent">SurviveBase</span>
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} SurviveBase. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://steampowered.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-accent transition-colors"
            >
              Steam
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
