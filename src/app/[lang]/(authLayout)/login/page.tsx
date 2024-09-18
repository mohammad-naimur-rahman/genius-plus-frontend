import LoginForm from '~/components/pages/auth/LoginForm'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('Login')
}
export default function LoginPage() {
  return <LoginForm />
}
