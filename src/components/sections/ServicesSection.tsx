'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const services = [
  {
    title: '修理・メンテナンス',
    titleEn: 'Repair & Maintenance',
    description: '一般整備から緊急修理、車検・法定点検まで幅広く対応。エンジンオーバーホールなど大型修理もお任せください。',
    price: '¥5,000〜',
    items: ['一般整備・点検', 'エンジンオーバーホール', '車検・法定点検', '緊急修理対応'],
    color: 'from-red-600 to-red-800',
  },
  {
    title: 'カスタム・チューニング',
    titleEn: 'Custom & Tuning',
    description: 'マフラー交換からカスタムペイントまで、あなたの理想のバイクを実現します。',
    price: '¥10,000〜',
    items: ['マフラー・排気系', 'サスペンション調整', 'カスタムペイント', '電装・ライト類'],
    color: 'from-gray-700 to-gray-900',
  },
  {
    title: '中古車販売・買取',
    titleEn: 'Used Bike Sales',
    description: '全車保証付き・無料点検でお渡しします。買取・下取りも随時受け付けています。',
    price: '要相談',
    items: ['全車保証付き', '無料点検・整備', '各種ローン対応', '買取・下取り歓迎'],
    color: 'from-red-700 to-gray-900',
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-red-600 font-en font-semibold text-sm tracking-[0.3em] uppercase mb-3">Services</p>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-black mb-4">サービス一覧</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            バイクに関するあらゆるご要望にお応えします。まずはお気軽にご相談ください。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              {/* カラーヘッダー */}
              <div className={`bg-gradient-to-br ${service.color} p-6 text-white`}>
                <p className="font-en text-xs tracking-widest opacity-70 uppercase mb-1">{service.titleEn}</p>
                <h3 className="font-black text-xl">{service.title}</h3>
                <p className="mt-2 text-2xl font-en font-bold">{service.price}</p>
              </div>

              {/* 本文 */}
              <div className="p-6">
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block text-center border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
                >
                  詳しく問い合わせる
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
