export interface Payment {
  paymentId: string;
  orderId: string;
  customerId: string;
  amount: number;
  paymentMethod: string;
  status: PaymentStatus // Extend as needed
  transactionId: string;
  createdAt: string; // ISO date string
}
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
