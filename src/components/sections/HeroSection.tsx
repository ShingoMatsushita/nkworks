'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-red-950 opacity-90" />
        {/* 背景パターン */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-red-500 font-en font-semibold text-sm tracking-[0.3em] uppercase mb-4"
        >
          Naoki Bike Shop
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-4xl md:text-6xl font-black leading-tight mb-6"
        >
          確かな技術で<br />
          <span className="text-red-500">最高のバイクライフ</span>を
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed"
        >
          修理・メンテナンス・カスタム・中古車販売まで<br className="hidden md:block" />
          経験豊富なメカニックがあなたのバイクをサポートします
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded transition-colors text-lg"
          >
            お問合せはこちら
          </Link>
          <Link
            href="/#services"
            className="border-2 border-white/50 hover:border-white text-white font-bold px-8 py-4 rounded transition-colors text-lg"
          >
            サービスを見る
          </Link>
        </motion.div>
      </div>

      {/* スクロールインジケーター */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest font-en uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-white/30"
        />
      </motion.div>
    </section>
  )
}
