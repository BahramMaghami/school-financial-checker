'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Camera, ImageIcon, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUploadThing } from '@/lib/uploadthing'

interface InvoiceUploaderProps {
  value?: string | null
  onChange: (url: string | null) => void
}

export function InvoiceUploader({ value, onChange }: InvoiceUploaderProps) {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const { startUpload, isUploading } = useUploadThing('invoiceImage', {
    onUploadProgress: (p) => setProgress(p),
    onClientUploadComplete: (res) => {
      const url = res?.[0]?.ufsUrl
      if (url) onChange(url)
      setProgress(0)
    },
    onUploadError: (err) => {
      setError('آپلود ناموفق بود: ' + err.message)
      setProgress(0)
    },
  })

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError('')
    startUpload([file])
  }

  if (value) {
    return (
      <div className="relative inline-block">
        <Image
          src={value}
          alt="فاکتور"
          width={160}
          height={160}
          className="h-40 w-40 rounded-lg border border-border object-cover"
        />
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          disabled={isUploading}
          onClick={() => galleryInputRef.current?.click()}
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImageIcon className="h-4 w-4" />
          )}
          انتخاب از گالری
        </Button>
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          disabled={isUploading}
          onClick={() => cameraInputRef.current?.click()}
        >
          <Camera className="h-4 w-4" />
          گرفتن عکس
        </Button>
      </div>

      {/* input گالری - بدون capture */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelected}
      />
      {/* input دوربین - با capture مستقیم دوربین گوشی رو باز می‌کنه */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelected}
      />

      {isUploading && (
        <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-foreground transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  )
}
