import { z } from 'zod'

export const transactionSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']),
  amount: z.number().positive('مبلغ باید مثبت باشد'),
  title: z.string().min(2, 'عنوان الزامی است'),
  description: z.string().optional(),
  category: z.enum([
    'SALARY',
    'MAINTENANCE',
    'EQUIPMENT',
    'TUITION',
    'UTILITIES',
    'SUPPLIES',
    'OTHER',
  ]),
  date: z.coerce.date(),
  invoiceUrl: z.string().url().optional().nullable(),
})

export type TransactionInput = z.infer<typeof transactionSchema>
