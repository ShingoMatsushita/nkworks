'use client'

import { useState } from 'react'
import Link from 'next/link'

type Step = 'input' | 'confirm' | 'done'

interface FormData {
  name: string
  furigana: string
  email: string
  phone: string
  type: string
  message: string
  privacy: boolean
}

const initialData: FormData = {
  name: '',
  furigana: '',
  email: '',
  phone: '',
  type: '',
  message: '',
  privacy: false,
}

export default function ContactForm() {
  const [step, setStep] = useState<Step>('input')
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!data.name.trim()) newErrors.name = 'お名前を入力してください'
    if (!data.furigana.trim()) newErrors.furigana = 'フリガナを入力してください'
    else if (!/^[ァ-ヶー\s]+$/.test(data.furigana)) newErrors.furigana = 'カタカナで入力してください'
    if (!data.email.trim()) newErrors.email = 'メールアドレスを入力してください'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = '正しいメールアドレスを入力してください'
    if (data.phone && !/^[\d\-+\s()]+$/.test(data.phone)) newErrors.phone = '正しい電話番号を入力してください'
    if (!data.type) newErrors.type = '問合せ種別を選択してください'
    if (!data.message.trim()) newErrors.message = 'お問合せ内容を入力してください'
    if (!data.privacy) newErrors.privacy = 'プライバシーポリシーへの同意が必要です' as unknown as boolean
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    setLoading(true)
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStep('done')
    } catch {
      setServerError('送信に失敗しました。時間をおいて再度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'done') {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-black text-gray-900 mb-3">送信が完了しました</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          お問合せありがとうございます。<br />
          3営業日以内にご連絡いたします。<br />
          自動返信メールをご確認ください。
        </p>
        <Link href="/" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl transition-colors">
          ホームへ戻る
        </Link>
      </div>
    )
  }

  if (step === 'confirm') {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="font-black text-xl text-gray-900 mb-6">入力内容の確認</h2>
        <dl className="space-y-4 mb-8">
          {[
            { label: 'お名前', value: data.name },
            { label: 'フリガナ', value: data.furigana },
            { label: 'メールアドレス', value: data.email },
            { label: '電話番号', value: data.phone || '未記入' },
            { label: '問合せ種別', value: data.type },
            { label: 'お問合せ内容', value: data.message },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
              <dt className="text-sm font-bold text-gray-500 w-32 flex-shrink-0 pt-0.5">{item.label}</dt>
              <dd className="text-sm text-gray-900 whitespace-pre-wrap">{item.value}</dd>
            </div>
          ))}
        </dl>

        {serverError && (
          <p className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-lg">{serverError}</p>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => setStep('input')}
            className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 rounded-xl transition-colors"
          >
            修正する
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3 rounded-xl transition-colors"
          >
            {loading ? '送信中...' : 'この内容で送信する'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      className="bg-white rounded-2xl p-8 shadow-sm space-y-6"
      onSubmit={(e) => { e.preventDefault(); if (validate()) setStep('confirm') }}
      noValidate
    >
      {/* お名前 */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">
          お名前 <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="山田 太郎"
          className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 transition ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* フリガナ */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">
          フリガナ <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={data.furigana}
          onChange={(e) => setData({ ...data, furigana: e.target.value })}
          placeholder="ヤマダ タロウ"
          className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 transition ${errors.furigana ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.furigana && <p className="text-red-600 text-xs mt-1">{errors.furigana}</p>}
      </div>

      {/* メール */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">
          メールアドレス <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="example@mail.com"
          className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 transition ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* 電話番号 */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">
          電話番号 <span className="text-gray-400 font-normal text-xs">（任意）</span>
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          placeholder="000-0000-0000"
          className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 transition ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* 問合せ種別 */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">
          問合せ種別 <span className="text-red-600">*</span>
        </label>
        <select
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 transition bg-white ${errors.type ? 'border-red-500' : 'border-gray-200'}`}
        >
          <option value="">選択してください</option>
          <option value="修理・メンテナンス">修理・メンテナンス</option>
          <option value="カスタム・チューニング">カスタム・チューニング</option>
          <option value="中古車・買取">中古車・買取</option>
        </select>
        {errors.type && <p className="text-red-600 text-xs mt-1">{errors.type}</p>}
      </div>

      {/* お問合せ内容 */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">
          お問合せ内容 <span className="text-red-600">*</span>
        </label>
        <textarea
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          placeholder="お気軽にご相談ください"
          rows={5}
          maxLength={1000}
          className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 transition resize-none ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
        />
        <div className="flex justify-between mt-1">
          {errors.message ? <p className="text-red-600 text-xs">{errors.message}</p> : <span />}
          <p className="text-gray-400 text-xs">{data.message.length}/1000</p>
        </div>
      </div>

      {/* プライバシーポリシー */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.privacy}
            onChange={(e) => setData({ ...data, privacy: e.target.checked })}
            className="mt-0.5 w-4 h-4 accent-red-600"
          />
          <span className="text-sm text-gray-700">
            <span className="text-red-600 underline cursor-pointer">プライバシーポリシー</span>に同意する
            <span className="text-red-600"> *</span>
          </span>
        </label>
        {errors.privacy && <p className="text-red-600 text-xs mt-1">{String(errors.privacy)}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors text-lg"
      >
        確認画面へ
      </button>
    </form>
  )
}
