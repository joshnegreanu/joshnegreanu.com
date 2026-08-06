import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JoshGPT',
  icons: { icon: '/images/favicon.ico' },
}

export default function ChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
