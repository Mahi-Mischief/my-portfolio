# API Rate Limiting Documentation

## Overview
This API implements server-side rate limiting to prevent abuse and ensure fair usage across all endpoints.

## Rate Limit Configuration
- **Window**: 1 minute (60,000ms)
- **GET requests**: Max 100 requests per minute
- **POST requests**: Max 50 requests per minute (more restrictive)
- **Storage**: In-memory Map (resets on server restart)

## Endpoints

### GET `/api/route`
- **Purpose**: Retrieve API status and endpoint information
- **Rate Limit**: 100 requests/minute
- **Method**: GET
- **Response**: JSON with rate limit headers

### POST `/api/route`
- **Purpose**: Store new API endpoints
- **Rate Limit**: 50 requests/minute
- **Method**: POST
- **Request Body**: 
  ```json
  {
    "endpoint": "string",
    "method": "GET|POST|PUT|DELETE",
    "url": "string",
    "data": {}
  }
  ```

## Rate Limit Headers
All responses include rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: Wed, 21 Mar 2026 12:00:00 GMT
```

## Error Responses
**429 Too Many Requests**:
```json
{
  "error": "Rate limit exceeded. Try again later.",
  "limitInfo": {
    "limit": 100,
    "remaining": 0,
    "resetTime": "2026-03-21T12:00:00.000Z"
  }
}
```

## Usage Examples

### Check API Status
```bash
curl -X GET "http://localhost:3000/api/route"
```

### Store API Endpoint
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "my-api",
    "method": "GET",
    "url": "https://example.com/api",
    "data": {"key": "value"}
  }' \
  "http://localhost:3000/api/route"
```

## Security Features
- IP-based rate limiting
- Different limits for GET vs POST requests
- Automatic window reset
- Comprehensive rate limit headers
- Request validation and error handling

## Client IP Detection
Priority order:
1. `X-Forwarded-For` header (first IP in chain)
2. `X-Real-IP` header
3. Fallback to 'unknown'

## Storage
All API endpoints are stored in memory for tracking purposes:
- Endpoint name
- HTTP method
- URL (if provided)
- Data payload
- Timestamp
- Client IP
- Request count

## Rate Limit Bypass
Rate limits are per-IP basis. Different IPs have independent limits.
