import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { HeroSection } from '@/components/features/HeroSection';
import { ContactCTA } from '@/components/common/ContactCTA';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAllGalleryItems } from '@/lib/api/gallery';
import type { GalleryItem } from '@/types/gallery';

// ---- データ分類ヘルパー --------------------------------
function classifyItems(items: GalleryItem[]) {
  const circuit = items.filter(i => i.title.includes('サーキット活動'));
  const paint = items.filter(
    i =>
      i.title.includes('塗装') ||
      i.title.includes('研磨') ||
      i.title.includes('ポリッシュ') ||
      i.title.includes('サンドブラスト') ||
      i.title.includes('バフ')
  );
  const general = items.filter(
    i => !i.title.includes('サーキット活動') && !i.title.includes('サンドブラスト加工')
  );
  const completedCars = general.filter(
    i =>
      i.category.includes('カスタム') &&
      !i.title.includes('塗装') &&
      !i.title.includes('研磨') &&
      !i.title.includes('ポリッシュ') &&
      !i.title.includes('ホイール・ブレーキ周り')
  );
  const repair = general.filter(i => i.category.includes('修理'));

  return { circuit, paint, completedCars, repair };
}

// ---- サブコンポーネント --------------------------------

/** セクション区切りの縦ライン + ラベル付き見出し（左揃え） */
function SubHeading({ label, count }: { label: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-0.5 h-5 bg-[--color-primary] inline-block flex-shrink-0" />
      <h3 className="text-sm md:text-base font-bold text-[--text-primary]">{label}</h3>
      {count != null && (
        <span className="text-xs text-[--text-secondary] ml-auto">{count}件</span>
      )}
    </div>
  );
}


