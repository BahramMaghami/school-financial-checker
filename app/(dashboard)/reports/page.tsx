import prisma from '@/lib/prisma'

import { ReportFilters } from './report-filters'
import { ReportSummary } from './report-summary'
import { ReportTrendChart } from './report-trend-chart'
import { ReportCategoryChart } from './report-category-chart'
import { ReportTransactionsTable } from './report-transactions-table'
import DateObject from 'react-date-object'
import persian from 'react-date-object/calendars/persian'

import {
  calculateSummary,
  getDailyTrend,
  getMonthlyTrend,
  getCategoryBreakdown,
} from '@/lib/reports/report-utils'

interface ReportsPageProps {
  searchParams: Promise<{
    mode?: string
    month?: string
    from?: string
    to?: string
  }>
}

function getCurrentMonthRange() {
  const today = new DateObject({
    date: new Date(),
    calendar: persian,
  })

  const startOfMonth = new DateObject({
    date: today.toDate(),
    calendar: persian,
  })

  startOfMonth.set({
    day: 1,
  })

  return {
    start: startOfMonth.toDate(),
    end: today.toDate(),
  }
}

function getMonthRange(date: Date) {
  const selectedDate = new DateObject({
    date,
    calendar: persian,
  })

  const startOfMonth = new DateObject({
    date: selectedDate.toDate(),
    calendar: persian,
  })

  startOfMonth.set({
    day: 1,
  })

  const nextMonth = new DateObject({
    date: startOfMonth.toDate(),
    calendar: persian,
  })

  nextMonth.add(1, 'month')

  return {
    start: startOfMonth.toDate(),
    end: nextMonth.toDate(),
  }
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const params = await searchParams

  let start: Date
  let end: Date

  if (params.mode === 'range' && params.from && params.to) {
    start = new Date(params.from)

    end = new Date(params.to)
    end.setDate(end.getDate() + 1)
  } else if (params.mode === 'month' && params.month) {
    const month = new Date(params.month)

    const range = getMonthRange(month)

    start = range.start
    end = range.end
  } else {
    const range = getCurrentMonthRange()

    start = range.start
    end = range.end
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      date: {
        gte: start,
        lt: end,
      },
    },
    orderBy: {
      date: 'desc',
    },
  })

  const reportTransactions = transactions.map((transaction) => ({
    id: transaction.id,
    type: transaction.type,
    amount: transaction.amount,
    title: transaction.title,
    category: transaction.category,
    date: transaction.date,
  }))

  const summary = calculateSummary(reportTransactions)

  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  )

  const granularity = days <= 45 ? 'day' : 'month'

  const trendData =
    granularity === 'day'
      ? getDailyTrend(reportTransactions).map((item) => ({
          label: item.day,
          income: item.income,
          expense: item.expense,
        }))
      : getMonthlyTrend(reportTransactions).map((item) => ({
          label: item.label,
          income: item.income,
          expense: item.expense,
        }))

  const expenseCategories = getCategoryBreakdown(reportTransactions, 'هزینه')

  const incomeCategories = getCategoryBreakdown(reportTransactions, 'درامد')

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-xl font-bold">گزارش‌های مالی</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          بررسی و تحلیل تراکنش‌های مالی
        </p>
      </div>

      <ReportFilters />

      <ReportSummary
        totalIncome={summary.totalIncome}
        totalExpense={summary.totalExpense}
        balance={summary.balance}
        transactionCount={summary.transactionCount}
      />

      <ReportTrendChart data={trendData} granularity={granularity} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ReportCategoryChart data={expenseCategories} type="هزینه" />

        <ReportCategoryChart data={incomeCategories} type="درامد" />
      </div>

      <ReportTransactionsTable transactions={reportTransactions} />
    </div>
  )
}
