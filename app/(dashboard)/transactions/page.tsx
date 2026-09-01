import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const categoryLabels: Record<string, string> = {
  حقوق: 'حقوق',
  تعمیرات: 'تعمیرات',
  تجهیزات: 'تجهیزات',
  شهریه: 'شهریه',
  قبوض: 'قبوض',
  ملزومات: 'ملزومات',
  سایر: 'سایر',
}

export default async function TransactionsPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
  })

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">تراکنش‌ها</h1>

        <Button
          render={<Link href="/transactions/new">+ تراکنش جدید</Link>}
          nativeButton={false}
        />
      </div>

      <div className="w-full min-w-0 overflow-hidden">
        <div className="w-full min-w-0 overflow-x-auto">
          <Table className="min-w-[800px] table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[12%] whitespace-nowrap">
                  تاریخ
                </TableHead>

                <TableHead className="w-[18%] whitespace-nowrap">
                  عنوان
                </TableHead>

                <TableHead className="w-[16.66%] whitespace-nowrap">
                  دسته‌بندی
                </TableHead>

                <TableHead className="w-[10%] whitespace-nowrap">نوع</TableHead>

                <TableHead className="w-[22%] whitespace-nowrap">
                  مبلغ
                </TableHead>

                <TableHead className="w-[21.34%] whitespace-nowrap">
                  عملیات ها
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="whitespace-nowrap">
                    <Link href={`/transactions/${t.id}`}>
                      {new Date(t.date).toLocaleDateString('fa-IR')}
                    </Link>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <Link href={`/transactions/${t.id}`}>{t.title}</Link>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {categoryLabels[t.category]}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <Badge
                      variant={t.type === 'هزینه' ? 'destructive' : 'default'}
                    >
                      {t.type === 'درامد' ? 'درآمد' : 'هزینه'}
                    </Badge>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {t.amount.toLocaleString('fa-IR')} تومان
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <Button
                      render={
                        <Link href={`/transactions/${t.id}`}>جزییات</Link>
                      }
                      nativeButton={false}
                      variant="outline"
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
