'use client';

import type { Metadata } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/common/Button';

type FormData = {
  name: string;
  furigana: string;
  email: string;
  phone: string;
  category: string;
  message: string;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

type FormStep = 'input' | 'confirm' | 'complete';

export default function ContactPage() {
  const [step, setStep] = useState<FormStep>('input');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    furigana: '',
    email: '',
    phone: '',
    category: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 名前（必須）
    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }

    // メールアドレス（必須、形式チェック）
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }

    // お問い合わせ種別（必須）
    if (!formData.category) {
      newErrors.category = 'お問い合わせ種別を選択してください';
    }

    // お問い合わせ内容（必須）
    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容を入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep('confirm');
    }
  };

  const handleConfirm = async () => {
    try {
      // API Routeにデータを送信（メール送信なし、データ受信のみ）
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep('complete');
      } else {
        alert('送信に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    }
  };

  const handleBack = () => {
    setStep('input');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      furigana: '',
      email: '',
      phone: '',
      category: '',
      message: '',
    });
    setErrors({});
    setStep('input');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop"
            alt="お問い合わせ"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[--color-primary]/20 to-transparent"></div>

        <div className="container-custom text-center relative z-10">
          <p className="text-xs md:text-sm font-bold mb-3 text-white/90 tracking-widest uppercase">
            Contact
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            お問い合わせ
          </h1>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom mx-auto max-w-4xl">
          {step === 'input' && (
            <>
              <p className="text-center text-base text-[--text-secondary] mb-12">
                下記フォームよりお問い合わせください。お電話でのお問い合わせもお受けしております。
              </p>

              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 mb-12">
                {/* お名前 */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-bold text-[--text-primary] mb-2">
                    お名前 <span className="text-[--color-primary]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:border-[--color-primary]`}
                    placeholder="山田 太郎"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* フリガナ */}
                <div className="mb-6">
                  <label htmlFor="furigana" className="block text-sm font-bold text-[--text-primary] mb-2">
                    フリガナ
                  </label>
                  <input
                    type="text"
                    id="furigana"
                    name="furigana"
                    value={formData.furigana}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[--color-primary]"
                    placeholder="ヤマダ タロウ"
                  />
                </div>

                {/* メールアドレス */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-bold text-[--text-primary] mb-2">
                    メールアドレス <span className="text-[--color-primary]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:border-[--color-primary]`}
                    placeholder="example@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* 電話番号 */}
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-bold text-[--text-primary] mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[--color-primary]"
                    placeholder="090-1234-5678"
                  />
                </div>

                {/* お問い合わせ種別 */}
                <div className="mb-6">
                  <label htmlFor="category" className="block text-sm font-bold text-[--text-primary] mb-2">
                    お問い合わせ種別 <span className="text-[--color-primary]">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:border-[--color-primary] cursor-pointer`}
                  >
                    <option value="">選択してください</option>
                    <option value="修理依頼">修理依頼</option>
                    <option value="中古車購入">中古車購入</option>
                    <option value="カスタム相談">カスタム相談</option>
                    <option value="買取査定">買取査定</option>
                    <option value="その他">その他</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>

                {/* お問い合わせ内容 */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-bold text-[--text-primary] mb-2">
                    お問い合わせ内容 <span className="text-[--color-primary]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:border-[--color-primary]`}
                    placeholder="お問い合わせ内容をご記入ください"
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                {/* 送信ボタン */}
                <div className="text-center">
                  <Button type="submit" variant="primary" size="lg">
                    確認画面へ
                  </Button>
                </div>
              </form>
            </>
          )}

          {step === 'confirm' && (
            <>
              <h2 className="text-2xl font-bold text-[--text-primary] mb-8 text-center">
                入力内容の確認
              </h2>
              <div className="bg-white border border-gray-200 p-8 mb-8">
                <dl className="space-y-6">
                  <div>
                    <dt className="text-sm font-bold text-[--color-primary] mb-2">お名前</dt>
                    <dd className="text-[--text-primary]">{formData.name}</dd>
                  </div>
                  {formData.furigana && (
                    <div>
                      <dt className="text-sm font-bold text-[--color-primary] mb-2">フリガナ</dt>
                      <dd className="text-[--text-primary]">{formData.furigana}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-bold text-[--color-primary] mb-2">メールアドレス</dt>
                    <dd className="text-[--text-primary]">{formData.email}</dd>
                  </div>
                  {formData.phone && (
                    <div>
                      <dt className="text-sm font-bold text-[--color-primary] mb-2">電話番号</dt>
                      <dd className="text-[--text-primary]">{formData.phone}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-bold text-[--color-primary] mb-2">お問い合わせ種別</dt>
                    <dd className="text-[--text-primary]">{formData.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-bold text-[--color-primary] mb-2">お問い合わせ内容</dt>
                    <dd className="text-[--text-primary] whitespace-pre-wrap">{formData.message}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleBack} variant="outline" size="lg">
                  戻る
                </Button>
                <Button onClick={handleConfirm} variant="primary" size="lg">
                  送信する
                </Button>
              </div>
            </>
          )}

          {step === 'complete' && (
            <>
              <div className="text-center mb-12">
                <div className="text-6xl mb-6">✓</div>
                <h2 className="text-2xl md:text-3xl font-bold text-[--text-primary] mb-4">
                  送信完了
                </h2>
                <p className="text-base text-[--text-secondary] mb-8">
                  お問い合わせありがとうございました。<br />
                  内容を確認の上、2営業日以内にご連絡いたします。
                </p>
                <Button href="/" variant="primary" size="lg">
                  トップページへ戻る
                </Button>
              </div>

              <div className="bg-[--color-accent] p-8">
                <h3 className="text-lg font-bold text-[--text-primary] mb-4 text-center">
                  お急ぎの方は
                </h3>
                <div className="text-center">
                  <p className="text-sm text-[--text-secondary] mb-2">お電話でのお問い合わせ</p>
                  <p className="text-2xl font-bold text-[--color-primary]">000-0000-0000</p>
                  <p className="text-sm text-[--text-secondary] mt-2">
                    受付時間: 9:00 - 18:00<br />
                    定休日: 水曜日、第2・第4日曜日
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Contact Methods - 入力画面のみ表示 */}
          {step === 'input' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-[--color-accent] p-8 text-center">
                  <div className="text-4xl mb-4">📞</div>
                  <h3 className="text-lg font-bold text-[--text-primary] mb-3">お電話でのお問い合わせ</h3>
                  <p className="text-2xl font-bold text-[--color-primary] mb-2">000-0000-0000</p>
                  <p className="text-sm text-[--text-secondary] mb-4">
                    受付時間: 9:00 - 18:00<br />
                    定休日: 水曜日、第2・第4日曜日
                  </p>
                  <p className="text-xs text-[--text-secondary]">
                    お急ぎの方はお電話が確実です
                  </p>
                </div>

                <div className="bg-[--color-accent] p-8 text-center">
                  <div className="text-4xl mb-4">✉️</div>
                  <h3 className="text-lg font-bold text-[--text-primary] mb-3">メールでのお問い合わせ</h3>
                  <p className="text-xl font-bold text-[--color-primary] mb-2">info@naoki-bike.com</p>
                  <p className="text-sm text-[--text-secondary] mb-4">
                    24時間受付<br />
                    （返信は営業時間内）
                  </p>
                  <p className="text-xs text-[--text-secondary]">
                    2営業日以内にご返信いたします
                  </p>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-[--color-accent] p-8">
                <h3 className="text-xl font-bold text-[--text-primary] mb-6 text-center">よくあるお問い合わせ</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-bold text-[--text-primary] mb-2">Q. 見積もりは無料ですか?</h4>
                    <p className="text-sm text-[--text-secondary]">
                      A. はい、お見積もりは無料です。お気軽にご相談ください。
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[--text-primary] mb-2">Q. 予約は必要ですか?</h4>
                    <p className="text-sm text-[--text-secondary]">
                      A. 車検や大規模な整備の場合は事前にご予約をお願いします。一般整備は当日でも対応可能な場合がありますので、お電話でご確認ください。
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[--text-primary] mb-2">Q. 他店で購入したバイクでも整備してもらえますか?</h4>
                    <p className="text-sm text-[--text-secondary]">
                      A. もちろん可能です。どこで購入されたバイクでも整備・修理を承ります。
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[--text-primary] mb-2">Q. 持ち込みパーツの取り付けは可能ですか?</h4>
                    <p className="text-sm text-[--text-secondary]">
                      A. はい、対応可能です。ネットで購入されたパーツの取り付けもお任せください。ただし、パーツの不良や適合性については責任を負いかねますのでご了承ください。
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[--text-primary] mb-2">Q. ローンは使えますか?</h4>
                    <p className="text-sm text-[--text-secondary]">
                      A. 中古車販売の際はオートローンをご利用いただけます。詳しくはお問い合わせください。
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
