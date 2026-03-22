import { NextRequest, NextResponse } from 'next/server';

// Rate limiting configuration
export const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute window
  maxRequests: 100, // Max 100 requests per minute
  maxRequestsPost: 50, // More restrictive for POST requests
};

// In-memory rate limit store
export const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Helper function to get client IP
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for') as string;
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip') as string;
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

// Rate limiting middleware
export function rateLimitMiddleware(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const clientIp = getClientIP(req);
    const now = Date.now();
    
    // Check rate limit
    const userLimit = rateLimitStore.get(clientIp);
    const isPost = req.method === 'POST';
    const maxRequests = isPost ? RATE_LIMIT.maxRequestsPost : RATE_LIMIT.maxRequests;
    
    if (userLimit) {
      const timeSinceReset = now - userLimit.resetTime;
      
      // Reset window if expired
      if (timeSinceReset >= RATE_LIMIT.windowMs) {
        rateLimitStore.set(clientIp, {
          count: 1,
          resetTime: now
        });
      } else {
        // Check if rate limit exceeded
        if (userLimit.count >= maxRequests) {
          return NextResponse.json(
            { 
              error: 'Rate limit exceeded. Try again later.',
              limitInfo: {
                limit: maxRequests,
                remaining: 0,
                resetTime: new Date(userLimit.resetTime + RATE_LIMIT.windowMs)
              }
            },
            { 
              status: 429,
              headers: {
                'X-RateLimit-Limit': maxRequests.toString(),
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': new Date(userLimit.resetTime + RATE_LIMIT.windowMs).toUTCString(),
                'Retry-After': new Date(userLimit.resetTime + RATE_LIMIT.windowMs).toUTCString()
              }
            }
          );
        }
        
        // Update counter
        rateLimitStore.set(clientIp, {
          count: userLimit.count + 1,
          resetTime: userLimit.resetTime
        });
      }
    } else {
      // First request from this IP
      rateLimitStore.set(clientIp, {
        count: 1,
        resetTime: now
      });
    }
    
    // Add rate limit headers to successful requests
    const response = await handler(req);
    
    if (response && typeof response.headers.set === 'function') {
      const remaining = Math.max(0, maxRequests - (userLimit?.count || 0));
      response.headers.set('X-RateLimit-Limit', maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', remaining.toString());
      response.headers.set('X-RateLimit-Reset', new Date((userLimit?.resetTime || now) + RATE_LIMIT.windowMs).toUTCString());
    }
    
    return response;
  };
}
