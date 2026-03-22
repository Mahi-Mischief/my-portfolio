import { NextRequest, NextResponse } from 'next/server';
import { rateLimitMiddleware, RATE_LIMIT, rateLimitStore, getClientIP } from './rate-limit/middleware';

// API endpoints storage
const apiEndpoints = new Map<string, any>();

export const GET = rateLimitMiddleware(async (request: NextRequest) => {
  const clientIp = getClientIP(request);
  const now = Date.now();
  
  // Return API status and endpoint information
  return NextResponse.json({
    message: 'API rate limiting server is running',
    endpoints: Array.from(apiEndpoints.keys()),
    rateLimit: {
      remaining: Math.max(0, RATE_LIMIT.maxRequests - (rateLimitStore.get(clientIp)?.count || 0)),
      resetTime: new Date((rateLimitStore.get(clientIp)?.resetTime || now) + RATE_LIMIT.windowMs)
    }
  });
});

export const POST = rateLimitMiddleware(async (request: NextRequest) => {
  const clientIp = getClientIP(request);
  const now = Date.now();
  
  try {
    const body = await request.json();
    
    // Store the API endpoint
    apiEndpoints.set(body.endpoint, {
      method: 'POST',
      url: body.url || '',
      data: body.data || {},
      timestamp: now,
      ip: clientIp
    });

    return NextResponse.json({
      message: 'API endpoint stored successfully',
      endpoint: body.endpoint,
      stored: true,
      endpoints: Array.from(apiEndpoints.keys())
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
});
