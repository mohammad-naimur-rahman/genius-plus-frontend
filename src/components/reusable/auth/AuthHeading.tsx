import logoDark from '~/assets/logos/logo-dark.png'
import logo from '~/assets/logos/logo.png'
import Logo from '~/components/common/Logo'
import Typography from '~/components/ui/typography'
import { useLogo } from '~/hooks/useLogo'

interface Props {
  title: string
  description: string
}

export default function AuthHeading({ title, description }: Props) {
  const logoSrc = useLogo(logo, logoDark)
  return (
    <>
      <Logo />
      <Typography variant='h3' className='mt-4'>
        {title}
      </Typography>
      <p className='mb-5 mt-3 text-muted-foreground'>{description}</p>
    </>
  )
}
