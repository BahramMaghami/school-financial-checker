'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TrendItem {
  label: string | number
  income: number
  expense: number
}

interface ReportTrendChartProps {
  data: TrendItem[]
  granularity: 'day' | 'month'
}

interface TrendTooltipProps {
  active?: boolean
  payload?: Array<{
    dataKey?: string | number
    value?: number | string
  }>
  label?: string | number
  granularity: 'day' | 'month'
}

function TrendTooltip({
  active,
  payload,
  label,
  granularity,
}: TrendTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const income = payload.find((item) => item.dataKey === 'income')?.value ?? 0

  const expense = payload.find((item) => item.dataKey === 'expense')?.value ?? 0

  return (
    <div className="rounded-lg border bg-white px-3 py-2 text-xs shadow-sm">
      <p className="mb-2 text-muted-foreground">
        {granularity === 'day' ? `روز ${label}` : label}
      </p>

      <div className="space-y-1">
        <div className="flex justify-between gap-5">
          <span>درآمد</span>

          <strong>{Number(income).toLocaleString('fa-IR')} تومان</strong>
        </div>

        <div className="flex justify-between gap-5">
          <span>هزینه</span>

          <strong>{Number(expense).toLocaleString('fa-IR')} تومان</strong>
        </div>
      </div>
    </div>
  )
}

export function ReportTrendChart({ data, granularity }: ReportTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">روند مالی</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barGap={2} barCategoryGap="20%">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#00000010"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tick={{
                fontSize: 11,
                fill: '#737373',
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fontSize: 11,
                fill: '#737373',
              }}
              axisLine={false}
              tickLine={false}
              width={45}
            />

            <Tooltip
              content={<TrendTooltip granularity={granularity} />}
              cursor={{
                fill: '#00000006',
              }}
            />

            <Bar dataKey="income" fill="#0a0a0a" radius={[3, 3, 0, 0]} />

            <Bar dataKey="expense" fill="#a3a3a3" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
