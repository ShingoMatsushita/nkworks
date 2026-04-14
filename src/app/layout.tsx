import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: '直樹バイク | バイク修理・中古車販売',
  description: '確かな技術で最高のバイクライフを。バイク修理・メンテナンス・カスタム・中古車販売は直樹バイクへ。',
  openGraph: {
    title: '直樹バイク | バイク修理・中古車販売',
    description: '確かな技術で最高のバイクライフを。バイク修理・メンテナンス・カスタム・中古車販売は直樹バイクへ。',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
