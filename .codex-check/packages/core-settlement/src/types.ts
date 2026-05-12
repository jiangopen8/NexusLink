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
  timestamp: string;
}
