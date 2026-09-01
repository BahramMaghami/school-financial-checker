'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

type FilterMode = 'current' | 'month' | 'range'

export function ReportFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [mode, setMode] = useState<FilterMode>('current')

  const [month, setMonth] = useState<Date | null>(new Date())

  const [from, setFrom] = useState<Date | null>(null)
  const [to, setTo] = useState<Date | null>(null)

  function applyFilter() {
    const params = new URLSearchParams()

    if (mode === 'current') {
      params.set('mode', 'current')
    }

    if (mode === 'month' && month) {
      params.set('mode', 'month')
      params.set('month', month.toISOString())
    }

    if (mode === 'range' && from && to) {
      params.set('mode', 'range')
      params.set('from', from.toISOString())
      params.set('to', to.toISOString())
    }

    router.push(`/reports?${params.toString()}`)
  }

  return (
    <Card>
      <CardContent className="space-y-5 pt-6">
        <div>
          <Label className="mb-3 block">نوع بازه گزارش</Label>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={mode === 'current' ? 'default' : 'outline'}
              onClick={() => setMode('current')}
            >
              ماه جاری
            </Button>

            <Button
              type="button"
              variant={mode === 'month' ? 'default' : 'outline'}
              onClick={() => setMode('month')}
            >
              انتخاب ماه
            </Button>

            <Button
              type="button"
              variant={mode === 'range' ? 'default' : 'outline'}
              onClick={() => setMode('range')}
            >
              بازه دلخواه
            </Button>
          </div>
        </div>

        {mode === 'month' && (
          <div className="space-y-2">
            <Label>ماه</Label>

            <DatePicker
              value={month}
              onChange={(date) => {
                setMonth(date?.toDate() ?? null)
              }}
              calendar={persian}
              locale={persian_fa}
              format="MMMM YYYY"
              onlyMonthPicker
              calendarPosition="bottom-right"
              inputClass="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
            />
          </div>
        )}

        {mode === 'range' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>از تاریخ</Label>

              <DatePicker
                value={from}
                onChange={(date) => {
                  setFrom(date?.toDate() ?? null)
                }}
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                calendarPosition="bottom-right"
                inputClass="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
              />
            </div>

            <div className="space-y-2">
              <Label>تا تاریخ</Label>

              <DatePicker
                value={to}
                onChange={(date) => {
                  setTo(date?.toDate() ?? null)
                }}
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                calendarPosition="bottom-right"
                inputClass="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={applyFilter}>مشاهده گزارش</Button>
        </div>
      </CardContent>
    </Card>
  )
}
