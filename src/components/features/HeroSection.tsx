'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { HERO_SLIDES } from '@/constants/hero';
import type { HeroSlide } from '@/constants/hero';

// ---- スライドカード --------------------------------
interface HeroSlideCardProps {
  slide: HeroSlide;
  position: 'prev' | 'current' | 'next' | 'hidden';
}

const HeroSlideCard: React.FC<HeroSlideCardProps> = ({ slide, position }) => {
  const positionClasses = {
    prev: '-translate-x-full scale-95 opacity-50 z-0',
    current: '-translate-x-1/2 scale-100 opacity-100 z-20',
    next: 'translate-x-0 scale-95 opacity-50 z-0',
    hidden: '-translate-x-1/2 scale-95 opacity-0 z-0',
  };

  return (
    <div
      className={`absolute left-1/2 top-0 w-full max-w-5xl h-full transition-all duration-500 ease-out ${positionClasses[position]}`}
      style={{ pointerEvents: position === 'current' ? 'auto' : 'none' }}
    >
      <div className="relative h-full rounded-lg overflow-hidden shadow-2xl mx-4 md:mx-8">
        {/* 背景画像 */}
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover"
          style={{ objectPosition: 'center center' }}
          priority={position === 'current'}
          sizes="(max-width: 768px) 100vw, 1280px"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* テキストコンテンツ */}
        {position === 'current' && (
          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-14 text-white">
            <p className="inline-block bg-[--color-primary] px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-5 self-start">
              {slide.label}
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl mb-2">
              {slide.title}
            </h1>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl mb-6">
              {slide.subtitle}
            </h2>
            <p className="mb-8 max-w-xl text-sm md:text-base text-white/80 leading-relaxed">
              {slide.description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/#gallery" size="md" variant="primary">
                施工実績を見る
              </Button>
              <Button href="/contact" size="md" variant="outlineOnDark">
                お問い合わせ
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ---- ナビゲーションボタン --------------------------------
interface NavButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ direction, onClick }) => {
  const isLeft = direction === 'left';
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
      type="button"
      className={`absolute ${isLeft ? 'left-2 md:left-4' : 'right-2 md:right-4'} top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/35 backdrop-blur-sm text-white p-2 md:p-3 transition-all duration-200 rounded-full shadow-lg cursor-pointer`}
      aria-label={isLeft ? '前へ' : '次へ'}
    >
      <svg
        className="w-5 h-5 md:w-6 md:h-6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d={isLeft ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  );
};

// ---- メインコンポーネント --------------------------------
export const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const total = HERO_SLIDES.length;

  const prev = () => setCurrentIndex(i => (i === 0 ? total - 1 : i - 1));
  const next = () => setCurrentIndex(i => (i === total - 1 ? 0 : i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) next();
    else if (dist < -50) prev();
  };

  const getPosition = (index: number): 'prev' | 'current' | 'next' | 'hidden' => {
    if (index === currentIndex) return 'current';
    const prevIdx = currentIndex === 0 ? total - 1 : currentIndex - 1;
    const nextIdx = currentIndex === total - 1 ? 0 : currentIndex + 1;
    if (index === prevIdx) return 'prev';
    if (index === nextIdx) return 'next';
    return 'hidden';
  };

  return (
    <section className="relative bg-gray-900">
      <div
        className="relative h-[32rem] md:h-[38rem] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {HERO_SLIDES.map((slide, index) => {
          const position = getPosition(index);
          if (position === 'hidden') return null;
          return <HeroSlideCard key={slide.id} slide={slide} position={position} />;
        })}

        <NavButton direction="left" onClick={prev} />
        <NavButton direction="right" onClick={next} />
      </div>

      {/* ドットインジケーター */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            type="button"
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex ? 'bg-[--color-primary] w-8' : 'bg-white/40 hover:bg-white/70 w-1.5'
            }`}
            aria-label={`スライド${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
};
