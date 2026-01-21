// SurviveBase - Error Handling Utilities

import { delay } from '@/lib/utils';

/**
 * Retry configuration
 */
interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
};

/**
 * Execute a function with retry logic
 * Uses exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const { maxRetries, baseDelay, maxDelay } = { ...DEFAULT_RETRY_CONFIG, ...config };

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries) {
        // Calculate delay with exponential backoff
        const delayMs = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
        console.warn(
          `Attempt ${attempt + 1} failed: ${lastError.message}. Retrying in ${delayMs}ms...`
        );
        await delay(delayMs);
      }
    }
  }

  throw lastError;
}

/**
 * API Error class with additional context
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly endpoint?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Log error with context
 */
export function logError(context: string, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  console.error(`[${context}] Error: ${message}`);
  if (stack) {
    console.error(stack);
  }
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}
