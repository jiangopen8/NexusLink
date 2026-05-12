#!/usr/bin/env node
/**
 * NexusLink Skill Marketplace HTTP API Server
 *
 * Lightweight Node.js HTTP server using built-in `http` module (no Express).
 * Exposes the marketplace API at http://localhost:PORT
 *
 * Endpoints:
 *   GET  /                        → API info
 *   GET  /skills                  → search/list skills (?q=&tags=&sort=&limit=&offset=)
 *   GET  /skills/:skillId         → skill detail
 *   POST /skills                  → publish skill (body: MarketplaceListing)
 *   DELETE /skills/:skillId       → unlist skill (header: X-Publisher-DID)
 *   GET  /skills/:skillId/reviews → get reviews
 *   POST /skills/:skillId/reviews → submit review (body: ReviewSubmission)
 *   GET  /stats                   → marketplace statistics
 *   GET  /featured                → featured skills
 */

import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { SkillMarketplace } from './marketplace.js';

const marketplace = new SkillMarketplace();
const PORT = parseInt(process.env.PORT ?? '3000', 10);

function json(res: ServerResponse, status: number, body: unknown): void {
  const data = JSON.stringify(body, null, 2);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(data);
}

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString()) : {});
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function parseQuery(url: string): Record<string, string> {
  const [, qs] = url.split('?');
  if (!qs) return {};
  return Object.fromEntries(new URLSearchParams(qs));
}

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url = '/' } = req;
  const [path] = url.split('?');
  const parts = path.replace(/^\//, '').split('/');

  try {
    // GET /
    if (method === 'GET' && parts[0] === '') {
      return json(res, 200, {
        name: 'NexusLink Skill Marketplace API',
        version: '2.0.0',
        endpoints: {
          'GET /skills': 'Search skills',
          'GET /skills/:id': 'Get skill detail',
          'POST /skills': 'Publish skill',
          'DELETE /skills/:id': 'Unlist skill',
          'GET /skills/:id/reviews': 'Get reviews',
          'POST /skills/:id/reviews': 'Submit review',
          'GET /stats': 'Marketplace stats',
          'GET /featured': 'Featured skills',
        },
      });
    }

    // GET /stats
    if (method === 'GET' && parts[0] === 'stats') {
      return json(res, 200, marketplace.getStats());
    }

    // GET /featured
    if (method === 'GET' && parts[0] === 'featured') {
      const q = parseQuery(url);
      return json(res, 200, marketplace.getFeatured(parseInt(q.limit ?? '5', 10)));
    }

    // Skills routes
    if (parts[0] === 'skills') {
      const skillId = parts[1] ? decodeURIComponent(parts[1]) : undefined;
      const subResource = parts[2];

      // GET /skills - search
      if (method === 'GET' && !skillId) {
        const q = parseQuery(url);
        const result = marketplace.search({
          q: q.q,
          tags: q.tags ? q.tags.split(',') : undefined,
          maxPrice: q.maxPrice,
          minPose: q.minPose ? parseFloat(q.minPose) : undefined,
          sort: (q.sort as any) || 'popularity',
          limit: parseInt(q.limit ?? '20', 10),
          offset: parseInt(q.offset ?? '0', 10),
        });
        return json(res, 200, result);
      }

      // POST /skills - publish
      if (method === 'POST' && !skillId) {
        const body = await readBody(req) as any;
        const listing = marketplace.publish(body);
        return json(res, 201, listing);
      }

      // GET /skills/:id - get detail
      if (method === 'GET' && skillId && !subResource) {
        const listing = marketplace.getListing(skillId);
        if (!listing) return json(res, 404, { error: `Skill not found: ${skillId}` });
        const reviews = marketplace.getReviews(skillId);
        const avgRating = marketplace.getAverageRating(skillId);
        return json(res, 200, { ...listing, reviews, avgRating });
      }

      // DELETE /skills/:id - unlist
      if (method === 'DELETE' && skillId) {
        const publisherDid = req.headers['x-publisher-did'] as string;
        if (!publisherDid) return json(res, 401, { error: 'X-Publisher-DID header required' });
        marketplace.unlist(skillId, publisherDid);
        return json(res, 200, { success: true });
      }

      // Reviews sub-resource
      if (skillId && subResource === 'reviews') {
        // GET /skills/:id/reviews
        if (method === 'GET') {
          return json(res, 200, {
            skillId,
            reviews: marketplace.getReviews(skillId),
            avgRating: marketplace.getAverageRating(skillId),
          });
        }

        // POST /skills/:id/reviews
        if (method === 'POST') {
          const body = await readBody(req) as any;
          const review = marketplace.submitReview(skillId, body);
          return json(res, 201, review);
        }
      }
    }

    json(res, 404, { error: 'Not found' });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    json(res, 400, { error: message });
  }
});

server.listen(PORT, () => {
  console.log(`NexusLink Skill Marketplace running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
});

export { server };
