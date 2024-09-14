import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import Hint from '../common/hint'

interface Props {
  label?: string
  labelClassName?: string
  name?: string
  required?: boolean
  hint?: string
}

export default function FormLabel({ label, labelClassName, name, required, hint }: Props) {
  return (
    <>
      {label && (
        <Label className={cn('mb-2 flex items-center gap-x-1.5 text-text-gray', labelClassName)} htmlFor={name}>
          {label}
          {required ? '*' : null}
          {hint ? <Hint>{hint}</Hint> : null}
        </Label>
      )}
    </>
  )
}
