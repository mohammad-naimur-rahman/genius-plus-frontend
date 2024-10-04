export interface TalkingBuddyThread {
  name: string
  thread_id: string
  user_id: string
  createdAt: string
}

export interface TalkingBuddyMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}
