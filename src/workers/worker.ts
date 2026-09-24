export interface Env {
  DB: D1Database;
}

export interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
}

export interface D1PreparedStatement {
  bind: (...values: unknown[]) => D1PreparedStatement;
  first: <T = unknown>() => Promise<T | null>;
  run: () => Promise<{ success: boolean }>;
  all: <T = unknown>() => Promise<{ results: T[] }>;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS Headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // POST /api/submit
      if (path === '/api/submit' && request.method === 'POST') {
        const body = await request.json() as {
          id: string;
          age?: number;
          gender?: string;
          consent?: number;
          answers: number[];
          scores: unknown;
          is_retest?: number;
          retest_of?: string;
        };

        const userAgent = request.headers.get('user-agent') || '';
        const country = (request as unknown as { cf?: { country?: string } }).cf?.country || 'Unknown';

        if (!body.id || !Array.isArray(body.answers)) {
          return new Response(
            JSON.stringify({ error: 'Invalid payload. Missing id or answers array.' }),
            { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
          );
        }

        // Insert into Cloudflare D1
        if (env.DB) {
          await env.DB.prepare(
            `INSERT INTO responses (id, age, gender, consent, answers, scores, user_agent, country, is_retest, retest_of)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
            .bind(
              body.id,
              body.age || null,
              body.gender || null,
              body.consent || 0,
              JSON.stringify(body.answers),
              JSON.stringify(body.scores),
              userAgent,
              country,
              body.is_retest || 0,
              body.retest_of || null
            )
            .run();
        }

        return new Response(
          JSON.stringify({ success: true, id: body.id, message: 'Response submitted successfully.' }),
          { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      // GET /api/result/:id
      if (path.startsWith('/api/result/') && request.method === 'GET') {
        const id = path.replace('/api/result/', '');
        if (!id) {
          return new Response(
            JSON.stringify({ error: 'Missing result ID.' }),
            { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
          );
        }

        if (env.DB) {
          const row = await env.DB.prepare(`SELECT * FROM responses WHERE id = ?`).bind(id).first<{
            id: string;
            created_at: string;
            age: number;
            gender: string;
            consent: number;
            answers: string;
            scores: string;
            is_retest: number;
            retest_of: string;
          }>();

          if (row) {
            return new Response(
              JSON.stringify({
                id: row.id,
                createdAt: row.created_at,
                demographics: {
                  age: row.age,
                  gender: row.gender,
                  consent: Boolean(row.consent),
                  isRetest: Boolean(row.is_retest),
                  retestOfId: row.retest_of,
                },
                answers: JSON.parse(row.answers),
                domains: JSON.parse(row.scores),
              }),
              { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
            );
          }
        }

        return new Response(
          JSON.stringify({ error: 'Result not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      // POST /api/retest
      if (path === '/api/retest' && request.method === 'POST') {
        const body = await request.json() as {
          originalId: string;
          retestId: string;
          answers: number[];
          scores: unknown;
        };

        if (env.DB) {
          await env.DB.prepare(
            `INSERT INTO responses (id, consent, answers, scores, is_retest, retest_of)
             VALUES (?, 1, ?, ?, 1, ?)`
          )
            .bind(
              body.retestId,
              JSON.stringify(body.answers),
              JSON.stringify(body.scores),
              body.originalId
            )
            .run();
        }

        return new Response(
          JSON.stringify({ success: true, message: 'Retest trial recorded successfully.' }),
          { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Internal worker error';
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};
