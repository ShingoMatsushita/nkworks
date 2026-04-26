import Image from 'next/image';
import Script from 'next/script';
import { HeroSection } from '@/components/features/HeroSection';
import { ContactCTA } from '@/components/common/ContactCTA';

interface MicroCMSImage {
  url: string;
  width: number;
  height: number;
}

interface GalleryEntry {
  id: string;
  title: string;
  description: string;
  images: MicroCMSImage[];
  category: string[];
}

async function getAllGalleryItems(): Promise<GalleryEntry[]> {
  try {
    const res = await fetch(
      'https://naoki-bike.microcms.io/api/v1/gallery?limit=100&orders=createdAt',
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
  const allItems = await getAllGalleryItems();

  // サーキット活動（10枚）
  const circuitItems = allItems.filter(item => item.title.includes('サーキット活動'));

  // 板金・塗装・サンドブラスト系（11枚）
  const paintItems = allItems.filter(item =>
    item.title.includes('塗装') ||
    item.title.includes('研磨') ||
    item.title.includes('ポリッシュ') ||
    item.title.includes('サンドブラスト') ||
    item.title.includes('バフ')
  );

  // 一般ギャラリー（サーキット・サンドブラストを除く 26枚）
  const galleryItems = allItems.filter(item =>
    !item.title.includes('サーキット活動') &&
    !item.title.includes('サンドブラスト加工')
  );

  // レストア完成車（カスタム完成車 + レーサー仕様など）
  const completedCarItems = galleryItems.filter(item =>
    item.category.includes('カスタム') &&
    !item.title.includes('塗装') &&
    !item.title.includes('研磨') &&
    !item.title.includes('ポリッシュ') &&
    !item.title.includes('ホイール・ブレーキ周り')
  );

  // 修理・整備作業
  const repairItems = galleryItems.filter(item => item.category.includes('修理'));

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
    areaServed: { '@type': 'City', name: '○○市' },
  };

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

      {/* ===== Services Section ===== */}
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

          {/* メインカード 2枚: モバイル横スクロール / PC 2カラム */}
          <div className="overflow-x-auto -mx-4 md:mx-0 snap-x snap-mandatory md:overflow-visible" style={{scrollPaddingLeft: '10vw'}}>
            <div className="flex gap-4 md:grid md:grid-cols-2 md:gap-6 pb-2 px-[10vw] md:px-0">

              {/* Service 1: レストア・車両製作 */}
              <div className="relative overflow-hidden flex-shrink-0 w-[80vw] md:w-auto min-h-[420px] md:min-h-[500px] group snap-center">
                <Image
                  src="https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/c8c1bcb527f44673a92f4d403ab17d06/IMG_2480.jpg"
                  alt="レストア・車両製作"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 80vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-[--color-primary] mb-2 uppercase">Restore &amp; Custom Build</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">レストア・車両製作</h3>
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-5">
                      旧車のフルレストアから完全オーダーメイドの車両製作まで。お客様の思い描く理想の1台を形にします。
                    </p>
                    <ul className="text-xs md:text-sm text-white/90 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                        <span>旧車レストア・フルレストア</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                        <span>オーダーメイド車両製作</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                        <span>エンジンオーバーホール・チューニング</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                        <span>フレーム加工・溶接製作</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                        <span>足回り・サスペンション交換・カスタム</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                    <span className="text-xs text-white/60">料金はお問い合わせください</span>
                    <span className="text-[--color-primary] text-xs font-bold">→ お問い合わせ</span>
                  </div>
                </div>
              </div>

              {/* Service 2: 板金・塗装・仕上げ */}
              <div className="relative overflow-hidden flex-shrink-0 w-[80vw] md:w-auto min-h-[420px] md:min-h-[500px] group snap-center">
                <Image
                  src="https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/51a7e379ddc14d4eb7794598a3f1f44a/IMG_3355.jpg"
                  alt="板金・塗装・仕上げ"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 80vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-[--color-primary] mb-2 uppercase">Paint &amp; Finish</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">板金・塗装・仕上げ</h3>
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-5">
                      板金・全塗装から磨き・バフ仕上げ、サンドブラスト処理まで。細部にこだわり、魅せるバイクを仕上げます。
                    </p>
                    <ul className="text-xs md:text-sm text-white/90 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                        <span>フレーム・タンク・外装の板金・塗装</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                        <span>バフ仕上げ・磨き・ポリッシュ</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                        <span>サンドブラスト処理（下地・錆除去）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                        <span>エンジン・パーツ単体の塗装</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                        <span>キャンディ塗装・カスタムカラー</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                    <span className="text-xs text-white/60">料金はお問い合わせください</span>
                    <span className="text-[--color-primary] text-xs font-bold">→ お問い合わせ</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="flex md:hidden justify-center gap-1 mt-3 text-xs text-[--text-secondary]">
            <svg className="w-4 h-4 animate-pulse" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" /></svg>
            <span>スワイプで見る</span>
            <svg className="w-4 h-4 animate-pulse" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg>
          </div>

          {/* 完成車実績 フォトストリップ */}
          {completedCarItems.length > 0 && (
            <div className="mt-10 md:mt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-5 bg-[--color-primary] inline-block" />
                <h4 className="text-sm md:text-base font-bold text-[--text-primary]">レストア・完成車実績</h4>
                <span className="text-xs text-[--text-secondary] ml-auto">{completedCarItems.length}台</span>
              </div>
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="flex gap-2 md:gap-3 px-4 md:px-0 pb-2">
                  {completedCarItems.map((item) => {
                    const img = item.images[0];
                    if (!img) return null;
                    return (
                      <div key={item.id} className="flex-shrink-0 overflow-hidden group">
                        <Image
                          src={img.url}
                          alt={item.title}
                          width={img.width || 1920}
                          height={img.height || 1440}
                          className="h-40 md:h-48 w-auto object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 60vw, 30vw"
                        />
                        <p className="text-xs text-[--text-secondary] mt-1 truncate max-w-[10rem]">{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 板金・塗装・サンドブラスト 施工事例ストリップ */}
          {paintItems.length > 0 && (
            <div className="mt-8 md:mt-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-5 bg-[--color-primary] inline-block" />
                <h4 className="text-sm md:text-base font-bold text-[--text-primary]">板金・塗装・サンドブラスト 施工事例</h4>
                <span className="text-xs text-[--text-secondary] ml-auto">{paintItems.length}件</span>
              </div>
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="flex gap-2 md:gap-3 px-4 md:px-0 pb-2">
                  {paintItems.map((item) => {
                    const img = item.images[0];
                    if (!img) return null;
                    return (
                      <div key={item.id} className="flex-shrink-0 overflow-hidden group">
                        <Image
                          src={img.url}
                          alt={item.title}
                          width={img.width || 1920}
                          height={img.height || 1440}
                          className="h-40 md:h-48 w-auto object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 60vw, 30vw"
                        />
                        <p className="text-xs text-[--text-secondary] mt-1 truncate max-w-[10rem]">{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 一般・車検整備（サブ） */}
          <div className="mt-8 bg-white border border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-[--color-primary] font-bold text-sm">その他</span>
              <span className="text-sm text-[--text-secondary]">一般整備・車検・事故対応・レッカー業務も承ります。</span>
            </div>
            <span className="text-xs text-[--text-secondary]">料金はお問い合わせください</span>
          </div>

        </div>
      </section>

      {/* ===== Gallery Section ===== */}
      <section className="py-16 md:py-20 bg-[--color-accent]">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-xs md:text-sm font-bold mb-3 text-[--text-secondary] tracking-widest uppercase">
              GALLERY
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-[--text-primary]">
              実績ギャラリー
            </h3>
          </div>

          {/* 完成車・カスタム */}
          {completedCarItems.length > 0 && (
            <div className="mb-10 md:mb-14">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1 h-5 bg-[--color-primary] inline-block flex-shrink-0" />
                <h4 className="text-sm md:text-base font-bold text-[--text-primary]">完成車・カスタム</h4>
              </div>
              <div className="columns-2 md:columns-3 gap-2 md:gap-3">
                {completedCarItems.map((item) => {
                  const img = item.images[0];
                  if (!img) return null;
                  return (
                    <div key={item.id} className="break-inside-avoid mb-2 md:mb-3 group overflow-hidden relative">
                      <Image
                        src={img.url}
                        alt={item.title}
                        width={img.width || 1920}
                        height={img.height || 1440}
                        className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <span className="text-xs bg-[--color-primary] text-white px-2 py-0.5 mb-1 self-start font-bold">{item.category[0]}</span>
                        <p className="text-white text-xs font-bold leading-tight">{item.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 修理・整備 */}
          {repairItems.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1 h-5 bg-[--color-primary] inline-block flex-shrink-0" />
                <h4 className="text-sm md:text-base font-bold text-[--text-primary]">修理・整備作業</h4>
              </div>
              <div className="columns-2 md:columns-3 gap-2 md:gap-3">
                {repairItems.map((item) => {
                  const img = item.images[0];
                  if (!img) return null;
                  return (
                    <div key={item.id} className="break-inside-avoid mb-2 md:mb-3 group overflow-hidden relative">
                      <Image
                        src={img.url}
                        alt={item.title}
                        width={img.width || 1920}
                        height={img.height || 1440}
                        className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <span className="text-xs bg-gray-600 text-white px-2 py-0.5 mb-1 self-start font-bold">{item.category[0]}</span>
                        <p className="text-white text-xs font-bold leading-tight">{item.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== Circuit Section ===== */}
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

          {circuitItems.length > 0 && (
            <div className="columns-2 md:columns-3 gap-2 md:gap-3 mb-10">
              {circuitItems.map((item) => {
                const img = item.images[0];
                if (!img) return null;
                return (
                  <div key={item.id} className="break-inside-avoid mb-2 md:mb-3 overflow-hidden group">
                    <Image
                      src={img.url}
                      alt={item.title}
                      width={img.width || 1920}
                      height={img.height || 1440}
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                );
              })}
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
