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
    orderBy: {
      date: 'desc',
    },
  })

  return (
    <div className="min-w-0 p-6">
      {/* Page Header */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="shrink-0 text-xl font-bold">تراکنش‌ها</h1>

        <Button
          render={<Link href="/transactions/new">+ تراکنش جدید</Link>}
          nativeButton={false}
        />
      </div>

      {/* Table */}
      <Table className="min-w-[850px] table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[110px]">تاریخ</TableHead>

            <TableHead className="w-[180px]">عنوان</TableHead>

            <TableHead className="w-[150px]">دسته‌بندی</TableHead>

            <TableHead className="w-[100px]">نوع</TableHead>

            <TableHead className="w-[190px]">مبلغ</TableHead>

            <TableHead className="w-[170px]">عملیات‌ها</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t.id}>
              <TableCell>
                <Link href={`/transactions/${t.id}`} className="block">
                  {new Date(t.date).toLocaleDateString('fa-IR')}
                </Link>
              </TableCell>

              <TableCell>
                <Link href={`/transactions/${t.id}`} className="block">
                  {t.title}
                </Link>
              </TableCell>

              <TableCell>{categoryLabels[t.category]}</TableCell>

              <TableCell>
                <Badge variant={t.type === 'هزینه' ? 'destructive' : 'default'}>
                  {t.type === 'درامد' ? 'درآمد' : 'هزینه'}
                </Badge>
              </TableCell>

              <TableCell>{t.amount.toLocaleString('fa-IR')} تومان</TableCell>

              <TableCell>
                <Button
                  render={<Link href={`/transactions/${t.id}`}>جزییات</Link>}
                  nativeButton={false}
                  variant="outline"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
