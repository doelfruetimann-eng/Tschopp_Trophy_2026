import { kv } from '@vercel/kv';

export const config = { runtime: 'edge' };

export default async function handler(request) {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const sinceParam = request.nextUrl.searchParams.get('since');
    const since = sinceParam ? parseInt(sinceParam, 10) : Date.now() - 5000;

    // Get all events from the sorted set
    const events = await kv.zrange('game_events', 0, -1);

    if (!events || events.length === 0) {
      return new Response(JSON.stringify({ events: [], timestamp: Date.now() }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store',
        },
      });
    }

    // Filter events by timestamp
    const parsedEvents = events
      .map(e => {
        try {
          const parsed = JSON.parse(e);
          return parsed;
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .filter(e => e.timestamp >= since);

    return new Response(JSON.stringify({ events: parsedEvents, timestamp: Date.now() }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Notify error:', error);
    return new Response(JSON.stringify({ error: error.message, events: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
