import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import ReduxProvider from '~/lib/redux/redux-provider'
import { ThemeProvider } from '~/lib/theme/ThemeProvider'
import { cn } from '~/lib/utils'
import '~/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Genius+',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning className={inter.className}>
      <ReduxProvider>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <body className={cn('min-h-screen font-sans antialiased')}>
            <Toaster position='top-center' />
            <main>{children}</main>
            <div id='modal-container' />
          </body>
        </ThemeProvider>
      </ReduxProvider>
    </html>
  )
}
