import { type Response, type WithId } from '~/types/common/Response'
import { type TodoTemplate } from '~/types/TodoTemplate'
import api from '../api'

const rootApi = '/todo-templates'

const todoTemplatesApi = api.injectEndpoints({
  endpoints: build => ({
    createTodoTemplate: build.mutation<Response<WithId<TodoTemplate>>, TodoTemplate>({
      query: body => ({
        url: rootApi,
        method: 'POST',
        body
      }),
      invalidatesTags: ['todoTemplates', 'todo']
    }),
    getAllTodoTemplatess: build.query<Response<WithId<TodoTemplate>[]>, void>({
      query: () => ({
        url: rootApi
      }),
      providesTags: ['todoTemplates']
    }),
    updateTodoTemplate: build.mutation<Response<WithId<TodoTemplate>>, { id: number; body: Partial<TodoTemplate> }>({
      query: ({ id, body }) => ({
        url: `${rootApi}/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['todoTemplates', 'todo']
    }),
    deleteTodoTemplate: build.mutation<void, number>({
      query: id => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['todoTemplates']
    })
  })
})

export const {
  useCreateTodoTemplateMutation,
  useGetAllTodoTemplatessQuery,
  useUpdateTodoTemplateMutation,
  useDeleteTodoTemplateMutation
} = todoTemplatesApi
