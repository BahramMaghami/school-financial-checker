import { Card, CardContent } from '@/components/ui/card'

interface ReportSummaryProps {
  totalIncome: number
  totalExpense: number
  balance: number
  transactionCount: number
}

function formatAmount(amount: number) {
  return `${amount.toLocaleString('fa-IR')} تومان`
}

export function ReportSummary({
  totalIncome,
  totalExpense,
  balance,
  transactionCount,
}: ReportSummaryProps) {
  const items = [
    {
      title: 'درآمد کل',
      value: formatAmount(totalIncome),
    },
    {
      title: 'هزینه کل',
      value: formatAmount(totalExpense),
    },
    {
      title: 'مانده',
      value: formatAmount(balance),
    },
    {
      title: 'تعداد تراکنش',
      value: transactionCount.toLocaleString('fa-IR'),
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.title}>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">{item.title}</p>

            <p className="mt-2 text-lg font-bold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
