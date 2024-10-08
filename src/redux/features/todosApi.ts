import { type SingleTodoFormValues } from '~/components/pages/features/todo/CreateSingleTodoForm'
import { type TodoWithAIFormValues } from '~/components/pages/features/todo/CreateTodoWithAIModal'
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
    createTodoForADaywithAI: build.mutation<Response<WithId<Todo>>, TodoWithAIFormValues>({
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
    updateTodo: build.mutation<Response<WithId<Todo>>, { id: number; body: Partial<Todo> }>({
      query: ({ id, body }) => ({
        url: `${rootApi}/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['todos', 'todo']
    }),
    deleteTodo: build.mutation<void, number>({
      query: id => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['todos']
    }),
    clearMyDaysTodo: build.mutation<void, string>({
      query: date => ({
        url: `${rootApi}/delete-the-day`,
        method: 'DELETE',
        params: {
          date
        }
      }),
      invalidatesTags: ['todos']
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
