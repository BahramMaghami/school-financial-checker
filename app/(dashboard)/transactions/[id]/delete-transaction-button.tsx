'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteTransaction } from '@/actions/transaction.actions'

export function DeleteTransactionButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    await deleteTransaction(id)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="destructive">حذف</Button>}
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'mr-4'}>حذف تراکنش</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          آیا مطمئن هستید؟ این عمل غیرقابل بازگشت است.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            انصراف
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'در حال حذف...' : 'حذف کن'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
