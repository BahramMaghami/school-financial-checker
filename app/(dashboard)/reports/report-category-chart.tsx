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

interface CategoryItem {
  category: string
  amount: number
  percentage: number
}

interface ReportCategoryChartProps {
  data: CategoryItem[]
  type: 'درامد' | 'هزینه'
}

export function ReportCategoryChart({ data, type }: ReportCategoryChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          تفکیک {type === 'هزینه' ? 'هزینه‌ها' : 'درآمدها'} بر اساس دسته‌بندی
        </CardTitle>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            داده‌ای برای نمایش وجود ندارد
          </p>
        ) : (
          <>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{
                    left: 10,
                    right: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#00000010"
                  />

                  <XAxis
                    type="number"
                    tick={{
                      fontSize: 11,
                      fill: '#737373',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    type="category"
                    dataKey="category"
                    width={65}
                    tick={{
                      fontSize: 11,
                      fill: '#737373',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    formatter={(value) =>
                      `${Number(value).toLocaleString('fa-IR')} تومان`
                    }
                  />

                  <Bar
                    dataKey="amount"
                    fill={type === 'هزینه' ? '#a3a3a3' : '#0a0a0a'}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2">
              {data.map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{item.category}</span>

                  <span className="tabular-nums text-muted-foreground">
                    {item.amount.toLocaleString('fa-IR')} تومان
                    {' · '}
                    {item.percentage.toLocaleString('fa-IR')}٪
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
