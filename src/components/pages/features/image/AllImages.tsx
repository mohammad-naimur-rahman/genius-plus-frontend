'use client'

import { useState } from 'react'
import CardGrid from '~/components/reusable/cards/commonn/card-grid'
import ImageCard from '~/components/reusable/cards/ImageCard'
import Search from '~/components/reusable/tables/search'
import TablePagination from '~/components/reusable/tables/table-pagination'
import Typography from '~/components/ui/typography'
import { initParams } from '~/constants/form/init-params'
import { useGetAllImagesQuery } from '~/redux/features/imagesApi'
import { type Params } from '~/types/common/Params'

export default function AllImages() {
  const [params, setparams] = useState<Params>(initParams({}))
  const { data, isSuccess } = useGetAllImagesQuery(params)

  console.log(params)
  return (
    <div>
      <Typography variant='h4' className='mb-6 font-light'>
        All generated Images
      </Typography>

      <Search params={params} setparams={setparams} placeholder='Search for images...' />

      {isSuccess && (
        <CardGrid className='mt-6'>
          {data.data.map(img => (
            <ImageCard key={img.id} img={img} />
          ))}
        </CardGrid>
      )}

      <TablePagination params={params} setparams={setparams} meta={data?.meta} />
    </div>
  )
}
