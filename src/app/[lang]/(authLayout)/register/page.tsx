import RegisterForm from '~/components/pages/auth/RegisterForm'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('Register')
}

export default function RegisterPage() {
  return <RegisterForm />
}
