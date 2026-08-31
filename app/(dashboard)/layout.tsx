import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { NavLinks } from '@/components/shared/nav-links'
import { MobileNav } from '@/components/shared/mobile-nav'
import { SignOutButton } from '@/components/shared/sign-out-button'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="flex min-h-screen">
      {/* سایدبار — فقط دسکتاپ */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-l border-border bg-white md:flex md:flex-col">
        <div className="flex h-16 items-center border-b border-border px-6">
          <span className="text-lg font-bold mr-4">مدیریت مالی مدرسه</span>
        </div>
        <NavLinks />
        <div className="absolute bottom-0 w-60 border-t border-border p-3">
          <SignOutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* هدر — فقط موبایل */}
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-4 md:hidden">
          <span className="text-base font-bold">مدیریت مالی مدرسه</span>
          <MobileNav />
        </header>

        <main className="flex-1 bg-muted/30">{children}</main>
      </div>
    </div>
  )
}
