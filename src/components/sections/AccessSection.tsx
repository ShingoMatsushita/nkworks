'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function AccessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="access" className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-red-600 font-en font-semibold text-sm tracking-[0.3em] uppercase mb-3">Access</p>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-black mb-4">アクセス・店舗情報</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* 店舗情報 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <h3 className="font-black text-xl text-gray-900 mb-6">直樹バイク</h3>
            <ul className="space-y-4">
              {[
                { label: '住所', value: '〒000-0000 ○○県○○市○○町0-0-0' },
                { label: '電話', value: '000-0000-0000' },
                { label: '営業時間', value: '9:00〜18:00' },
                { label: '定休日', value: '毎週水曜日・第2第4日曜日' },
              ].map((item) => (
                <li key={item.label} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <span className="text-red-600 font-bold text-sm w-20 flex-shrink-0 pt-0.5">{item.label}</span>
                  <span className="text-gray-700 text-sm">{item.value}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/contact"
                className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                お問合せ・ご予約はこちら
              </Link>
            </div>
          </motion.div>

          {/* マップ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-200 flex items-center justify-center"
          >
            {/* Googleマップ埋め込み：実際の住所確定後に差し替え */}
            <div className="text-gray-400 text-center p-8">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm">Googleマップ<br />（住所確定後に設置）</p>
            </div>
            {/*
              住所確定後、以下のiframeに差し替え：
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
