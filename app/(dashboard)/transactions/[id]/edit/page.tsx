import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { TransactionForm } from '@/app/(dashboard)/transactions/new/transaction-form'

export default async function EditTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const transaction = await prisma.transaction.findUnique({ where: { id } })

  if (!transaction) notFound()

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">ویرایش تراکنش</h1>
      <TransactionForm
        transactionId={transaction.id}
        defaultValues={{
          type: transaction.type,
          amount: transaction.amount,
          title: transaction.title,
          category: transaction.category,
          date: transaction.date,
          description: transaction.description ?? undefined,
          invoiceUrl: transaction.invoiceUrl ?? undefined,
        }}
      />
    </div>
  )
}
