import Image from 'next/image';
import Script from 'next/script';
import { HeroSection } from '@/components/features/HeroSection';
import { ContactCTA } from '@/components/common/ContactCTA';

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    name: '直樹バイク',
    description: 'バイク修理・整備、中古車販売を行っています。確かな技術と丁寧なサービスで、お客様のバイクライフをサポートします。',
    url: 'https://naoki-bike.com',
    telephone: '000-0000-0000',
    email: 'info@naoki-bike.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '○○町0-0-0',
      addressLocality: '○○市',
      addressRegion: '○○県',
      postalCode: '000-0000',
      addressCountry: 'JP',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '¥¥',
    areaServed: {
      '@type': 'City',
      name: '○○市',
    },
  };

  const galleryItems = [
    {
      id: '1',
      title: 'CB400SF カスタムペイント',
      category: 'カスタム',
      description: 'お客様のご要望でキャンディレッドに全塗装。光沢のある美しい仕上がりになりました。',
      imageUrl: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'Ninja250 エンジン整備',
      category: '修理',
      description: 'エンジンオーバーホール。異音の原因を特定し、ピストンリング交換で完全復活。',
      imageUrl: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: '3',
      title: 'ハーレー・ダビッドソン ソフテイル 販売車両',
      category: '販売車両',
      description: '2019年式 走行12,000km。フルカスタム済み。程度良好な1台です。',
      imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: '4',
      title: 'PCX フルメンテナンス',
      category: '修理',
      description: '定期メンテナンス実施。オイル交換、タイヤ交換、ブレーキパッド交換など。',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: '5',
      title: 'YZF-R25 カスタムパーツ取付',
      category: 'カスタム',
      description: 'アクラポビッチマフラー、バックステップ、セパハン装着。スポーティーな仕上がりに。',
      imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: '6',
      title: 'GSX-R600 カスタムマフラー',
      category: 'カスタム',
      description: 'ヨシムラマフラー装着。サウンドも抜群で、見た目もスポーティーに。',
      imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection />

      {/* About Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xs md:text-sm font-bold mb-2 md:mb-3 text-[--text-secondary] tracking-widest uppercase">
              ABOUT US
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-[--text-primary]">
              直樹バイクについて
            </h3>
            <p className="text-sm md:text-base text-[--text-secondary] mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto px-2">
              創業15年以上、地域のライダーの皆様に愛されるショップです。<br className="hidden md:block" />
              <span className="md:hidden"> </span>国家資格を持つ整備士が在籍し、確かな技術と丁寧なサービスで、お客様のバイクライフを全力でサポートしています。
            </p>
          </div>

          {/* Features */}
          <div className="mb-6 md:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
              <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-[--color-primary]/20 p-4 md:p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:border-[--color-primary] group">
                <div className="bg-[--color-primary]/10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-[--color-primary]/20 transition-colors">
                  <div className="text-3xl md:text-4xl">🔧</div>
                </div>
                <h4 className="text-sm md:text-base font-bold mb-2 md:mb-3 text-[--text-primary]">確かな技術力</h4>
                <p className="text-xs md:text-sm text-[--text-secondary] leading-relaxed">国家資格整備士が在籍。豊富な経験と最新技術で対応します。</p>
              </div>
              <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-[--color-primary]/20 p-4 md:p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:border-[--color-primary] group">
                <div className="bg-[--color-primary]/10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-[--color-primary]/20 transition-colors">
                  <div className="text-3xl md:text-4xl">💰</div>
                </div>
                <h4 className="text-sm md:text-base font-bold mb-2 md:mb-3 text-[--text-primary]">明朗会計</h4>
                <p className="text-xs md:text-sm text-[--text-secondary] leading-relaxed">作業前に必ず見積もりを提示。安心の料金体系です。</p>
              </div>
              <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-[--color-primary]/20 p-4 md:p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:border-[--color-primary] group">
                <div className="bg-[--color-primary]/10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-[--color-primary]/20 transition-colors">
                  <div className="text-3xl md:text-4xl">⚡</div>
                </div>
                <h4 className="text-sm md:text-base font-bold mb-2 md:mb-3 text-[--text-primary]">スピード対応</h4>
                <p className="text-xs md:text-sm text-[--text-secondary] leading-relaxed">緊急修理にも対応。できる限り早く愛車をお返しします。</p>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-[--text-primary] text-center">会社概要</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white border-2 border-[--color-primary]/30 p-3 md:p-4 shadow-md hover:shadow-lg transition-all hover:border-[--color-primary]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🕐</span>
                  <h5 className="text-xs md:text-sm font-bold text-[--color-primary]">営業時間</h5>
                </div>
                <p className="text-sm md:text-base text-[--text-primary] font-bold">9:00 - 18:00</p>
              </div>
              <div className="bg-white border-2 border-[--color-primary]/30 p-3 md:p-4 shadow-md hover:shadow-lg transition-all hover:border-[--color-primary]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📅</span>
                  <h5 className="text-xs md:text-sm font-bold text-[--color-primary]">定休日</h5>
                </div>
                <p className="text-xs md:text-sm text-[--text-primary] leading-tight">水曜日<br/>第2・第4日曜日</p>
              </div>
              <div className="bg-white border-2 border-[--color-primary]/30 p-3 md:p-4 shadow-md hover:shadow-lg transition-all hover:border-[--color-primary]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📞</span>
                  <h5 className="text-xs md:text-sm font-bold text-[--color-primary]">電話番号</h5>
                </div>
                <p className="text-sm md:text-base text-[--text-primary] font-bold">000-0000-0000</p>
              </div>
              <div className="bg-white border-2 border-[--color-primary]/30 p-3 md:p-4 shadow-md hover:shadow-lg transition-all hover:border-[--color-primary]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">👥</span>
                  <h5 className="text-xs md:text-sm font-bold text-[--color-primary]">従業員数</h5>
                </div>
                <p className="text-xs md:text-sm text-[--text-primary]">8名<br/><span className="text-[--color-primary]">（整備士5名）</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#f5f5f5]">
        <div className="container-custom">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xs md:text-sm font-bold mb-2 md:mb-3 text-[--text-secondary] tracking-widest uppercase">
              SERVICES
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[--text-primary]">
              サービス内容
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Service 1 */}
            <div className="bg-white overflow-hidden transition-all duration-200 hover:shadow-xl border-2 border-transparent hover:border-[--color-primary]">
              <div className="bg-gradient-to-br from-[--color-primary] to-[--color-primary-dark] p-5 md:p-6 text-white">
                <div className="text-4xl md:text-5xl mb-2">🔧</div>
                <div className="text-xl md:text-2xl font-bold mb-1">01</div>
                <h3 className="text-lg md:text-xl font-bold">修理・整備</h3>
              </div>
              <div className="p-5 md:p-6">
                <p className="text-xs md:text-sm text-[--text-secondary] mb-3 md:mb-4 leading-relaxed">
                  一般整備から車検対応まで、確かな技術で丁寧に対応いたします。
                </p>
                <ul className="text-xs md:text-sm text-[--text-secondary] space-y-2">
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 一般整備 ¥5,000〜</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 車検対応 ¥30,000〜</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> エンジンオーバーホール ¥80,000〜</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 緊急修理</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 定期点検 ¥3,000〜</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 電装系修理 ¥5,000〜</li>
                </ul>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white overflow-hidden transition-all duration-200 hover:shadow-xl border-2 border-transparent hover:border-[--color-primary]">
              <div className="bg-gradient-to-br from-[--color-primary] to-[--color-primary-dark] p-5 md:p-6 text-white">
                <div className="text-4xl md:text-5xl mb-2">⚡</div>
                <div className="text-xl md:text-2xl font-bold mb-1">02</div>
                <h3 className="text-lg md:text-xl font-bold">カスタム・チューニング</h3>
              </div>
              <div className="p-5 md:p-6">
                <p className="text-xs md:text-sm text-[--text-secondary] mb-3 md:mb-4 leading-relaxed">
                  お客様だけの一台を。ご要望に合わせたカスタムやチューニングを承ります。
                </p>
                <ul className="text-xs md:text-sm text-[--text-secondary] space-y-2">
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> マフラー交換 ¥10,000〜</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> ハンドル・ミラー交換 ¥5,000〜</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> カスタムペイント ¥50,000〜</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> パーツ取り付け ¥3,000〜</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> サスペンション交換 ¥15,000〜</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> ECUチューニング ¥30,000〜</li>
                </ul>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white overflow-hidden transition-all duration-200 hover:shadow-xl border-2 border-transparent hover:border-[--color-primary]">
              <div className="bg-gradient-to-br from-[--color-primary] to-[--color-primary-dark] p-5 md:p-6 text-white">
                <div className="text-4xl md:text-5xl mb-2">🏍️</div>
                <div className="text-xl md:text-2xl font-bold mb-1">03</div>
                <h3 className="text-lg md:text-xl font-bold">中古車販売・買取</h3>
              </div>
              <div className="p-5 md:p-6">
                <p className="text-xs md:text-sm text-[--text-secondary] mb-3 md:mb-4 leading-relaxed">
                  厳選された中古バイクを取り揃えています。買取も積極的に行っています。
                </p>
                <ul className="text-xs md:text-sm text-[--text-secondary] space-y-2">
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 中古車販売（全車保証付き）</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> バイク買取（査定無料）</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 下取り対応</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 納車整備無料</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 車両探し代行 ¥10,000〜</li>
                  <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 名義変更代行 ¥8,000〜</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-20 bg-[--color-accent]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-xs md:text-sm font-bold mb-3 text-[--text-secondary] tracking-widest uppercase">
              GALLERY
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-[--text-primary]">
              実績ギャラリー
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square bg-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                  <span className="text-xs bg-[--color-primary] text-white px-3 py-1 mb-2 self-start font-bold">
                    {item.category}
                  </span>
                  <h3 className="text-white font-bold text-sm md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-white text-xs mt-1 line-clamp-2 opacity-90">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
