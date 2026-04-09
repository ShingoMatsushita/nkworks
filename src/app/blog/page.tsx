import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/components/common/Link';
import { ContactCTA } from '@/components/common/ContactCTA';
import { getBlogPosts } from '@/lib/api/blog';

export const metadata: Metadata = {
  title: 'お知らせ・ブログ',
  description: '直樹バイクの最新情報、お知らせ、イベント情報などを発信しています。',
};

export default async function BlogPage() {
  // Fetch posts from microCMS
  const { contents: posts } = await getBlogPosts(20);

  // Fallback dummy data if no posts
  const fallbackPosts = [
    {
      id: '1',
      title: '新着バイク入荷のお知らせ - CB1300 SF・Ninja400',
      category: 'お知らせ' as const,
      publishedAt: '2026-04-01',
      thumbnail: { url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '2',
      title: 'ゴールデンウィーク営業のご案内',
      category: 'お知らせ' as const,
      publishedAt: '2026-03-28',
      thumbnail: { url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2070&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '3',
      title: '春のメンテナンスキャンペーン開催中！オイル交換20%OFF',
      category: 'イベント' as const,
      publishedAt: '2026-03-25',
      thumbnail: { url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '4',
      title: 'バイクのオイル交換時期について - 適切なタイミングとは',
      category: 'メンテナンス情報' as const,
      publishedAt: '2026-03-20',
      thumbnail: { url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '5',
      title: '春のツーリングスポット特集 - 関東近郊おすすめコース5選',
      category: 'コラム' as const,
      publishedAt: '2026-03-15',
      thumbnail: { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '6',
      title: '定休日変更のお知らせ',
      category: 'お知らせ' as const,
      publishedAt: '2026-03-10',
      thumbnail: { url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2070&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '7',
      title: 'バイクの冬眠前準備 - 長期保管のポイント',
      category: 'メンテナンス情報' as const,
      publishedAt: '2026-03-05',
      thumbnail: { url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '8',
      title: 'バイクカスタム相談会開催のお知らせ',
      category: 'イベント' as const,
      publishedAt: '2026-03-01',
      thumbnail: { url: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?q=80&w=2070&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '9',
      title: 'バイク初心者向け - 車種選びのポイント',
      category: 'コラム' as const,
      publishedAt: '2026-02-25',
      thumbnail: { url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '10',
      title: 'タイヤの寿命と交換時期の見極め方',
      category: 'メンテナンス情報' as const,
      publishedAt: '2026-02-20',
      thumbnail: { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '11',
      title: '年末年始の営業時間のお知らせ',
      category: 'お知らせ' as const,
      publishedAt: '2026-02-15',
      thumbnail: { url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2070&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '12',
      title: '雨の日のバイク走行 - 安全運転のコツ',
      category: 'コラム' as const,
      publishedAt: '2026-02-10',
      thumbnail: { url: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?q=80&w=2070&auto=format&fit=crop', width: 1200, height: 800 },
      content: '',
      createdAt: '',
      updatedAt: '',
    },
  ];

  // Use microCMS data if available, otherwise use fallback
  const displayPosts = posts.length > 0 ? posts : fallbackPosts;

  const categories = ['すべて', 'お知らせ', 'イベント', 'メンテナンス情報', 'コラム'];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover object-center"
            alt="お知らせ"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Red Accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-[--color-primary]/20 to-transparent"></div>

        <div className="container-custom text-center relative z-10">
          <p className="text-xs md:text-sm font-bold mb-3 text-white/90 tracking-widest uppercase">
            News & Blog
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            お知らせ・ブログ
          </h1>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-5 py-2 border border-[--color-primary] text-[--color-primary] hover:bg-[--color-primary] hover:text-white transition-all duration-200 text-sm font-bold"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-[--color-accent]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-4">
            {displayPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="block bg-white shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className="md:flex">
                  {/* Thumbnail */}
                  <div className="relative h-40 shrink-0 bg-gray-200 md:h-auto md:w-1/3">
                    {post.thumbnail?.url ? (
                      <Image
                        src={post.thumbnail.url}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                        画像
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 p-5 md:w-2/3 md:flex md:flex-col md:justify-center">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-[--text-secondary]">
                        {post.publishedAt}
                      </span>
                      <span className="text-xs bg-[--color-primary] text-white px-3 py-1 font-bold">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-[--text-primary] mb-2 hover:text-[--color-primary] transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex items-center text-[--color-primary] font-bold text-sm">
                      続きを読む
                      <svg className="w-4 h-4 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-12 flex justify-center gap-2">
            <button className="px-4 py-2 bg-[--color-primary] text-white text-sm font-bold hover:bg-[--color-primary-dark] transition-all">
              1
            </button>
            <button className="px-4 py-2 bg-white text-sm font-bold hover:bg-gray-100 transition-all">
              2
            </button>
            <button className="px-4 py-2 bg-white text-sm font-bold hover:bg-gray-100 transition-all">
              3
            </button>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
