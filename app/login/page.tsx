'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from 'lucide-react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    setLoading(false)
    if (res?.error) {
      setError('ایمیل یا رمز عبور اشتباه است')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <Card className="w-full max-w-sm">
        <CardHeader className="mb-8 text-center">
          <CardTitle>
            <div className="mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
              <User />
            </div>
            <h1 className="text-xl font-bold">ورود به سیستم</h1>
          </CardTitle>
          <CardDescription>مدیریت هزینه و درآمد مدرسه</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="h-11"
              />
            </div>
            {error && (
              <p className="rounded-md bg-foreground/5 px-3 py-2 text-sm text-foreground">
                {error}
              </p>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="h-11 w-full" disabled={loading}>
            {loading ? 'در حال ورود...' : 'ورود'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
