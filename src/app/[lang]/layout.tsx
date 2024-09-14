import '~/styles/globals.scss'

import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import ReduxProvider from '~/lib/redux/redux-provider'
import { ThemeProvider } from '~/lib/theme/ThemeProvider'
import { cn } from '~/lib/utils'

export const metadata: Metadata = {
  title: 'Genius+',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning className={GeistSans.variable}>
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
