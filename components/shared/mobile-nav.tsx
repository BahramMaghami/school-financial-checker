'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { NavLinks } from './nav-links'
import { SignOutButton } from './sign-out-button'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        }
      ></SheetTrigger>
      <SheetContent side="right" className="w-64 p-0">
        <SheetHeader className="h-16 justify-center border-b border-border px-6">
          <SheetTitle className="text-right text-base font-bold self-center">
            مدیریت مالی مدرسه
          </SheetTitle>
        </SheetHeader>
        <NavLinks onNavigate={() => setOpen(false)} />
        <div className="absolute bottom-0 w-64 border-t border-border p-3">
          <SignOutButton />
        </div>
      </SheetContent>
    </Sheet>
  )
}
