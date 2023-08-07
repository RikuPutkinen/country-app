import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Navbar from './components/navbar'
import Footer from './components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Country App'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-gray-950 dark:text-gray-50 bg-white text-gray-950 flex flex-col min-h-screen`}>
        <Providers>
          <Navbar />
          <main className='flex flex-1 mb-4'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
