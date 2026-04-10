import Image from 'next/image';
import Script from 'next/script';
import { HeroSection } from '@/components/features/HeroSection';
import { Button } from '@/components/common/Button';
import { Link } from '@/components/common/Link';
import { ContactCTA } from '@/components/common/ContactCTA';
import { getLatestBlogPosts } from '@/lib/api/blog';
import { getLatestGalleryItems } from '@/lib/api/gallery';
import { FALLBACK_NEWS, FALLBACK_GALLERY } from '@/constants/fallback-data';

// Cache configuration: revalidate every 30 minutes
export const revalidate = 1800;

export default async function Home() {
  // 構造化データ（JSON-LD）
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
  // Fetch latest content from microCMS
  const latestNews = await getLatestBlogPosts(6);
  const galleryItems = await getLatestGalleryItems(6);

  // Use fallback data if API returns empty
  const displayNews = latestNews.length > 0 ? latestNews : FALLBACK_NEWS;
  const displayGallery = galleryItems.length > 0 ? galleryItems : FALLBACK_GALLERY;

  return (
    <>
      {/* 構造化データ */}
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

          {/* Features - Grid Layout */}
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

          {/* Company Info - Grid Layout */}
          <div className="mb-6 md:mb-8">
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

          <div className="text-center">
            <Button href="/about" variant="primary" size="lg">
              会社案内を見る
            </Button>
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

          {/* Services - Mobile: Stack, Desktop: Grid */}
          <div className="mb-6 md:mb-8">
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
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> 一般整備 ¥5,000〜
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> 車検対応 ¥30,000〜
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> エンジンオーバーホール ¥80,000〜
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> 緊急修理
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> 定期点検 ¥3,000〜
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> 電装系修理 ¥5,000〜
                    </li>
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
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> マフラー交換 ¥10,000〜
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> ハンドル・ミラー交換 ¥5,000〜
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> カスタムペイント ¥50,000〜
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> パーツ取り付け ¥3,000〜
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> サスペンション交換 ¥15,000〜
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> ECUチューニング ¥30,000〜
                    </li>
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
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> 中古車販売（全車保証付き）
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> バイク買取（査定無料）
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> 下取り対応
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> 納車整備無料
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> 車両探し代行 ¥10,000〜
                    </li>
                    <li className="flex items-center">
                      <span className="text-[--color-primary] mr-2">✓</span> 名義変更代行 ¥8,000〜
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button href="/services" variant="primary" size="lg">
              サービス詳細を見る
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
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

          {/* Gallery - Grid Layout */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayGallery.map((item) => (
                <Link
                  key={item.id}
                  href={`/gallery/${item.id}`}
                  className="group relative aspect-square bg-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
                >
                  {item.images?.[0]?.url && (
                    <Image
                      src={item.images[0].url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                    <span className="text-xs bg-[--color-primary] text-white px-3 py-1 mb-2 self-start font-bold">
                      {item.category}
                    </span>
                    <h3 className="text-white font-bold text-sm md:text-base">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-white text-xs mt-1 line-clamp-2 opacity-90">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-[--color-primary] opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button href="/gallery" variant="primary" size="md">
              ギャラリーを見る
            </Button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-xs md:text-sm font-bold mb-3 text-[--text-secondary] tracking-widest uppercase">
              NEWS
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-[--text-primary]">
              最新のお知らせ
            </h3>
          </div>

          {/* News - Horizontal Scroll with Snap */}
          <div className="mb-8">
            <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[--color-primary] scrollbar-track-gray-200">
              <div className="flex gap-4 min-w-max md:min-w-0">
                {displayNews.map((news, index) => (
                  <Link
                    key={news.id}
                    href={`/blog/${news.id}`}
                    className="flex-shrink-0 bg-white border border-gray-200 overflow-hidden hover:border-[--color-primary] hover:shadow-md transition-all duration-200 w-[320px] md:w-[400px] snap-start"
                  >
                    <div className="flex flex-col h-full">
                      {/* Eyecatch Image */}
                      {news.thumbnail && (
                        <div className="relative w-full h-48 bg-gray-100">
                          <Image
                            src={news.thumbnail.url}
                            alt={news.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 320px, 400px"
                          />
                        </div>
                      )}

                      <div className="flex flex-col gap-3 p-6 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-[--text-secondary]">{news.publishedAt}</span>
                          <span className="shrink-0 bg-[--color-primary] px-3 py-1 text-xs font-bold text-white">
                            {news.category}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[--text-primary] line-clamp-2">
                          {news.title}
                        </h3>
                        <div className="mt-auto flex items-center text-[--color-primary] text-sm font-bold">
                          続きを読む
                          <svg className="w-4 h-4 ml-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* Scroll indicator with visual cue */}
            <div className="flex items-center justify-center gap-2 text-sm text-[--text-secondary] md:hidden">
              <svg className="w-4 h-4 animate-pulse" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19l-7-7 7-7" />
              </svg>
              <span>スワイプして他の記事を見る</span>
              <svg className="w-4 h-4 animate-pulse" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <Button href="/blog" variant="primary" size="md">
              お知らせ一覧を見る
            </Button>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
