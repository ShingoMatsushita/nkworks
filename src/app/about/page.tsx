import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactCTA } from '@/components/common/ContactCTA';

export const metadata: Metadata = {
  title: '会社案内',
  description: '直樹バイクの会社概要、店舗情報、アクセスのご案内です。',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop"
            alt="バイクショップ"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Red Accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-[--color-primary]/20 to-transparent"></div>

        <div className="container-custom text-center relative z-10">
          <p className="text-xs md:text-sm font-bold mb-3 text-white/90 tracking-widest uppercase">
            About Us
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            会社案内
          </h1>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-xs md:text-sm font-bold mb-3 text-[--text-secondary] tracking-widest uppercase">
                Company Info
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-[--text-primary]">
                会社概要
              </h3>
            </div>

            {/* Shop Image */}
            <div className="mb-12 overflow-hidden rounded-lg shadow-lg relative h-64 md:h-96">
              <Image
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop"
                alt="直樹バイク店舗外観"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-[--color-primary] mb-2">店舗名</h3>
                  <p className="text-[--text-primary] text-base">直樹バイク</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[--color-primary] mb-2">代表者</h3>
                  <p className="text-[--text-primary] text-base">代表取締役 直樹</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[--color-primary] mb-2">設立</h3>
                  <p className="text-[--text-primary] text-base">2010年4月</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[--color-primary] mb-2">従業員数</h3>
                  <p className="text-[--text-primary] text-base">8名（整備士5名、営業3名）</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[--color-primary] mb-2">事業内容</h3>
                  <ul className="text-[--text-secondary] text-sm space-y-1">
                    <li>• バイク修理・整備（国産車・輸入車対応）</li>
                    <li>• カスタム・チューニング</li>
                    <li>• 中古バイク販売（厳選車両のみ取扱）</li>
                    <li>• バイク買取・下取り</li>
                    <li>• 車検代行サービス</li>
                    <li>• パーツ販売・取り付け</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-[--color-primary] mb-2">営業時間</h3>
                  <p className="text-[--text-primary] text-base">9:00 - 18:00</p>
                  <p className="text-[--text-secondary] text-sm mt-1">※作業中のお預かりは17:00まで</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[--color-primary] mb-2">定休日</h3>
                  <p className="text-[--text-primary] text-base">水曜日、第2・第4日曜日</p>
                  <p className="text-[--text-secondary] text-sm mt-1">※祝日は営業しております</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[--color-primary] mb-2">電話番号</h3>
                  <p className="text-[--text-primary] text-base font-bold">000-0000-0000</p>
                  <p className="text-[--text-secondary] text-sm mt-1">お急ぎの方はお電話でお問い合わせください</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[--color-primary] mb-2">FAX</h3>
                  <p className="text-[--text-primary] text-base">000-0000-0001</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[--color-primary] mb-2">メール</h3>
                  <p className="text-[--text-primary] text-sm">info@naoki-bike.com</p>
                  <p className="text-[--text-secondary] text-sm mt-1">24時間受付（返信は営業時間内）</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[--color-primary] mb-2">駐車場</h3>
                  <p className="text-[--text-primary] text-base">店舗前5台、バイク駐輪スペース15台</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 bg-[--color-accent]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-xs md:text-sm font-bold mb-3 text-[--text-secondary] tracking-widest uppercase">
                Our Mission
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-[--text-primary]">
                私たちの想い
              </h3>
            </div>

            <div className="bg-white p-8 md:p-10 shadow-md mb-8">
              <p className="text-base text-[--text-secondary] leading-relaxed mb-4">
                直樹バイクは、お客様のバイクライフを全力でサポートすることを使命としています。
              </p>
              <p className="text-base text-[--text-secondary] leading-relaxed mb-4">
                確かな技術と丁寧なサービスで、お客様に安心してバイクに乗っていただけるよう心がけています。
                一台一台のバイクに真摯に向き合い、最高の状態でお返しすることをお約束します。
              </p>
              <p className="text-base text-[--text-secondary] leading-relaxed mb-4">
                創業以来15年以上、地域のライダーの皆様に愛されるショップとして、数多くのバイクを整備・カスタムしてまいりました。
                国家資格を持つ整備士が在籍し、国産車から輸入車まで幅広く対応しております。
              </p>
              <p className="text-base text-[--text-secondary] leading-relaxed">
                バイクのことなら何でもお気軽にご相談ください。あなたの愛車を、私たちに任せてください。
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 text-center">
                <div className="text-4xl mb-3">🔧</div>
                <h4 className="text-base font-bold mb-2 text-[--text-primary]">確かな技術力</h4>
                <p className="text-sm text-[--text-secondary]">国家資格整備士が在籍。豊富な経験と最新技術で対応します。</p>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="text-4xl mb-3">💰</div>
                <h4 className="text-base font-bold mb-2 text-[--text-primary]">明朗会計</h4>
                <p className="text-sm text-[--text-secondary]">作業前に必ず見積もりを提示。安心の料金体系です。</p>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="text-base font-bold mb-2 text-[--text-primary]">スピード対応</h4>
                <p className="text-sm text-[--text-secondary]">緊急修理にも対応。できる限り早く愛車をお返しします。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-xs md:text-sm font-bold mb-3 text-[--text-secondary] tracking-widest uppercase">
                Access
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-[--text-primary]">
                アクセス
              </h3>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-[--color-primary] mb-3">所在地</h3>
                <p className="text-[--text-primary] text-base mb-6">
                  〒000-0000<br />
                  ○○県○○市○○町0-0-0
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[--color-primary] mb-3">交通アクセス</h3>
                <ul className="text-[--text-secondary] text-sm space-y-1">
                  <li>• ○○駅から徒歩10分</li>
                  <li>• ○○バス停から徒歩3分</li>
                  <li>• 駐車場完備（5台）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
