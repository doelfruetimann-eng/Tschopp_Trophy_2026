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
    const url = new URL(request.url);
    const sinceParam = url.searchParams.get('since');
    const since = sinceParam ? parseInt(sinceParam, 10) : Date.now() - 30000;

    let events = [];
    try {
      // Get all events from list (newest first)
      console.log('Fetching events from game_events_list');
      const eventStrings = await kv.lrange('game_events_list', 0, -1);
      console.log('Events found:', eventStrings?.length || 0);

      // Parse and filter by timestamp
      events = (eventStrings || [])
        .map(str => {
          try {
            return JSON.parse(str);
          } catch {
            return null;
          }
        })
        .filter(Boolean)
        .filter(e => e.timestamp >= since);

      console.log('Events after filtering:', events.length);
    } catch (kvError) {
      console.error('KV error:', kvError.message);
      // In local dev, KV might not be available - return empty list
      return new Response(JSON.stringify({ events: [], timestamp: Date.now() }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store',
        },
      });
    }

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
          return JSON.parse(e);
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
    console.error('Notify handler error:', error);
    // Return empty events on error instead of 500
    return new Response(JSON.stringify({ events: [], timestamp: Date.now() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