/** 横スクロール フォトストリップ（自然比率） */
function PhotoStrip({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="overflow-x-auto -mx-4 md:mx-0 scrollbar-hide">
      <div className="flex gap-2 md:gap-3 px-4 md:px-0 pb-1">
        {items.map(item => {
          const img = item.images[0];
          if (!img) return null;
          return (
            <div key={item.id} className="flex-shrink-0 overflow-hidden group">
              <Image
                src={img.url}
                alt={item.title}
                width={img.width || 1920}
                height={img.height || 1440}
                className="h-44 md:h-52 w-auto object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 55vw, 25vw"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** CSS columns マソンリーギャラリー（自然比率・ホバーオーバーレイ付き） */
function MasonryGallery({ items, accentColor = 'bg-[--color-primary]' }: { items: GalleryItem[]; accentColor?: string }) {
  if (items.length === 0) return null;
  return (
    <div className="columns-2 md:columns-3 gap-2 md:gap-3">
      {items.map(item => {
        const img = item.images[0];
        if (!img) return null;
        return (
          <div key={item.id} className="break-inside-avoid mb-2 md:mb-3 group relative overflow-hidden">
            <Image
              src={img.url}
              alt={item.title}
              width={img.width || 1920}
              height={img.height || 1440}
              className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <span className={`text-xs ${accentColor} text-white px-2 py-0.5 mb-1 self-start font-bold`}>
                {item.category[0]}
              </span>
              <p className="text-white text-xs font-bold leading-tight line-clamp-2">{item.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---- 構造化データ --------------------------------
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

// ---- ページ本体 --------------------------------
export default async function Home() {
  const allItems = await getAllGalleryItems();
  const { circuit, paint, completedCars, repair } = classifyItems(allItems);

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection />

      {/* ===== About ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <SectionHeader label="ABOUT US" title="直樹バイクについて" description="創業15年以上、地域のライダーの皆様に愛されるショップです。国家資格を持つ整備士が在籍し、確かな技術と丁寧なサービスでお客様のバイクライフを全力でサポートしています。" />

          {/* 3つの強み */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800 mb-6 overflow-hidden">
            {[
              {
                num: '01',
                en: 'TECHNICAL SKILL',
                title: '確かな技術力',
                desc: '国家資格整備士が在籍。豊富な経験と最新知識で、国産・外車問わずあらゆる車種に対応します。',
              },
              {
                num: '02',
                en: 'TRANSPARENT PRICING',
                title: '明朗会計',
                desc: '作業前に必ず見積もりをご提示。追加費用が生じる場合も必ず事前にご連絡します。',
              },
              {
                num: '03',
                en: 'QUICK RESPONSE',
                title: 'スピード対応',
                desc: '緊急修理にも迅速に対応。お客様の愛車をできる限り早くお返しすることを最優先にします。',
              },
            ].map(({ num, en, title, desc }) => (
              <div key={num} className="relative bg-gray-900 px-7 py-8 md:px-8 md:py-10 overflow-hidden group">
                {/* 装飾数字 */}
                <div
                  className="absolute -top-4 -right-2 text-[8rem] md:text-[9rem] font-black leading-none select-none text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-500 pointer-events-none"
                  aria-hidden="true"
                >
                  {num}
                </div>
                {/* 赤いトップボーダー */}
                <div className="w-8 h-0.5 bg-[--color-primary] mb-5" />
                <p className="text-[10px] font-bold tracking-widest text-[--color-primary] mb-2 uppercase">{en}</p>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* 会社概要 */}
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] border border-gray-200 overflow-hidden">
            {/* 写真 */}
            <div className="relative h-56 md:h-auto overflow-hidden bg-gray-100">
              <Image
                src="https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/634c7c1226554038a47cb1ec2be8b73c/IMG_1762.jpg"
                alt="NK Works"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 280px"
              />
            </div>
            {/* 詳細テーブル */}
            <div className="divide-y divide-gray-200">
              {[
                { label: '店舗名',   value: 'NK Works（直樹バイク）' },
                { label: '代表者',   value: '○○ ○○' },
                { label: '事業内容', value: 'バイクの修理・整備、フルレストア・カスタム車両製作、板金・塗装・仕上げ（サンドブラスト含む）、サーキット向けレーサー製作・メンテナンス' },
                { label: '営業時間', value: '9:00–18:00' },
                { label: '定休日',   value: 'なし' },
                { label: '電話番号', value: '000-0000-0000' },
                { label: 'FAX',      value: '000-0000-0000' },
                { label: 'メール',   value: 'info@nkworks.com' },
                { label: '実績',     value: '創業15年以上' },
                { label: '従業員',   value: '2名' },
              ].map(({ label, value }) => (
                <div key={label} className="grid grid-cols-[96px_1fr] md:grid-cols-[120px_1fr]">
                  <div className="px-4 py-3 bg-gray-50 text-xs font-bold text-[--text-secondary] flex items-center border-r border-gray-200">{label}</div>
                  <div className="px-4 py-3 text-sm text-[--text-primary] flex items-center">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="py-16 md:py-20 bg-[#f5f5f5]">
        <div className="container-custom">
          <SectionHeader label="SERVICES" title="サービス内容" />

          {/* サービス 2ブロック: PC=2カラム / モバイル=縦積み */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">

            {/* ── レストア・車両製作 ── */}
            <div>
              <div className="relative overflow-hidden min-h-[400px] md:min-h-[460px] group mb-5">
                <Image
                  src="https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/c8c1bcb527f44673a92f4d403ab17d06/IMG_2480.jpg"
                  alt="レストア・車両製作"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/35" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[--color-primary] mb-2 uppercase">Restore &amp; Custom Build</p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">レストア・車両製作</h3>
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-5">
                      旧車のフルレストアから完全オーダーメイドの車両製作まで。お客様の思い描く理想の1台を形にします。
                    </p>
                    <ul className="text-xs md:text-sm text-white/90 space-y-2.5">
                      {['旧車レストア・フルレストア', 'オーダーメイド車両製作', 'エンジンオーバーホール・チューニング', 'フレーム加工・溶接製作', '足回り・サスペンション交換'].map(item => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <span className="text-xs text-white/50">料金はお問い合わせください</span>
                    <Link href="/contact" className="text-[--color-primary] text-xs font-bold hover:underline">→ お問い合わせ</Link>
                  </div>
                </div>
              </div>
              <SubHeading label="完成車・実績" count={completedCars.length} />
              <PhotoStrip items={completedCars} />
            </div>

            {/* ── 板金・塗装・仕上げ ── */}
            <div>
              <div className="relative overflow-hidden min-h-[400px] md:min-h-[460px] group mb-5">
                <Image
                  src="https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/51a7e379ddc14d4eb7794598a3f1f44a/IMG_3355.jpg"
                  alt="板金・塗装・仕上げ"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/35" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[--color-primary] mb-2 uppercase">Paint &amp; Finish</p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">板金・塗装・仕上げ</h3>
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-5">
                      板金・全塗装から磨き・バフ仕上げ、サンドブラスト処理まで。細部にこだわり、魅せるバイクを仕上げます。
                    </p>
                    <ul className="text-xs md:text-sm text-white/90 space-y-2.5">
                      {['フレーム・タンク・外装の板金・塗装', 'バフ仕上げ・磨き・ポリッシュ', 'サンドブラスト処理（下地・錆除去）', 'エンジン・パーツ単体の塗装', 'キャンディ塗装・カスタムカラー'].map(item => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-[--color-primary] mt-0.5 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <span className="text-xs text-white/50">料金はお問い合わせください</span>
                    <Link href="/contact" className="text-[--color-primary] text-xs font-bold hover:underline">→ お問い合わせ</Link>
                  </div>
                </div>
              </div>
              <SubHeading label="施工事例" count={paint.length} />
              <PhotoStrip items={paint} />
            </div>

          </div>

          {/* 一般・車検整備（サブ） */}
          <div className="mt-8 bg-white border border-gray-200 px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-[--color-primary] font-bold text-xs tracking-widest uppercase">その他</span>
              <span className="w-px h-4 bg-gray-300" />
              <span className="text-sm text-[--text-secondary]">一般整備・車検・事故対応・レッカー業務も承ります。</span>
            </div>
            <span className="text-xs text-[--text-secondary]">料金はお問い合わせください</span>
          </div>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section id="gallery" className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <SectionHeader label="GALLERY" title="実績ギャラリー" />

          <div className="mb-12 md:mb-16">
            <SubHeading label="完成車・カスタム" />
            <MasonryGallery items={completedCars} />
          </div>

          <div>
            <SubHeading label="修理・整備作業" />
            <MasonryGallery items={repair} accentColor="bg-gray-600" />
          </div>
        </div>
      </section>

      {/* ===== Circuit ===== */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container-custom">
          <SectionHeader
            label="CIRCUIT ACTIVITY"
            title="サーキット活動"
            description={<>NK Worksはレースフィールドにも積極的に参戦。<br className="hidden md:block" />サーキットで培った技術と経験が、すべての車両製作・整備に活かされています。</>}
            theme="dark"
          />

          {circuit.length > 0 && (
            <div className="columns-2 md:columns-3 gap-2 md:gap-3 mb-12">
              {circuit.map(item => {
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-700">
            {[
              { icon: '🏁', title: 'レーサー製作', desc: 'サーキット仕様のレーサー製作・改造を承ります。本気で走りたい方はご相談ください。' },
              { icon: '⚙️', title: 'マシンメンテナンス', desc: 'レース前後のメンテナンス・セッティング調整。走りのパフォーマンスを最大限に引き出します。' },
              { icon: '🏆', title: 'レース参戦実績', desc: '自らサーキットに立ち、実戦で得た知識と技術。その経験がお客様のマシンに還元されます。' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-gray-900 p-6 md:p-8 text-center">
                <div className="text-3xl mb-3">{icon}</div>
                <h4 className="font-bold text-white mb-2">{title}</h4>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
