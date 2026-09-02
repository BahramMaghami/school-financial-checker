'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const INCOME_COLOR = '#7DAE95' // سبز ملایم
const EXPENSE_COLOR = '#D98C8C' // قرمز ملایم

interface DayAmount {
  day: number
  amount: number
}

interface DailyTooltipProps {
  active?: boolean
  payload?: Array<{
    value?: number | string
  }>
  label?: number | string
}

interface OverviewTooltipProps {
  active?: boolean
  payload?: Array<{
    dataKey?: string | number
    value?: number | string
  }>
  label?: number | string
}

/* ---------------------------------- */
/* Daily Tooltip                      */
/* ---------------------------------- */

function DailyTooltip({ active, payload, label }: DailyTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const amount = Number(payload[0]?.value ?? 0)

  return (
    <div className="rounded-lg border border-border bg-white px-3 py-2 text-xs shadow-sm">
      <p className="mb-1 text-muted-foreground">روز {label}</p>

      <p className="tabular-amount font-semibold">
        {amount.toLocaleString('fa-IR')} تومان
      </p>
    </div>
  )
}

/* ---------------------------------- */
/* Overview Tooltip                   */
/* ---------------------------------- */

function OverviewTooltip({ active, payload, label }: OverviewTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const income = payload.find((item) => item.dataKey === 'income')?.value ?? 0

  const expense = payload.find((item) => item.dataKey === 'expense')?.value ?? 0

  return (
    <div className="rounded-lg border border-border bg-white px-3 py-2 text-xs shadow-sm">
      <p className="mb-1.5 text-muted-foreground">روز {label}</p>

      <div className="space-y-1">
        {/* درآمد */}
        <p className="tabular-amount flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: INCOME_COLOR }}
            />
            درآمد
          </span>

          <span className="font-semibold">
            {Number(income).toLocaleString('fa-IR')}
          </span>
        </p>

        {/* هزینه */}
        <p className="tabular-amount flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: EXPENSE_COLOR }}
            />
            هزینه
          </span>

          <span className="font-semibold">
            {Number(expense).toLocaleString('fa-IR')}
          </span>
        </p>
      </div>
    </div>
  )
}

/* ---------------------------------- */
/* Legend                             */
/* ---------------------------------- */

function OverviewLegend() {
  return (
    <div className="flex items-center gap-5 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 rounded-sm"
          style={{ backgroundColor: INCOME_COLOR }}
        />
        درآمد
      </span>

      <span className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 rounded-sm"
          style={{ backgroundColor: EXPENSE_COLOR }}
        />
        هزینه
      </span>
    </div>
  )
}

/* ---------------------------------- */
/* Dashboard Charts                   */
/* ---------------------------------- */

export function DashboardCharts({
  incomeByDay,
  expenseByDay,
}: {
  incomeByDay: DayAmount[]
  expenseByDay: DayAmount[]
}) {
  /*
   * income و expense فقط اسم فیلدهای داده‌ی نمودار هستند.
   *
   * enum دیتابیس همچنان:
   *
   * type = "درامد" | "هزینه"
   *
   * است و هیچ تغییری در Prisma لازم نیست.
   */

  const expenseMap = new Map(
    expenseByDay.map((item) => [item.day, item.amount]),
  )

  const overviewData = incomeByDay.map((item) => ({
    day: item.day,
    income: item.amount,
    expense: expenseMap.get(item.day) ?? 0,
  }))

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* -------------------------------- */}
      {/* Overview                         */}
      {/* -------------------------------- */}

      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">نمای کلی ماه</CardTitle>

          <OverviewLegend />
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={overviewData} barGap={2} barCategoryGap="20%">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#00000010"
                vertical={false}
              />

              <XAxis
                dataKey="day"
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
                width={40}
              />

              <Tooltip
                content={<OverviewTooltip />}
                cursor={{ fill: '#00000006' }}
              />

              <Bar dataKey="income" fill={INCOME_COLOR} radius={[3, 3, 0, 0]} />

              <Bar
                dataKey="expense"
                fill={EXPENSE_COLOR}
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* -------------------------------- */}
      {/* Income                           */}
      {/* -------------------------------- */}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">روند درآمد ماه</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={incomeByDay}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#00000010"
                vertical={false}
              />

              <XAxis
                dataKey="day"
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
                width={40}
              />

              <Tooltip
                content={<DailyTooltip />}
                cursor={{ fill: '#00000006' }}
              />

              <Bar dataKey="amount" fill={INCOME_COLOR} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* -------------------------------- */}
      {/* Expense                          */}
      {/* -------------------------------- */}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">روند هزینه ماه</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={expenseByDay}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#00000010"
                vertical={false}
              />

              <XAxis
                dataKey="day"
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
                width={40}
              />

              <Tooltip
                content={<DailyTooltip />}
                cursor={{ fill: '#00000006' }}
              />

              <Bar
                dataKey="amount"
                fill={EXPENSE_COLOR}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
