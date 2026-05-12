import { randomUUID } from 'node:crypto';
import type { SALBackend } from '../types.js';

/**
 * 0G Storage Backend Implementation
 *
 * 0G (ZeroGravity) is a decentralized storage network optimized for:
 * - High throughput (10GB/s per node)
 * - Low latency retrieval
 * - Cost-effective large file storage
 *
 * Phase 2: Basic implementation with REST API integration
 */
export class ZeroGSAL implements SALBackend {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(apiKey: string, apiUrl = 'https://api.0g.storage') {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async store(data: Uint8Array): Promise<string> {
    try {
      // Convert data to base64 for JSON transport
      const base64Data = Buffer.from(data).toString('base64');

      const response = await fetch(`${this.apiUrl}/v1/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          data: base64Data,
          name: `nexuslink-${randomUUID()}.bin`,
        }),
      });

      if (!response.ok) {
        throw new Error(`0G upload failed: ${response.statusText}`);
      }

      const result = await response.json() as { txHash?: string; cid?: string };

      // 0G returns a transaction hash that becomes the content ID
      return result.txHash || result.cid || '';
    } catch (error) {
      throw new Error(`0G storage error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async retrieve(cid: string): Promise<Uint8Array> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/download/${cid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`0G download failed: ${response.statusText}`);
      }

      const result = await response.json() as { data?: string; base64?: string };

      // Convert base64 back to Uint8Array
      const base64Data = result.data || result.base64;
      if (!base64Data) {
        throw new Error('No data returned from 0G');
      }
      return Buffer.from(base64Data, 'base64');
    } catch (error) {
      throw new Error(`0G retrieval error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async unpin(cid: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/delete/${cid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`0G delete failed: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`0G delete error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
