import type { Metadata } from 'next';
import { GalleryFilter } from '@/components/features/GalleryFilter';

export const metadata: Metadata = {
  title: '実績ギャラリー',
  description: '直樹バイクの修理・カスタム・販売車両の実績をご紹介します。',
};

const galleryItems = [
    {
      id: '1',
      title: 'CB400SF カスタムペイント',
      category: 'カスタム',
      description: 'お客様のご要望でキャンディレッドに全塗装。光沢のある美しい仕上がりになりました。',
      images: [{ url: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-04-01',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '2',
      title: 'Ninja250 エンジン整備',
      category: '修理',
      description: 'エンジンオーバーホール。異音の原因を特定し、ピストンリング交換で完全復活。',
      images: [{ url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-03-28',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '3',
      title: 'ハーレー・ダビッドソン ソフテイル 販売車両',
      category: '販売車両',
      description: '2019年式 走行12,000km。フルカスタム済み。程度良好な1台です。',
      images: [{ url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-03-25',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '4',
      title: 'PCX フルメンテナンス',
      category: '修理',
      description: '定期メンテナンス実施。オイル交換、タイヤ交換、ブレーキパッド交換など。',
      images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-03-20',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '5',
      title: 'YZF-R25 カスタムパーツ取付',
      category: 'カスタム',
      description: 'アクラポビッチマフラー、バックステップ、セパハン装着。スポーティーな仕上がりに。',
      images: [{ url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-03-15',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '6',
      title: 'Ninja400 販売済み',
      category: '販売車両',
      description: '2021年式 走行8,000km。人気のグリーン。ご成約ありがとうございました。',
      images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-03-10',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '7',
      title: 'GSX-R600 カスタムマフラー',
      category: 'カスタム',
      description: 'ヨシムラマフラー装着。サウンドも抜群で、見た目もスポーティーに。',
      images: [{ url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-03-05',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '8',
      title: 'Z900RS ブレーキ整備',
      category: '修理',
      description: 'フロント・リアブレーキパッド交換、ブレーキフルード交換。制動力が復活しました。',
      images: [{ url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-03-01',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '9',
      title: 'CB1300 SF 中古車入荷',
      category: '販売車両',
      description: '2018年式 走行15,000km。ワンオーナー車。車検付きですぐにお乗りいただけます。',
      images: [{ url: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-02-25',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '10',
      title: 'MT-09 車検整備',
      category: '修理',
      description: '車検整備完了。24ヶ月点検、オイル交換、各部点検・調整を実施。',
      images: [{ url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-02-20',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '11',
      title: 'W800 カスタムシート',
      category: 'カスタム',
      description: 'レザーシート張り替え。座り心地も向上し、高級感のある仕上がりに。',
      images: [{ url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-02-15',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '12',
      title: 'CBR250RR タイヤ交換',
      category: '修理',
      description: 'フロント・リアタイヤ交換。グリップ力が向上し、安心して走行できます。',
      images: [{ url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop' }],
      publishedAt: '2026-02-10',
      createdAt: '',
      updatedAt: '',
    },
  ];

export default function GalleryPage() {
  // Temporarily use static data instead of fetching from microCMS
  // const { contents: items } = await getGalleryItems(24);
  // const displayItems = items.length > 0 ? items : galleryItems;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop"
            alt="ギャラリー"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Red Accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-[--color-primary]/20 to-transparent"></div>

        <div className="container-custom text-center relative z-10">
          <p className="text-xs md:text-sm font-bold mb-3 text-white/90 tracking-widest uppercase">
            Gallery
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            実績ギャラリー
          </h1>
        </div>
      </section>

      <GalleryFilter items={galleryItems} />
    </>
  );
}
