import { TransactionForm } from '@/app/(dashboard)/transactions/new/transaction-form'

export default function NewTransactionPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">ثبت تراکنش جدید</h1>
      <TransactionForm />
    </div>
  )
}
