import RegisterVerifyForm from '~/components/pages/auth/RegisterVerifyForm'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('Signup Verify')
}

export default function RegisterVerifyPage() {
  return <RegisterVerifyForm />
}
