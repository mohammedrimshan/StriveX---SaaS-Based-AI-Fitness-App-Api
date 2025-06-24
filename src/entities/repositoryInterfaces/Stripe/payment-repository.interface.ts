import { IPaymentEntity } from "@/entities/models/payment.entity";
import { IBaseRepository } from "../base-repository.interface";
import { ClientSession, FilterQuery } from "mongoose";
import { ITrainerEarningsEntity } from "@/entities/models/trainer-earnings.entity";

export interface IPaymentRepository extends IBaseRepository<IPaymentEntity> {
  findByStripePaymentId(
    stripePaymentId: string
  ): Promise<IPaymentEntity | null>;
  updatePaymentStatus(
    stripePaymentId: string,
    status: string,
    userId?: string
  ): Promise<IPaymentEntity>;
  findByStripeSessionId(
    stripeSessionId: string
  ): Promise<IPaymentEntity | null>;
  findTrainerPaymentHistory(
    trainerId: string,
    skip: number,
    limit: number
  ): Promise<{
    items: {
      clientName: string;
      planTitle: string;
      trainerAmount: number;
      adminShare: number;
      completedAt: Date;
    }[];
    total: number;
  }>;
  updateMany(
    query: FilterQuery<IPaymentEntity>,
    update: Partial<IPaymentEntity>
  ): Promise<{ modifiedCount: number }>;
  // In IPaymentRepository.ts
  findOne(
    filter: Partial<IPaymentEntity>,
    sort?: Record<string, 1 | -1>
  ): Promise<IPaymentEntity | null>;
  updateById(id: string, data: Partial<IPaymentEntity>): Promise<void>;
  updatePayment(id: string, updates: Partial<IPaymentEntity>, session?: ClientSession): Promise<IPaymentEntity | null>
   deleteById(id: string): Promise<void> 
}
