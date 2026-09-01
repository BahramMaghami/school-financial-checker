import DateObject from 'react-date-object'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'

type TransactionType = 'درامد' | 'هزینه'

export interface ReportTransaction {
  id: string
  type: TransactionType
  amount: number
  title: string
  category: string
  date: Date
}

export function calculateSummary(transactions: ReportTransaction[]) {
  const totalIncome = transactions
    .filter((t) => t.type === 'درامد')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type === 'هزینه')
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    transactionCount: transactions.length,
  }
}

export function getDailyTrend(transactions: ReportTransaction[]) {
  const map = new Map<
    number,
    {
      day: number
      income: number
      expense: number
    }
  >()

  for (const transaction of transactions) {
    const persianDate = new DateObject({
      date: transaction.date,
      calendar: persian,
      locale: persian_fa,
    })

    const day = persianDate.day

    if (!map.has(day)) {
      map.set(day, {
        day,
        income: 0,
        expense: 0,
      })
    }

    const item = map.get(day)!

    if (transaction.type === 'درامد') {
      item.income += transaction.amount
    } else {
      item.expense += transaction.amount
    }
  }

  return Array.from(map.values()).sort((a, b) => a.day - b.day)
}

export function getMonthlyTrend(transactions: ReportTransaction[]) {
  const map = new Map<
    string,
    {
      month: number
      year: number
      label: string
      income: number
      expense: number
    }
  >()

  for (const transaction of transactions) {
    const date = transaction.date

    const year = date.getFullYear()
    const month = date.getMonth()

    const key = `${year}-${month}`

    if (!map.has(key)) {
      map.set(key, {
        year,
        month,
        label: date.toLocaleDateString('fa-IR', {
          month: 'long',
        }),
        income: 0,
        expense: 0,
      })
    }

    const item = map.get(key)!

    if (transaction.type === 'درامد') {
      item.income += transaction.amount
    } else {
      item.expense += transaction.amount
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year
    }

    return a.month - b.month
  })
}

export function getCategoryBreakdown(
  transactions: ReportTransaction[],
  type: TransactionType,
) {
  const map = new Map<string, number>()

  for (const transaction of transactions) {
    if (transaction.type !== type) continue

    map.set(
      transaction.category,
      (map.get(transaction.category) ?? 0) + transaction.amount,
    )
  }

  const total = Array.from(map.values()).reduce(
    (sum, amount) => sum + amount,
    0,
  )

  return Array.from(map.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
}
