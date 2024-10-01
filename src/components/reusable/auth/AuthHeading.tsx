import Logo from '~/components/common/Logo'
import Typography from '~/components/ui/typography'

interface Props {
  title: string
  description: string
}

export default function AuthHeading({ title, description }: Props) {
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
