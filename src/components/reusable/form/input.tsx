'use client'

import * as React from 'react'

import { Eye, EyeOff } from 'lucide-react'
import { type RegisterOptions, useFormContext } from 'react-hook-form'
import { cn } from '~/lib/utils'
import FormFieldError from './form-field-error'
import FormLabel from './form-label'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
  name?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  hookFormConfig?: RegisterOptions
  label?: string
  labelClassName?: string
  id?: string
  hint?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      containerClassName,
      className,
      type,
      icon,
      iconPosition = 'left',
      name,
      hookFormConfig,
      label,
      labelClassName,
      required,
      id,
      hint,
      ...props
    },
    ref
  ) => {
    const {
      register,
      formState: { errors }
    } = useFormContext()
    const inputProps = name ? { ...register(name, { required, ...hookFormConfig }), ...props } : { ...props }

    const [showPassword, setshowPassword] = React.useState(false)

    return (
      <div className={cn(containerClassName)}>
        <FormLabel label={label} labelClassName={labelClassName} name={id ?? name} required={required} hint={hint} />
        <div className='relative'>
          <input
            id={id ?? name}
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              { 'pl-10': icon && iconPosition === 'left' },
              { 'pr-10': icon && iconPosition === 'right' },
              className
            )}
            ref={ref}
            {...inputProps}
          />
          {type === 'password' ? (
            <>
              {showPassword ? (
                <Eye
                  className='text-text absolute right-3 top-1/2 size-5 -translate-y-1/2 cursor-pointer'
                  onClick={() => setshowPassword(false)}
                />
              ) : (
                <EyeOff
                  className='text-text absolute right-3 top-1/2 size-5 -translate-y-1/2 cursor-pointer'
                  onClick={() => setshowPassword(true)}
                />
              )}
            </>
          ) : null}
          {icon && (
            <div
              className={cn('absolute inset-y-0 top-0 flex items-center text-muted-foreground [&>svg]:size-5', {
                'left-2.5': iconPosition === 'left',
                'right-2.5': iconPosition === 'right'
              })}
            >
              {icon}
            </div>
          )}
        </div>
        <FormFieldError name={name} required={required} label={label} errors={errors} />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
