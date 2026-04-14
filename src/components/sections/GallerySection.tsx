'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import type { GalleryItem } from '@/types'

interface Props {
  items: GalleryItem[]
}

const categoryColors: Record<string, string> = {
  '修理': 'bg-blue-100 text-blue-700',
  'カスタム': 'bg-red-100 text-red-700',
  '中古車販売': 'bg-green-100 text-green-700',
}

// microCMSが未設定の場合のプレースホルダー
const placeholderItems: GalleryItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: String(i),
  title: ['CB400 エンジンオーバーホール', 'スーパーカブ カスタム', 'CBR600RR 入荷', 'ハーレー マフラー交換', 'GSX-R 車検整備', 'モンキー フルカスタム'][i],
  description: '施工事例',
  image: { url: `https://placehold.co/600x400/1F2937/DC2626?text=NAOKI+BIKE`, width: 600, height: 400 },
  category: (['修理', 'カスタム', '中古車販売', 'カスタム', '修理', 'カスタム'] as const)[i],
  publishedAt: new Date().toISOString(),
}))

export default function GallerySection({ items }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  const displayItems = items.length > 0 ? items : placeholderItems

  return (
    <section id="gallery" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-red-600 font-en font-semibold text-sm tracking-[0.3em] uppercase mb-3">Gallery</p>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-black mb-4">施工事例</h2>
          <p className="text-gray-500">修理・カスタム・販売の実績をご覧ください。</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3] bg-gray-100"
              onClick={() => setLightbox(item)}
            >
              <Image
                src={item.image.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/60 transition-all duration-300 flex items-end p-4">
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[item.category]}`}>
                    {item.category}
                  </span>
                  <p className="text-white font-bold mt-2">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ライトボックス */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl font-light hover:text-gray-300"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={lightbox.image.url}
                alt={lightbox.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="mt-4 text-center">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[lightbox.category]}`}>
                {lightbox.category}
              </span>
              <p className="text-white font-bold text-lg mt-2">{lightbox.title}</p>
              <p className="text-gray-400 text-sm mt-1">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
