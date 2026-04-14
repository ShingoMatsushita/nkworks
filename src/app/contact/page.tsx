import ContactForm from '@/components/sections/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'お問合せ | 直樹バイク',
  description: 'バイクの修理・メンテナンス・カスタム・中古車販売に関するお問合せはこちらから。',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <p className="text-red-600 font-en font-semibold text-sm tracking-[0.3em] uppercase mb-3">Contact</p>
          <h1 className="text-gray-900 text-3xl md:text-4xl font-black mb-4">お問合せ</h1>
          <p className="text-gray-500 leading-relaxed">
            ご質問・ご依頼はこちらのフォームからどうぞ。<br />
            3営業日以内にご連絡いたします。
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
