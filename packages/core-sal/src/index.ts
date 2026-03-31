export interface SALModule {
  store(data: Uint8Array): Promise<string>;
  retrieve(cid: string): Promise<Uint8Array>;
}

export class MockSALModule implements SALModule {
  private store_: Map<string, Uint8Array> = new Map();

  async store(data: Uint8Array): Promise<string> {
    const cid = `QmMock${this.store_.size}`;
    this.store_.set(cid, data);
    return cid;
  }

  async retrieve(cid: string): Promise<Uint8Array> {
    return this.store_.get(cid) ?? new Uint8Array();
  }
}
