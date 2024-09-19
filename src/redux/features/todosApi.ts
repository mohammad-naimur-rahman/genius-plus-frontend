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
      })
    })
  })
})

export const { useCreateTodoMutation } = todosApi
