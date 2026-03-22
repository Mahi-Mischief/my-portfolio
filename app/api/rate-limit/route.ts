import { NextRequest, NextResponse } from 'next/server';

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute window
  maxRequests: 100, // Max 100 requests per minute
};

// In-memory rate limit store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// API endpoints storage
const apiEndpoints = new Map<string, any>();

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  return (request.headers.get('x-forwarded-for') as string) || 
         (request.headers.get('x-real-ip') as string) || 
         'unknown';
}

export async function GET(request: NextRequest) {
  const clientIp = getClientIP(request);
  const now = Date.now();
  
  // Check rate limit
  const userLimit = rateLimitStore.get(clientIp);
  
  if (userLimit) {
    const timeSinceReset = now - userLimit.resetTime;
    
    // Reset window if expired
    if (timeSinceReset >= RATE_LIMIT.windowMs) {
      rateLimitStore.set(clientIp, {
        count: 1,
        resetTime: now
      });
    } else {
      // Increment counter within window
      if (userLimit.count >= RATE_LIMIT.maxRequests) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Try again later.' },
          { status: 429 }
        );
      }
      
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

  // Return rate limit headers
  const response = NextResponse.json({
    message: 'API rate limiting server is running',
    endpoints: Array.from(apiEndpoints.keys()),
    rateLimit: {
      remaining: Math.max(0, RATE_LIMIT.maxRequests - (userLimit?.count || 0)),
      resetTime: new Date((userLimit?.resetTime || now) + RATE_LIMIT.windowMs)
    }
  });

  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', RATE_LIMIT.maxRequests.toString());
  response.headers.set('X-RateLimit-Remaining', Math.max(0, RATE_LIMIT.maxRequests - (userLimit?.count || 0)).toString());
  response.headers.set('X-RateLimit-Reset', new Date((userLimit?.resetTime || now) + RATE_LIMIT.windowMs).toUTCString());

  return response;
}

// Store API endpoint
export async function POST(request: NextRequest) {
  const clientIp = getClientIP(request);
  const now = Date.now();
  
  // Check rate limit for POST requests (more restrictive)
  const userLimit = rateLimitStore.get(clientIp);
  
  if (userLimit) {
    const timeSinceReset = now - userLimit.resetTime;
    
    if (timeSinceReset >= RATE_LIMIT.windowMs) {
      rateLimitStore.set(clientIp, {
        count: 1,
        resetTime: now
      });
    } else {
      if (userLimit.count >= RATE_LIMIT.maxRequests / 2) { // More restrictive for POST
        return NextResponse.json(
          { error: 'Rate limit exceeded. Try again later.' },
          { status: 429 }
        );
      }
      
      rateLimitStore.set(clientIp, {
        count: userLimit.count + 1,
        resetTime: userLimit.resetTime
      });
    }
  } else {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetTime: now
    });
  }

  try {
    const body = await request.json();
    
    // Store the API endpoint
    apiEndpoints.set(body.endpoint, {
      method: body.method || 'GET',
      url: body.url || '',
      data: body.data || {},
      timestamp: now,
      ip: clientIp
    });

    return NextResponse.json({
      message: 'API endpoint stored successfully',
      endpoint: body.endpoint,
      stored: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}
