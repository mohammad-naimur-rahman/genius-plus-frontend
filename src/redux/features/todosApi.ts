import { type SingleTodoFormValues } from '~/components/pages/features/todo/CreateSingleTodoForm'
import { type Response, type WithId } from '~/types/common/Response'
import { type Todo } from '~/types/Todo'
import api from '../api'

const rootApi = '/todos'

const todosApi = api.injectEndpoints({
  endpoints: build => ({
    createTodo: build.mutation<Response<WithId<Todo>>, SingleTodoFormValues>({
      query: body => ({
        url: rootApi,
        method: 'POST',
        body
      }),
      invalidatesTags: ['todos', 'todo']
    }),
    createTodoForADaywithAI: build.mutation<Response<WithId<Todo>>, { text: string }>({
      query: body => ({
        url: `${rootApi}/create-with-ai`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['todos', 'todo']
    }),
    getAllTodos: build.query<Response<WithId<Todo>[]>, { date?: string }>({
      query: params => ({
        url: rootApi,
        params
      }),
      providesTags: ['todos']
    }),
    updateTodo: build.mutation<Response<WithId<Todo>>, { id: string; body: Partial<Todo> }>({
      query: ({ id, body }) => ({
        url: `${rootApi}/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['todos', 'todo']
    }),
    deleteTodo: build.mutation<void, string>({
      query: id => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['todos']
    }),
    clearMyDaysTodo: build.mutation<void, void>({
      query: () => ({
        url: `${rootApi}/delete-the-day`
      })
    })
  })
})

export const {
  useCreateTodoMutation,
  useGetAllTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useClearMyDaysTodoMutation,
  useCreateTodoForADaywithAIMutation
} = todosApi
