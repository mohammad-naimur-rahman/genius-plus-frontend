import { FieldErrors, FieldValues } from 'react-hook-form'
import { cn } from '~/lib/utils'
import { formatFieldName } from '~/utils/form/formatFieldName'

interface Props {
  required?: boolean
  name?: string
  errors: FieldErrors<FieldValues>
  label?: string
  errorClassName?: string
}

export default function FormFieldError({ required, name, errors, label, errorClassName }: Props) {
  return (
    <>
      {required && name ? (
        <div className={cn('my-1 flex justify-start', errorClassName)}>
          {errors[name] && errors[name]?.type === 'required' ? (
            <span className='h-3 !text-left text-xs font-medium leading-none text-red-500'>
              {label || formatFieldName(name)} is required
            </span>
          ) : (
            <div className='h-3 w-full' />
          )}
        </div>
      ) : (
        <div className='h-4 w-full' />
      )}
    </>
  )
}
