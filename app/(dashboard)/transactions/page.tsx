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
        ></Button>
      </div>

      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[12%]">تاریخ</TableHead>
            <TableHead className="w-[18%]">عنوان</TableHead>
            <TableHead className="w-[16.66%]">دسته‌بندی</TableHead>
            <TableHead className="w-[10%]">نوع</TableHead>
            <TableHead className="w-[22%]">مبلغ</TableHead>
            <TableHead className="w-[21.34%]">جزییات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="w-[12%]">
                <Link href={`/transactions/${t.id}`} className="block">
                  {new Date(t.date).toLocaleDateString('fa-IR')}
                </Link>
              </TableCell>

              <TableCell className="w-[18%] mr-2">
                <Link href={`/transactions/${t.id}`} className="block mr-2">
                  {t.title}
                </Link>
              </TableCell>

              <TableCell className="w-[16.66%]">
                {categoryLabels[t.category]}
              </TableCell>

              <TableCell className="w-[10%]">
                <Badge variant={t.type === 'هزینه' ? 'destructive' : 'default'}>
                  {t.type === 'درامد' ? 'درآمد' : 'هزینه'}
                </Badge>
              </TableCell>

              <TableCell className="w-[22%] mr-2">
                {t.amount.toLocaleString('fa-IR')} تومان
              </TableCell>

              <TableCell className="w-[21.34%] ">
                <Button
                  render={<Link href={`/transactions/${t.id}`}>جزییات</Link>}
                  nativeButton={false}
                  variant={'outline'}
                ></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
