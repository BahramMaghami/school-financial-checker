'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import {
  transactionSchema,
  TransactionInput,
} from '@/lib/validations/transaction.schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTransaction(data: TransactionInput) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('باید وارد شوید')

  const parsed = transactionSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.transaction.create({
    data: { ...parsed.data, userId: session.user.id },
  })

  revalidatePath('/transactions')
  revalidatePath('/dashboard')
  redirect('/transactions')
}

export async function updateTransaction(id: string, data: TransactionInput) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('باید وارد شوید')

  const parsed = transactionSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  const existing = await prisma.transaction.findUnique({ where: { id } })

  console.log('TRANSACTION:', existing)
  console.log('TRANSACTION USER ID:', existing?.userId)
  console.log('SESSION USER ID:', session.user.id)

  if (!existing || existing.userId !== session.user.id) {
    throw new Error('دسترسی غیرمجاز')
  }

  await prisma.transaction.update({
    where: { id },
    data: parsed.data,
  })

  revalidatePath('/transactions')
  revalidatePath(`/transactions/${id}`)
  revalidatePath('/dashboard')
  redirect(`/transactions/${id}`)
}

export async function deleteTransaction(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('باید وارد شوید')

  const existing = await prisma.transaction.findUnique({ where: { id } })
  if (!existing || existing.userId !== session.user.id) {
    throw new Error('دسترسی غیرمجاز')
  }

  await prisma.transaction.delete({ where: { id } })

  revalidatePath('/transactions')
  revalidatePath('/dashboard')
  redirect('/transactions')
}
