import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { auth } from '@/lib/auth'

const f = createUploadthing()

export const ourFileRouter = {
  invoiceImage: f({
    image: { maxFileSize: '16MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await auth()
      if (!session?.user?.id) {
        throw new UploadThingError('باید وارد شوید')
      }
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.ufsUrl, userId: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
