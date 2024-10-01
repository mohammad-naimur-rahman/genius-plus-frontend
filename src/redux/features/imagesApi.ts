import { type GenerateImageFormData } from '~/components/pages/features/image/GenerateImageForm'
import { type Params } from '~/types/common/Params'
import { type Response, type ResponseWithMeta, type WithId } from '~/types/common/Response'
import { type ImageInterface } from '~/types/ImageInterface'
import api from '../api'

const rootApi = '/images'

const imagesApi = api.injectEndpoints({
  endpoints: build => ({
    generateImage: build.mutation<Response<WithId<ImageInterface>>, GenerateImageFormData>({
      query: body => ({
        url: rootApi,
        method: 'POST',
        body
      }),
      invalidatesTags: ['images', 'image']
    }),
    getAllImages: build.query<ResponseWithMeta<WithId<ImageInterface>[]>, Params>({
      query: params => ({
        url: rootApi,
        params
      }),
      providesTags: ['images']
    }),
    updateImages: build.mutation<Response<WithId<ImageInterface>>, { id: number; body: Partial<ImageInterface> }>({
      query: ({ id, body }) => ({
        url: `${rootApi}/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['images', 'image']
    }),
    deleteImages: build.mutation<void, number>({
      query: id => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['images']
    })
  })
})

export const { useGenerateImageMutation, useGetAllImagesQuery, useUpdateImagesMutation, useDeleteImagesMutation } =
  imagesApi
