import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Josh Negreanu',
  icons: { icon: '/images/logo.ico' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
