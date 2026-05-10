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
      // Try different zrange approaches
      console.log('Trying zrange approaches...');

      // Approach 1: zrange with start/stop
      let result = await kv.zrange('game_events', 0, -1);
      console.log('zrange(0, -1):', result?.length || 0);

      // Approach 2: if that didn't work, try zrevrange
      if (!result || result.length === 0) {
        console.log('Trying zrevrange...');
        result = await kv.zrevrange('game_events', 0, -1);
        console.log('zrevrange result:', result?.length || 0);
      }

      // Approach 3: try with scores
      if (!result || result.length === 0) {
        console.log('Trying zrange with WITHSCORES...');
        result = await kv.zrange('game_events', 0, -1, { withscores: true });
        console.log('zrange WITHSCORES:', result?.length || 0);
      }

      events = result || [];
      console.log('Final events count:', events.length);
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
