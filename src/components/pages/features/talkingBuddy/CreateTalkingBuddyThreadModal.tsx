'use client'

import { CirclePlay } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import DrawerDialog from '~/components/reusable/common/DrawerDialog'
import Form from '~/components/reusable/form/form'
import { Input } from '~/components/reusable/form/input'
import { Button } from '~/components/ui/button'
import usePush from '~/hooks/usePush'
import { useCreateTalkingBuddyThreadMutation } from '~/redux/features/talkingBuddyApi'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import { isObjEmpty } from '~/utils/misc/isEmpty'

export interface CreateTalkingBuddyThreadFormValues {
  name: string
}

export default function CreateTalkingBuddyThreadModal() {
  const push = usePush()
  const [open, setopen] = useState<boolean>(false)
  const methods = useForm<CreateTalkingBuddyThreadFormValues>()

  const [createThread, { isLoading, isError, error, isSuccess, data }] = useCreateTalkingBuddyThreadMutation()
  const {
    handleSubmit,
    formState: { errors }
  } = methods
  const onSubmit = (data: CreateTalkingBuddyThreadFormValues) => {
    if (isObjEmpty(errors)) {
      toast.loading('Creating thread...')
      setopen(false)
      void createThread(data)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss()
      toast.success('New conversation created successfully!')
      push(`/features/talking-buddy/${data?.data?.id}`)
    }

    if (isError) {
      toast.dismiss()
      toast.error(rtkErrorMessage(error))
    }
  }, [isSuccess, isError, error, data, push])

  return (
    <>
      <Button icon={<CirclePlay />} iconPosition='right' onClick={() => setopen(true)}>
        Start new session
      </Button>
      <DrawerDialog
        open={open}
        setopen={setopen}
        title='Create a new conversation'
        description='Name a topic you want to start talking with and create a new conversation'
      >
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Input name='name' label='Name' placeholder='Topic Name' required />
          <Button type='submit' icon={<CirclePlay />} iconPosition='right' isLoading={isLoading}>
            Start new session
          </Button>
        </Form>
      </DrawerDialog>
    </>
  )
}
