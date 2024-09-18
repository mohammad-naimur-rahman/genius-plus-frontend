import logo from '~/assets/logos/logo.png'
import { Img } from '~/components/ui/img'
import Link from '~/components/ui/llink'
import Typography from '~/components/ui/typography'
import { APP_NAME } from '~/configs'

interface Props {
  title: string
  description: string
}

export default function AuthHeading({ title, description }: Props) {
  return (
    <>
      <Link href='/'>
        <Img src={logo} alt={APP_NAME} className='h-10 w-auto' />
      </Link>
      <Typography variant='h3' className='mt-4'>
        {title}
      </Typography>
      <p className='mb-5 mt-3 text-muted-foreground'>{description}</p>
    </>
  )
}
