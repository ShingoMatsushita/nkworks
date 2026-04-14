'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const strengths = [
  {
    icon: '🔧',
    title: '認定メカニックによる確かな技術',
    description: '国家資格を持つ熟練メカニックが丁寧に対応。どんな車種・状態のバイクでもお任せください。',
  },
  {
    icon: '💴',
    title: '明朗会計・事前見積もり',
    description: '作業前に必ずお見積もりをご提示。追加費用が発生する場合も事前にご連絡します。',
  },
  {
    icon: '⚡',
    title: 'スピーディーな緊急対応',
    description: '急なトラブルにも柔軟に対応。お急ぎの修理もご相談ください。',
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-red-600 font-en font-semibold text-sm tracking-[0.3em] uppercase mb-3">About Us</p>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-black mb-4">直樹バイクについて</h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            創業15年以上、地域に根ざしたバイクショップとして多くのお客様のバイクライフをサポートしてきました。
          </p>
        </motion.div>

        {/* 実績数値 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-6 mb-16 bg-gray-900 rounded-2xl p-8 text-center"
        >
          {[
            { num: '15+', label: '創業年数' },
            { num: '8名', label: 'スタッフ数' },
            { num: '5名', label: '認定メカニック' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-red-500 font-en font-black text-4xl md:text-5xl">{item.num}</p>
              <p className="text-gray-400 text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* 3つの強み */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strengths.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
