import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Tomorrow - Plan tonight, execute tomorrow',
  description: 'Transform your productivity with science-backed evening planning. Wake up with clear priorities and focused momentum.',
  keywords: 'productivity, planning, time management, evening routine, morning routine, task management',
  authors: [{ name: 'Tomorrow App' }],
  openGraph: {
    title: 'Tomorrow - Plan tonight, execute tomorrow',
    description: 'Transform your productivity with science-backed evening planning.',
    url: 'https://tomorrow.app',
    siteName: 'Tomorrow',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tomorrow - Plan tonight, execute tomorrow',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomorrow - Plan tonight, execute tomorrow',
    description: 'Transform your productivity with science-backed evening planning.',
    images: ['/twitter-image.jpg'],
    creator: '@tomorrowapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}