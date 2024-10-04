import { type CreateTalkingBuddyThreadFormValues } from '~/components/pages/features/talkingBuddy/CreateTalkingBuddyThreadModal'
import { type Response, type WithId } from '~/types/common/Response'
import { type TalkingBuddyThread } from '~/types/TalkingBuddy'
import api from '../api'

const rootAPi = '/talkingBuddies'

const talkingBuddyApi = api.injectEndpoints({
  endpoints: build => ({
    createTalkingBuddyThread: build.mutation<Response<WithId<TalkingBuddyThread>>, CreateTalkingBuddyThreadFormValues>({
      query: body => ({
        url: rootAPi,
        method: 'POST',
        body
      }),
      invalidatesTags: ['tbThreads', 'tbThread']
    }),
    getTalkingBuddyThreads: build.query<Response<WithId<TalkingBuddyThread>[]>, void>({
      query: () => ({
        url: rootAPi
      }),
      providesTags: ['tbThreads']
    })
  })
})

export const { useGetTalkingBuddyThreadsQuery, useCreateTalkingBuddyThreadMutation } = talkingBuddyApi
