'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={roboto.className}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}