import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Neuphorm',
  icons: { icon: '/images/neuphorm.ico' },
}

export default function NeuphormLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
