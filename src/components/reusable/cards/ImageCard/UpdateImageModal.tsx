'use client'

import { PencilLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '~/components/ui/button'
import { useUpdateImagesMutation } from '~/redux/features/imagesApi'
import { type WithId } from '~/types/common/Response'
import { type ImageInterface } from '~/types/ImageInterface'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import { isObjEmpty } from '~/utils/misc/isEmpty'
import DrawerDialog from '../../common/DrawerDialog'
import Form from '../../form/form'
import { Input } from '../../form/input'

interface Props {
  img: WithId<ImageInterface>
}

export default function UpdateImageModal({ img }: Props) {
  const [open, setopen] = useState<boolean>(false)

  const methods = useForm<Partial<ImageInterface>>()
  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = methods

  useEffect(() => {
    reset(img)
  }, [reset, img])

  const [updateImg, { isLoading, isSuccess, isError, error }] = useUpdateImagesMutation()

  const onSubmit = (data: Partial<ImageInterface>) => {
    if (isObjEmpty(errors)) {
      reset()
      setopen(false)
    }

    setopen(false)
    void updateImg({ id: img.id, body: data })
  }

  useEffect(() => {
    if (isSuccess) toast.success('Image updated successfully')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  return (
    <>
      <Button variant='secondary' onClick={() => setopen(true)}>
        <PencilLine className='size-[18px]' />
      </Button>
      <DrawerDialog open={open} setopen={setopen} title='Update Image'>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Input name='title' label='Title' required placeholder='Give your image a title' />
          <Button type='submit' isLoading={isLoading} icon={<PencilLine />}>
            Update Image
          </Button>
        </Form>
      </DrawerDialog>
    </>
  )
}
