type RateLimitResult = {
  success: boolean;
  remaining: number;
  retryAfter?: number;
};

const attempts = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

const WINDOW_MS = 60 * 1000;
const MAX_ATTEMPTS = 10;

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const current = attempts.get(identifier);

  if (!current || current.resetAt <= now) {
    attempts.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return {
      success: true,
      remaining: MAX_ATTEMPTS - 1,
    };
  }

  if (current.count >= MAX_ATTEMPTS) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;

  return {
    success: true,
    remaining: MAX_ATTEMPTS - current.count,
  };
}