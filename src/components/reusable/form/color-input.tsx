import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '~/lib/utils'
import styles from '~/styles/components/reusable/form/colorInput.module.scss'
import FormFieldError from './form-field-error'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  id?: string
  className?: string
  required?: boolean
  containerClassName?: string
}

export default function ColorInput({ name, label, id, className, required, containerClassName, ...props }: Props) {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  return (
    <div className={containerClassName}>
      <label
        className={cn('flex items-center gap-2 rounded-lg bg-text-heading px-2 py-1.5 text-foreground', className)}
        htmlFor={id || name}
      >
        <input
          type='color'
          className={styles.colorInput}
          id={id || name}
          {...register(name, { required })}
          {...props}
        />
        <p className='text-sm font-medium'>{label}</p>
      </label>
      <FormFieldError name={name} required={required} label={label} errors={errors} />
    </div>
  )
}
