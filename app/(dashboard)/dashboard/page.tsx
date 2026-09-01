import Link from 'next/link'
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
} from 'lucide-react'
import prisma from '@/lib/prisma'
import { getCurrentJalaliMonthRange, toJalaliDay } from '@/lib/jalali'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardCharts } from '@/app/(dashboard)/dashboard/dashboard-charts'

export default async function DashboardPage() {
  const { start, end, daysInMonth, monthLabel } = getCurrentJalaliMonthRange()

  const transactions = await prisma.transaction.findMany({
    where: { date: { gte: start, lte: end } },
    orderBy: { date: 'asc' },
  })

  const income = transactions.filter((t) => t.type === 'درامد')
  const expense = transactions.filter((t) => t.type === 'هزینه')

  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = expense.reduce((sum, t) => sum + t.amount, 0)
  const net = totalIncome - totalExpense

  const incomeByDay = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    amount: 0,
  }))
  const expenseByDay = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    amount: 0,
  }))

  income.forEach((t) => {
    const entry = incomeByDay[toJalaliDay(t.date) - 1]
    if (entry) entry.amount += t.amount
  })
  expense.forEach((t) => {
    const entry = expenseByDay[toJalaliDay(t.date) - 1]
    if (entry) entry.amount += t.amount
  })

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">داشبورد</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            وضعیت مالی {monthLabel}
          </p>
        </div>
        <Button
          render={
            <Link href="/reports">
              گزارش جامع
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
          variant="outline"
          className="gap-2"
          nativeButton={false}
        ></Button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">درآمد این ماه</p>
              <p className="tabular-amount mt-1 text-2xl font-bold">
                {totalIncome.toLocaleString('fa-IR')}
                <span className="mr-1 text-sm font-normal text-muted-foreground">
                  تومان
                </span>
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">هزینه این ماه</p>
              <p className="tabular-amount mt-1 text-2xl font-bold">
                {totalExpense.toLocaleString('fa-IR')}
                <span className="mr-1 text-sm font-normal text-muted-foreground">
                  تومان
                </span>
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground">
              <TrendingDown className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">مانده</p>
              <p className="tabular-amount mt-1 text-2xl font-bold">
                {net >= 0 ? '+' : '−'}
                {Math.abs(net).toLocaleString('fa-IR')}
                <span className="mr-1 text-sm font-normal text-muted-foreground">
                  تومان
                </span>
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
              <Wallet className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">تعداد تراکنش‌ها</p>
              <p className="tabular-amount mt-1 text-2xl font-bold">
                {transactions.length.toLocaleString('fa-IR')}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
              <Receipt className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <DashboardCharts incomeByDay={incomeByDay} expenseByDay={expenseByDay} />
    </div>
  )
}
