'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl tracking-wider font-en">
          NAOKI BIKE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#services" className="text-white/80 hover:text-white text-sm transition-colors">
            サービス
          </Link>
          <Link href="/#gallery" className="text-white/80 hover:text-white text-sm transition-colors">
            ギャラリー
          </Link>
          <Link href="/#access" className="text-white/80 hover:text-white text-sm transition-colors">
            アクセス
          </Link>
          <Link
            href="/contact"
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2 rounded transition-colors"
          >
            お問合せ
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 px-4 py-4 flex flex-col gap-4">
          <Link href="/#services" className="text-white/80 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>サービス</Link>
          <Link href="/#gallery" className="text-white/80 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>ギャラリー</Link>
          <Link href="/#access" className="text-white/80 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>アクセス</Link>
          <Link href="/contact" className="bg-red-600 text-white text-sm font-medium px-5 py-2 rounded text-center" onClick={() => setMenuOpen(false)}>お問合せ</Link>
        </div>
      )}
    </header>
  )
}
