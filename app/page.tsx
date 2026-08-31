import Link from 'next/link'
import { ArrowLeft, School } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedChart } from '@/components/shared/animated-chart'

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white">
      {/* پس‌زمینه گرید ظریف - دائماً در حال drift */}
      <div className="grid-drift absolute inset-0 -z-10 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:56px_56px]" />

      {/* درخشش محو پس‌زمینه */}
      <div className="glow-pulse absolute -z-10 h-72 w-72 rounded-full bg-foreground/5 blur-3xl" />

      <div className="flex flex-col items-center px-6 text-center">
        {/* لوگو با حلقه‌ی چرخان دائمی دورش */}
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
          <div className="animate-fade-up relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-foreground text-2xl font-bold text-background">
            <School />
          </div>
        </div>

        <h1 className="animate-fade-up-1 text-2xl font-bold tracking-tight sm:text-3xl">
          سیستم مدیریت مالی مدرسه فاطمیه
        </h1>

        <p className="animate-fade-up-2 mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          مدیریت هزینه‌ها و درآمدها، ساده و شفاف
        </p>

        <div className="animate-fade-up-2">
          <AnimatedChart />
        </div>

        <div className="animate-fade-up-3 mt-8">
          <Button
            render={
              <Link href="/login">
                ورود به پنل
                <ArrowLeft className="h-4 w-4" />
              </Link>
            }
            size="lg"
            className="h-12 gap-2 px-8"
            nativeButton={false}
          ></Button>
        </div>
      </div>

      <p className="animate-fade-up-3 absolute bottom-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} تمامی حقوق محفوظ است
      </p>
    </div>
  )
}
