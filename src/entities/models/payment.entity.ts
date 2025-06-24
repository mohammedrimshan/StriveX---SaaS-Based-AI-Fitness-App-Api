import { PaymentStatus } from "@/shared/constants";

export interface IPaymentEntity {
  id: string;
  clientId: string;
  trainerId?: string;
  membershipPlanId: string;
  amount: number;
  stripePaymentId?: string;
  stripeSessionId: string;
  trainerAmount?: number;
  adminAmount: number;
  status: PaymentStatus;
  remainingBalance?: number;
  walletAppliedAmount?: number;
  walletDeducted?:boolean;
  createdAt: Date;
  updatedAt?: Date;
  paymentSource?: 'WALLET' | 'STRIPE' | 'MIXED';
}