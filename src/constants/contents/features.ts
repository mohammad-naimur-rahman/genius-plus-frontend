import { type StaticImageData } from 'next/image'
import aiTutor from '~/assets/images/pages/features/ai-assistant.png'
import aiImage from '~/assets/images/pages/features/ai-image.png'
import aiVoice from '~/assets/images/pages/features/ai-voice-generator.png'
import chatbot from '~/assets/images/pages/features/chatbot.png'
import notes from '~/assets/images/pages/features/notes.png'
import taskBuilder from '~/assets/images/pages/features/task-builder.png'
import textToImage from '~/assets/images/pages/features/text-to-image.png'
import todoImg from '~/assets/images/pages/features/todo.png'
import translate from '~/assets/images/pages/features/translate.png'
import ytSummerizer from '~/assets/images/pages/features/yt-summerizer.png'

export interface Feature {
  id: number
  title: string
  description: string
  href: string
  icon: StaticImageData | string
}

export const features = [
  {
    id: 1,
    title: 'AI Todo Builder',
    description: 'Enjoy a productive day with AI Todo Builder.',
    href: '/features/todo',
    icon: todoImg
  },
  {
    id: 2,
    title: 'AI Image Generator',
    description: 'Generate images with AI and use in your projects.',
    href: '/features/image',
    icon: aiImage
  },
  {
    id: 3,
    title: 'AI Talking Buddy',
    description: 'Practice english with AI and get feedback.',
    href: '/features/talking-buddy',
    icon: aiVoice
  },
  {
    id: 4,
    title: 'AI Tutor',
    description: 'Coming soon...',
    href: '/features/tutor',
    icon: aiTutor
  },
  {
    id: 5,
    title: 'AI Notes',
    description: 'Coming soon...',
    href: '/features/notes',
    icon: notes
  },
  {
    id: 6,
    title: 'AI Task Builder',
    description: 'Coming soon...',
    href: '/features/task-builder',
    icon: taskBuilder
  },
  {
    id: 7,
    title: 'AI Chatbot',
    description: 'Coming soon...',
    href: '/features/chatbot',
    icon: chatbot
  },
  {
    id: 8,
    title: 'Image to text',
    description: 'Coming soon...',
    href: '/features/text-to-image',
    icon: textToImage
  },
  {
    id: 9,
    title: 'AI Translate',
    description: 'Coming soon...',
    href: '/features/translate',
    icon: translate
  },
  {
    id: 10,
    title: 'AI YouTube Summerizer',
    description: 'Coming soon...',
    href: '/features/yt-summerizer',
    icon: ytSummerizer
  }
]
