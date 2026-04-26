import Image from 'next/image';
import Script from 'next/script';
import { HeroSection } from '@/components/features/HeroSection';
import { ContactCTA } from '@/components/common/ContactCTA';

async function getCircuitImages() {
  try {
    const res = await fetch(
      `https://naoki-bike.microcms.io/api/v1/gallery?limit=6&filters=title[contains]サーキット活動&orders=publishedAt`,
      {
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY || '' },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.contents ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const circuitImages = await getCircuitImages();
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
      title: 'Honda CB750 カスタム完成車',
      category: 'カスタム',
      description: '赤×ゴールドのカラーリングが映えるHonda CB750のカスタム完成車。',
      imageUrl: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/634c7c1226554038a47cb1ec2be8b73c/IMG_1762.jpg',
    },
    {
      id: '2',
      title: 'エンジンオーバーホール',
      category: '修理',
      description: 'エンジンを全分解し、内部パーツを点検・交換。新品同様のパフォーマンスに仕上げます。',
      imageUrl: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/3cabca613a234891806ac30a76a3988a/IMG_5810.jpg',
    },
    {
      id: '3',
      title: 'Kawasaki ZRX 黒×金カスタム',
      category: 'カスタム',
      description: '漆黒のボディにゴールドのホイールが映えるKawasaki ZRXのフルカスタム完成車。',
      imageUrl: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/c8c1bcb527f44673a92f4d403ab17d06/IMG_2480.jpg',
    },
    {
      id: '4',
      title: 'フレーム塗装（キャンディレッド）',
      category: 'カスタム',
      description: '鮮やかなキャンディレッドに仕上げたフレーム塗装。下地処理から仕上げまで一貫して行います。',
      imageUrl: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/51a7e379ddc14d4eb7794598a3f1f44a/IMG_3355.jpg',
    },
    {
      id: '5',
      title: 'Kawasaki ZRX ブルーカスタム',
      category: 'カスタム',
      description: 'ブルー×ゴールドのカラーリングが鮮やかなKawasakiのカスタム完成車。',
      imageUrl: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/9aace8c40fc84aa3983d3d845cce684e/IMG_6278.jpg',
    },
    {
      id: '6',
      title: 'Kawasaki H2 カスタム完成車',
      category: 'カスタム',
      description: 'イエローのカラーリングが印象的なKawasaki H2のカスタム車。当時のスタイルを活かしながらモダンに仕上げました。',
      imageUrl: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/650b6ef2050b486499bfb0838cb27c0d/IMG_3859.jpg',
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

          {/* メインサービス: モバイル横スクロール / PC 2カラム */}
          <div className="overflow-x-auto -mx-4 md:mx-0 snap-x snap-mandatory md:overflow-visible" style={{scrollPaddingLeft: '10vw'}}>
            <div className="flex gap-4 md:grid md:grid-cols-2 md:gap-6 pb-2 px-[10vw] md:px-0">
              {/* Service 1: レストア・車両製作 */}
              <div className="relative overflow-hidden flex-shrink-0 w-[80vw] md:w-auto min-h-[400px] md:min-h-[480px] group">
                <Image
                  src="https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/c8c1bcb527f44673a92f4d403ab17d06/IMG_2480.jpg"
                  alt="レストア・車両製作"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 80vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-[--color-primary] mb-1">01</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">レストア・車両製作</h3>
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-4">
                      旧車のレストアから完全オーダーメイドの車両製作まで承ります。お客様の理想を形にします。
                    </p>
                  </div>
                  <ul className="text-xs md:text-sm text-white/90 space-y-2">
                    <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 旧車レストア・フルレストア</li>
                    <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> オーダー車両製作</li>
                    <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> エンジンオーバーホール</li>
                    <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> フレーム加工・製作</li>
                    <li className="flex items-center text-[--color-primary] font-bold mt-3"><span className="mr-2">→</span> 料金はお問い合わせください</li>
                  </ul>
                </div>
              </div>

              {/* Service 2: 板金・塗装・仕上げ */}
              <div className="relative overflow-hidden flex-shrink-0 w-[80vw] md:w-auto min-h-[400px] md:min-h-[480px] group">
                <Image
                  src="https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/51a7e379ddc14d4eb7794598a3f1f44a/IMG_3355.jpg"
                  alt="板金・塗装・仕上げ"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 80vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-[--color-primary] mb-1">02</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">板金・塗装・仕上げ</h3>
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-4">
                      板金・塗装から磨き・バフ仕上げまで。細部にこだわった高品質な仕上がりを提供します。
                    </p>
                  </div>
                  <ul className="text-xs md:text-sm text-white/90 space-y-2">
                    <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> 板金・塗装</li>
                    <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> バフ仕上げ・磨き</li>
                    <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> サンドブラスト処理</li>
                    <li className="flex items-center"><span className="text-[--color-primary] mr-2">✓</span> パーツ単体・フレーム塗装</li>
                    <li className="flex items-center text-[--color-primary] font-bold mt-3"><span className="mr-2">→</span> 料金はお問い合わせください</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 一般・車検整備（サブ） */}
          <div className="mt-6 bg-white border border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-[--color-primary] font-bold text-sm">その他</span>
              <span className="text-sm text-[--text-secondary]">一般整備・車検・事故対応・レッカー業務も承ります。</span>
            </div>
            <span className="text-xs text-[--text-secondary]">料金はお問い合わせください</span>
          </div>
          <div className="flex md:hidden justify-center gap-1 mt-3 text-xs text-[--text-secondary]">
            <svg className="w-4 h-4 animate-pulse" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" /></svg>
            <span>スワイプで見る</span>
            <svg className="w-4 h-4 animate-pulse" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg>
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

          {/* モバイル: 横スクロール / PC: グリッド */}
          <div className="overflow-x-auto -mx-4 md:mx-0 snap-x snap-mandatory md:overflow-visible" style={{scrollPaddingLeft: '14vw'}}>
            <div className="flex gap-4 md:grid md:grid-cols-3 md:gap-4 pb-2 px-[14vw] md:px-0">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex-shrink-0 w-[72vw] md:w-auto aspect-square bg-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 snap-center"
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
          <div className="flex md:hidden justify-center gap-1 mt-3 text-xs text-[--text-secondary]">
            <svg className="w-4 h-4 animate-pulse" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" /></svg>
            <span>スワイプで見る</span>
            <svg className="w-4 h-4 animate-pulse" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg>
          </div>
        </div>
      </section>

      {/* Circuit Section */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-xs md:text-sm font-bold mb-3 text-[--color-primary] tracking-widest uppercase">
              CIRCUIT ACTIVITY
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              サーキット活動
            </h3>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              NK Worksはレースフィールドにも積極的に参戦。<br className="hidden md:block" />
              サーキットで培った技術と経験が、すべての車両製作・整備に活かされています。
            </p>
          </div>

          {circuitImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-10">
              {circuitImages.map((item: { id: string; title: string; images: { url: string }[] }) => (
                <div key={item.id} className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.images[0]?.url}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="border border-gray-700 p-5 md:p-6 text-center">
              <div className="text-3xl mb-3">🏁</div>
              <h4 className="text-base font-bold text-white mb-2">レーサー製作</h4>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">サーキット仕様のレーサー製作・改造を承ります。本気で走りたい方はご相談ください。</p>
            </div>
            <div className="border border-gray-700 p-5 md:p-6 text-center">
              <div className="text-3xl mb-3">⚙️</div>
              <h4 className="text-base font-bold text-white mb-2">マシンメンテナンス</h4>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">レース前後のメンテナンス・セッティング調整。走りのパフォーマンスを最大限に引き出します。</p>
            </div>
            <div className="border border-gray-700 p-5 md:p-6 text-center">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="text-base font-bold text-white mb-2">レース参戦実績</h4>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">自らサーキットに立ち、実戦で得た知識と技術。その経験がお客様のマシンに還元されます。</p>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
