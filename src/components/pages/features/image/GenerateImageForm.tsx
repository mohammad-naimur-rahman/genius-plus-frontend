'use client'

import { Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Checkbox } from '~/components/reusable/form/checkbox'
import Form from '~/components/reusable/form/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/reusable/form/select'
import { Textarea } from '~/components/reusable/form/textarea'
import { Button } from '~/components/ui/button'
import Typography from '~/components/ui/typography'
import { useGenerateImageMutation } from '~/redux/features/imagesApi'
import { type ImageGenParams } from '~/types/ImageInterface'
import { formatValue } from '~/utils/misc/formatValue'
import { imageAspects, imageStyles, imgGenOptions } from './image.constants'

export interface GenerateImageFormData {
  title: string
  prompt: string
  full_control: boolean
  aspect: 'square' | 'portrait' | 'landscape'
  promptParams: ImageGenParams
  style: 'natural' | 'vivid'
}

export default function GenerateImageForm() {
  const methods = useForm<GenerateImageFormData>()
  const { handleSubmit, watch } = methods

  const [generateImage, { isLoading, isSuccess, isError, error }] = useGenerateImageMutation()

  const onSubmit = (data: GenerateImageFormData) => {
    console.log(data)
  }

  return (
    <div>
      <Typography variant='h4' className='mb-6 font-light'>
        Generate Image with AI, use it for your next project, presentation or any other purpose.
      </Typography>

      <Form methods={methods} onSubmit={handleSubmit(onSubmit)} className='mt-6'>
        <Checkbox label='Take full control' name='full_control' containerClassName='mb-4' />
        <div className='mb-2 flex gap-x-5 gap-y-3'>
          <Textarea
            name='prompt'
            placeholder='Write down your prompt for image generation...'
            label='Prompt'
            required
            rows={5}
            containerClassName='w-full'
          />
          <div className='w-80'>
            <Select name='size' label='Size' required>
              <SelectTrigger>
                <SelectValue placeholder='Select a size' />
              </SelectTrigger>
              <SelectContent>
                {imageAspects.map((val: string) => (
                  <SelectItem key={val} value={val}>
                    {formatValue(val)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select name='style' label='Image Style' required>
              <SelectTrigger>
                <SelectValue placeholder='Select a style' />
              </SelectTrigger>
              <SelectContent>
                {imageStyles.map((val: string) => (
                  <SelectItem key={val} value={val}>
                    {formatValue(val)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {!watch('full_control') && (
          <div className='grid grid-cols-5 gap-x-5 gap-y-3'>
            {(Object.keys(imgGenOptions) as Array<keyof typeof imgGenOptions>).map(optionKey => (
              <Select name={`promptParams.${optionKey}`} label={formatValue(optionKey)} key={optionKey}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${formatValue(optionKey)}`} />
                </SelectTrigger>
                <SelectContent>
                  {imgGenOptions[optionKey].map((val: string) => (
                    <SelectItem key={val} value={val}>
                      {formatValue(val)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        )}

        <Button type='submit' isLoading={isLoading} icon={<Sparkles />}>
          Generate Image
        </Button>
      </Form>
    </div>
  )
}
