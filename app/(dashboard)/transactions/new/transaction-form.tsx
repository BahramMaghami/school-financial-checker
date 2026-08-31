'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  transactionSchema,
  TransactionInput,
} from '@/lib/validations/transaction.schema'
import {
  createTransaction,
  updateTransaction,
} from '@/actions/transaction.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Card, CardContent } from '@/components/ui/card'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'

const categories = [
  { value: 'حقوق', label: 'حقوق' },
  { value: 'تعمیرات', label: 'تعمیرات' },
  { value: 'تجهیزات', label: 'تجهیزات' },
  { value: 'شهریه', label: 'شهریه' },
  { value: 'قبوض', label: 'قبوض' },
  { value: 'ملزومات', label: 'ملزومات' },
  { value: 'سایر', label: 'سایر' },
]

interface TransactionFormProps {
  transactionId?: string
  defaultValues?: Partial<TransactionInput>
}

export function TransactionForm({
  transactionId,
  defaultValues,
}: TransactionFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const isEdit = !!transactionId

  const form = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'هزینه',
      date: new Date(),
      title: '',
      amount: 0,
      category: 'سایر',
      description: '',
      ...defaultValues,
    },
  })

  async function onSubmit(data: TransactionInput) {
    setSubmitting(true)
    setServerError('')

    const result = isEdit
      ? await updateTransaction(transactionId!, data)
      : await createTransaction(data)

    setSubmitting(false)
    if (result && !result.success) {
      setServerError('لطفاً خطاهای فرم را بررسی کنید')
    }
  }

  return (
    <Card className="max-w-lg">
      <CardContent className="pt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              control={form.control}
              name="type"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>نوع</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="هزینه">هزینه</SelectItem>
                      <SelectItem value="درامد">درآمد</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>عنوان</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="amount"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>مبلغ (تومان)</FieldLabel>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>دسته‌بندی</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="date"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>تاریخ</FieldLabel>

                  <DatePicker
                    value={field.value}
                    onChange={(date) => {
                      field.onChange(date?.toDate())
                    }}
                    calendar={persian}
                    locale={persian_fa}
                    format="YYYY/MM/DD"
                    calendarPosition="bottom-right"
                    inputClass="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>توضیحات (اختیاری)</FieldLabel>
                  <Textarea {...field} value={field.value ?? ''} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {serverError && (
              <p className="text-sm text-destructive">{serverError}</p>
            )}

            <Button type="submit" disabled={submitting}>
              {submitting
                ? 'در حال ذخیره...'
                : isEdit
                  ? 'به‌روزرسانی'
                  : 'ذخیره'}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
