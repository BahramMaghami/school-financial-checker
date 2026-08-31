import { z } from 'zod'

export const transactionSchema = z.object({
  type: z.enum(['درامد', 'هزینه']),
  amount: z.number().positive('مبلغ باید مثبت باشد'),
  title: z.string().min(2, 'عنوان الزامی است'),
  description: z.string().optional(),
  category: z.enum([
    'حقوق',
    'تعمیرات',
    'تجهیزات',
    'شهریه',
    'مصرفی',
    'ملزومات',
    'سایر',
  ]),
  date: z.date(),
  invoiceUrl: z.string().url().optional().nullable(),
})

export type TransactionInput = z.infer<typeof transactionSchema>
