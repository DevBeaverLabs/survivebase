'use client';

import { useEffect } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else if (storedTheme === 'dark') {
      document.documentElement.classList.remove('light');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (!prefersDark) {
        document.documentElement.classList.add('light');
      }
    }
  }, []);

  return <>{children}</>;
}
