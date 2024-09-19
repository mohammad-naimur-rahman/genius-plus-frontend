import logoDark from '~/assets/logos/logo-dark.png'
import logo from '~/assets/logos/logo.png'
import { Img } from '~/components/ui/img'
import Link from '~/components/ui/llink'
import Typography from '~/components/ui/typography'
import { APP_NAME } from '~/configs'
import { useLogo } from '~/hooks/useLogo'

interface Props {
  title: string
  description: string
}

export default function AuthHeading({ title, description }: Props) {
  const logoSrc = useLogo(logo, logoDark)
  return (
    <>
      <Link href='/'>
        <Img src={logoSrc} alt={APP_NAME} className='h-10 w-auto' />
      </Link>
      <Typography variant='h3' className='mt-4'>
        {title}
      </Typography>
      <p className='mb-5 mt-3 text-muted-foreground'>{description}</p>
    </>
  )
}
