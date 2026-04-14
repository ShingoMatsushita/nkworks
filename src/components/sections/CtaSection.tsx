'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function CtaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 bg-gray-900" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-red-500 font-en font-semibold text-sm tracking-[0.3em] uppercase mb-4">Contact Us</p>
          <h2 className="text-white text-3xl md:text-4xl font-black mb-4">
            お気軽にご相談ください
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            修理のご依頼・お見積もり・中古車のご購入など、<br className="hidden md:block" />
            どんな些細なことでも経験豊富なスタッフがお答えします。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            お問合せフォームへ
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
