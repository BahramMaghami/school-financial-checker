import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Pencil } from 'lucide-react'
import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { DeleteTransactionButton } from '@/app/(dashboard)/transactions/[id]/delete-transaction-button'
import { auth } from '@/lib/auth'

const categoryLabels: Record<string, string> = {
  SALARY: 'حقوق',
  MAINTENANCE: 'تعمیرات',
  EQUIPMENT: 'تجهیزات',
  TUITION: 'شهریه',
  UTILITIES: 'قبوض',
  SUPPLIES: 'ملزومات',
  OTHER: 'سایر',
}

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()
  const transaction = await prisma.transaction.findUnique({ where: { id } })
  if (!transaction) notFound()

  return (
    <div className="p-8">
      <Link
        href="/transactions"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowRight className="h-4 w-4" />
        بازگشت به تراکنش‌ها
      </Link>

      <div className="max-w-2xl rounded-xl border border-border bg-white">
        <div className="border-b border-border p-6">
          <div className="mb-1 flex items-center gap-2">
            <span
              className={
                transaction.type === 'درامد'
                  ? 'rounded-full bg-foreground px-2.5 py-0.5 text-xs font-medium text-background'
                  : 'rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground/70'
              }
            >
              {transaction.type === 'درامد' ? 'درآمد' : 'هزینه'}
            </span>
            <span className="text-sm text-muted-foreground">
              {categoryLabels[transaction.category]}
            </span>
          </div>
          <h1 className="text-2xl font-bold">{transaction.title}</h1>
          <p className="tabular-amount mt-2 text-3xl font-bold">
            {transaction.type === 'درامد' ? '+' : '−'}
            {transaction.amount.toLocaleString('fa-IR')}
            <span className="mr-1.5 text-base font-normal text-muted-foreground">
              تومان
            </span>
          </p>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">تاریخ</span>
            <span className="font-medium">
              {new Date(transaction.date).toLocaleDateString('fa-IR')}
            </span>
          </div>

          {transaction.description && (
            <div className="border-t border-border pt-4">
              <p className="mb-1 text-sm text-muted-foreground">توضیحات</p>
              <p className="text-sm leading-relaxed">
                {transaction.description}
              </p>
            </div>
          )}

          {transaction.invoiceUrl && (
            <div className="border-t border-border pt-4">
              <p className="mb-2 text-sm text-muted-foreground">عکس فاکتور</p>
              <Image
                src={transaction.invoiceUrl}
                alt="فاکتور"
                width={500}
                height={350}
                className="rounded-lg border border-border object-cover"
              />
            </div>
          )}
        </div>

        {session?.user?.role === 'admin' && (
          <div className="flex gap-2 border-t border-border p-6">
            <Button
              render={
                <Link href={`/transactions/${transaction.id}/edit`}>
                  <Pencil className="h-4 w-4" />
                  ویرایش
                </Link>
              }
              variant="outline"
              className="gap-2"
              nativeButton={false}
            ></Button>
            <DeleteTransactionButton id={transaction.id} />
          </div>
        )}
      </div>
    </div>
  )
}
