export interface Payment {
  from: string;
  to: string;
  amountUsdc: string;
  contractId?: string;
  txHash?: string;
  timestamp: string;
}
