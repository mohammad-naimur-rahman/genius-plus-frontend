import { type Response, type WithId } from '~/types/common/Response'
import { type TalkingBuddyThread } from '~/types/TalkingBuddy'
import api from '../api'

const rootAPi = '/talkingBuddies'

const talkingBuddyApi = api.injectEndpoints({
  endpoints: build => ({
    getTalkingBuddyThreads: build.query<Response<WithId<TalkingBuddyThread>[]>, void>({
      query: () => ({
        url: rootAPi
      })
    })
  })
})

export const { useGetTalkingBuddyThreadsQuery } = talkingBuddyApi
