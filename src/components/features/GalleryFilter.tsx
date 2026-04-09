'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/components/common/Link';
import { ContactCTA } from '@/components/common/ContactCTA';
import { Lightbox } from '@/components/common/Lightbox';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  images: Array<{ url: string; width: number; height: number }>;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface GalleryFilterProps {
  items: GalleryItem[];
}

export function GalleryFilter({ items }: GalleryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState({ url: '', alt: '' });

  const categories = ['すべて', '修理', 'カスタム', '販売車両'];

  // Filter items based on selected category
  const displayItems = selectedCategory === 'すべて'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const openLightbox = (url: string, alt: string) => {
    setLightboxImage({ url, alt });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      {/* Category Filter */}
      <section className="py-6 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 border transition-all duration-200 text-sm font-bold ${
                  selectedCategory === category
                    ? 'bg-[--color-primary] text-white border-[--color-primary]'
                    : 'border-[--color-primary] text-[--color-primary] hover:bg-[--color-primary] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-[--color-accent]">
        <div className="container-custom">
          {displayItems.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative aspect-square bg-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                    onClick={() => item.images?.[0]?.url && openLightbox(item.images[0].url, item.title)}
                  >
                    {/* Image */}
                    {item.images?.[0]?.url ? (
                      <Image
                        src={item.images[0].url}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                        画像
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="text-xs bg-[--color-primary] text-white px-2 py-1 mb-2 inline-block font-bold">
                          {item.category}
                        </span>
                        <h3 className="text-white font-bold text-sm line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-200 text-xs mt-1">
                          {item.publishedAt}
                        </p>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-[--color-primary] opacity-0 group-hover:opacity-10 transition-opacity duration-200" />

                    {/* Zoom Icon */}
                    <div className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="mt-12 text-center">
                <button className="px-8 py-3 bg-[--color-primary] text-white text-sm font-bold hover:bg-[--color-primary-dark] transition-all duration-200">
                  さらに読み込む
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">該当するアイテムがありません</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        imageUrl={lightboxImage.url}
        imageAlt={lightboxImage.alt}
        onClose={closeLightbox}
      />

      <ContactCTA />
    </>
  );
}
