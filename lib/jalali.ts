import dayjs from 'dayjs'
import jalaliday from 'jalaliday'
import 'dayjs/locale/fa'

dayjs.extend(jalaliday)
dayjs.locale('fa')

export function getCurrentJalaliMonthRange() {
  const now = dayjs().calendar('jalali')
  const start = now.startOf('month')
  const end = now.endOf('month')

  return {
    start: start.toDate(),
    end: end.toDate(),
    daysInMonth: now.daysInMonth(),
    monthLabel: now.format('MMMM YYYY'),
  }
}

export function toJalaliDay(date: Date): number {
  return Number(dayjs(date).calendar('jalali').format('D'))
}
