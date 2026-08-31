import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LayoutDashboard, Receipt, BarChart3, LogOut } from 'lucide-react'
import { SignOutButton } from '@/components/shared/sign-out-button'

const navItems = [
  { href: '/dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { href: '/transactions', label: 'تراکنش‌ها', icon: Receipt },
  { href: '/reports', label: 'گزارش‌ها', icon: BarChart3 },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 border-l border-border bg-white">
        <div className="flex h-16 items-center border-b border-border px-6">
          <span className="text-lg font-bold">مدیریت مالی مدرسه</span>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-60 border-t border-border p-3">
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 bg-muted/30">{children}</main>
    </div>
  )
}
