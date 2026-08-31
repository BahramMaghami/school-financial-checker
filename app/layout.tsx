import type { Metadata } from 'next'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { iranSans } from '@/app/fonts'

export const metadata: Metadata = {
  title: 'مدیریت مالی مدرسه',
  description: 'سیستم مدیریت هزینه و درآمد مدرسه',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={iranSans.variable}>
      <body className="font-sans antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
