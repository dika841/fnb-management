import { z } from 'zod';
import { baseSchema, TBase, TBaseResponse } from '../common';

export const paymentSchema = z.object({
  name: z.string(),
  accountName: z.string(),
  accountNumber: z.string(),
  amount: z.string(),
  ...baseSchema.shape,
});

export const paymentCreateSchema = z.object({
  name: z.string(),
  accountName: z.string(),
  accountNumber: z.string(),
  amount: z.string(),
});

export const paymentUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  amount: z.string().optional(),
});

export type TPayment = z.infer<typeof paymentSchema>;
export type TPaymentCreateRequest = z.infer<typeof paymentCreateSchema>;
export type TPaymentUpdateRequest = z.infer<typeof paymentUpdateSchema>;
export type TPaymentSingleResponse = TBaseResponse<TPayment>;
export type TPaymentResponse = TBaseResponse<TPayment[]>;
