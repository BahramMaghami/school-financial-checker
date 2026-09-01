import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ReportTransaction {
  id: string
  type: 'درامد' | 'هزینه'
  title: string
  category: string
  amount: number
  date: Date
}

const categoryLabels: Record<string, string> = {
  حقوق: 'حقوق',
  تعمیرات: 'تعمیرات',
  تجهیزات: 'تجهیزات',
  شهریه: 'شهریه',
  قبوض: 'قبوض',
  ملزومات: 'ملزومات',
  سایر: 'سایر',
}

export function ReportTransactionsTable({
  transactions,
}: {
  transactions: ReportTransaction[]
}) {
  return (
    <div className="rounded-lg border bg-background">
      <div className="border-b p-4">
        <h2 className="font-semibold">تراکنش‌های بازه</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {transactions.length.toLocaleString('fa-IR')} تراکنش
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[850px]">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[15%]">تاریخ</TableHead>

                <TableHead className="w-[20%]">عنوان</TableHead>

                <TableHead className="w-[17%]">دسته‌بندی</TableHead>

                <TableHead className="w-[12%]">نوع</TableHead>

                <TableHead className="w-[20%]">مبلغ</TableHead>

                <TableHead className="w-[16%]">عملیات</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {transaction.date.toLocaleDateString('fa-IR')}
                  </TableCell>

                  <TableCell>
                    <Link
                      href={`/transactions/${transaction.id}`}
                      className="font-medium hover:underline"
                    >
                      {transaction.title}
                    </Link>
                  </TableCell>

                  <TableCell>
                    {categoryLabels[transaction.category] ??
                      transaction.category}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        transaction.type === 'هزینه' ? 'destructive' : 'default'
                      }
                    >
                      {transaction.type === 'درامد' ? 'درآمد' : 'هزینه'}
                    </Badge>
                  </TableCell>

                  <TableCell className="tabular-nums">
                    {transaction.amount.toLocaleString('fa-IR')} تومان
                  </TableCell>

                  <TableCell>
                    <Button
                      render={
                        <Link href={`/transactions/${transaction.id}`}>
                          جزئیات
                        </Link>
                      }
                      nativeButton={false}
                      variant="outline"
                      size="sm"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
