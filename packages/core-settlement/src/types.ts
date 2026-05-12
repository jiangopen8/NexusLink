export interface Payment {
  from: string;
  to: string;
  amountUsdc: string;
  contractId?: string;
  txHash?: string;
  timestamp: string;
}

// Phase 2: Nanopayments for microtransactions
export interface NanopaymentChannel {
  channelId: string;
  sender: string;
  receiver: string;
  totalDeposit: string; // USDC
  withdrawn: string; // USDC
  expiresAt: string;
  signature?: string;
}

export interface NanopaymentTransfer {
  channelId: string;
  amount: string; // USDC increment
  sequence: number;
  signature: string; // sender's signature on (channelId, amount, sequence)
}

// Phase 2: e-CNY support
export type Currency = 'USDC' | 'CNY';

export interface MultiCurrencyPayment {
  from: string;
  to: string;
  currency: Currency;
  amount: string;
  contractId?: string;
  txHash?: string;
  reference?: string;
  timestamp: string;
}

export interface ECNYGateway {
  send(to: string, amount: string, contractId?: string): Promise<{ reference: string; status: 'pending' | 'success' | 'failed' }>;
  balance(account?: string): Promise<string>;
  exchangeRate(): Promise<{ usdToCny: number; cnyToUsd: number }>;
}

export interface PaymentHistoryEntry {
  from: string;
  to: string;
  amount: string;
  currency: Currency;
  contractId?: string;
  txHash?: string;
  reference?: string;
  timestamp: string;
}
