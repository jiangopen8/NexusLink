export class PinataSAL {
  constructor(private apiKey: string, private secret: string) {}

  private async pinataRequest(endpoint: string, body?: unknown): Promise<unknown> {
    const res = await fetch(`https://api.pinata.cloud${endpoint}`, {
      method: body ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: this.apiKey,
        pinata_secret_api_key: this.secret,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`Pinata error: ${res.status} ${res.statusText}`);
    return res.json();
  }

  async store(data: Uint8Array): Promise<string> {
    const base64 = Buffer.from(data).toString('base64');
    const res = await this.pinataRequest('/pinning/pinFileToIPFS', {
      pinataContent: base64,
      pinataMetadata: { name: `nexus-${Date.now()}` },
      pinataOptions: { cidVersion: 1 },
    }) as { IpfsHash: string };
    return res.IpfsHash;
  }

  async retrieve(cid: string): Promise<Uint8Array> {
    const res = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
    if (!res.ok) throw new Error(`Failed to retrieve ${cid}: ${res.status}`);
    const buffer = await res.arrayBuffer();
    return new Uint8Array(buffer);
  }

  async unpin(_cid: string): Promise<void> {
    console.log(`[PinataSAL] Unpin requested for ${_cid} (Phase 1 stub)`);
  }
}
