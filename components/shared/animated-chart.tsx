'use client'

import { useEffect, useState } from 'react'

const charts = [
  {
    value: '۱۲۳,۴۵۰,۰۰۰',
    label: 'درآمد این ماه',
    path: `
      M 10 145
      C 35 135, 45 120, 65 125
      C 85 130, 95 95, 120 105
      C 145 115, 155 70, 180 80
      C 205 90, 220 45, 245 55
      C 265 65, 280 30, 310 20
    `,
  },

  {
    value: '۹۸,۲۰۰,۰۰۰',
    label: 'درآمد این ماه',
    path: `
      M 10 120
      C 35 90, 50 95, 70 110
      C 90 125, 105 135, 125 105
      C 145 75, 165 80, 180 95
      C 200 110, 220 100, 235 65
      C 255 30, 280 50, 310 35
    `,
  },

  {
    value: '۱۵۶,۸۰۰,۰۰۰',
    label: 'درآمد این ماه',
    path: `
      M 10 80
      C 30 110, 45 115, 65 90
      C 85 65, 100 55, 120 80
      C 140 105, 155 120, 175 85
      C 195 50, 210 45, 230 70
      C 250 95, 275 85, 290 55
      C 300 40, 305 30, 310 25
    `,
  },

  {
    value: '۷۶,۴۰۰,۰۰۰',
    label: 'درآمد این ماه',
    path: `
      M 10 130
      C 30 125, 40 85, 60 90
      C 80 95, 90 145, 110 135
      C 130 125, 135 75, 155 65
      C 175 55, 185 100, 205 95
      C 225 90, 235 40, 255 45
      C 275 50, 290 30, 310 15
    `,
  },
]

export function AnimatedChart() {
  const [chartIndex, setChartIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setChartIndex((prev) => (prev + 1) % charts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const chart = charts[chartIndex]

  return (
    <div className="mt-10 w-full max-w-2xl">
      {/* Chart header */}
      <div className="mb-4 flex items-end justify-between px-2">
        <div>
          <p className="text-xs text-muted-foreground">{chart.label}</p>

          <p
            key={chart.value}
            className="mt-1 text-2xl font-bold tracking-tight animate-fade-up"
          >
            {chart.value}
            <span className="mr-1 text-xs font-normal text-muted-foreground">
              تومان
            </span>
          </p>
        </div>

        <div className="text-xs text-muted-foreground">ماه جاری</div>
      </div>

      {/* Chart */}
      <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm backdrop-blur-sm">
        <svg
          viewBox="0 0 320 170"
          preserveAspectRatio="none"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal grid */}
          <path
            d="
              M0 25 H320
              M0 55 H320
              M0 85 H320
              M0 115 H320
              M0 145 H320
            "
            stroke="currentColor"
            strokeOpacity="0.07"
            strokeWidth="1"
          />

          {/* Vertical grid */}
          <path
            d="
              M40 0 V170
              M80 0 V170
              M120 0 V170
              M160 0 V170
              M200 0 V170
              M240 0 V170
              M280 0 V170
            "
            stroke="currentColor"
            strokeOpacity="0.04"
            strokeWidth="1"
          />

          {/* Animated chart */}
          <path
            key={chartIndex}
            d={chart.path}
            className="financial-chart-line"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Endpoint */}
          <circle
            key={`dot-${chartIndex}`}
            cx="310"
            cy={
              chartIndex === 0
                ? 20
                : chartIndex === 1
                  ? 35
                  : chartIndex === 2
                    ? 25
                    : 15
            }
            r="5"
            className="financial-chart-dot"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  )
}
