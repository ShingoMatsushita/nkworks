'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { HERO_SLIDES } from '@/constants/hero';
import type { HeroSlide } from '@/constants/hero';

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

  const isVisible = position !== 'hidden';

  return (
    <div
      className={`absolute left-1/2 top-0 w-full max-w-5xl h-full transition-all duration-500 ease-out ${positionClasses[position]}`}
      style={{
        pointerEvents: position === 'current' ? 'auto' : 'none',
      }}
    >
      <div className="relative h-full rounded-lg overflow-hidden shadow-2xl mx-4 md:mx-8">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            style={{ objectPosition: 'center center' }}
            priority={position === 'current'}
            sizes="(max-width: 768px) 100vw, 1280px"
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[--color-primary]/20 to-transparent" />

        {/* Content - Only visible on current slide */}
        {position === 'current' && (
          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 text-center text-white">
            <div className="mb-6 inline-block bg-[--color-primary] px-5 py-2 text-xs font-bold tracking-widest uppercase mx-auto">
              BIKE SHOP
            </div>

            <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block">{slide.title}</span>
              <span className="mt-2 block">{slide.subtitle}</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-base md:text-lg">
              {slide.description}
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="/services" size="md" variant="primary">
                サービス一覧
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

interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick }) => {
  const isLeft = direction === 'left';
  const ariaLabel = isLeft ? '前へ' : '次へ';
  const positionClass = isLeft ? 'left-2 md:left-4' : 'right-2 md:right-4';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`absolute ${positionClass} top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 transition-all duration-200 rounded-full shadow-lg cursor-pointer`}
      aria-label={ariaLabel}
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

export const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? HERO_SLIDES.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === HERO_SLIDES.length - 1 ? 0 : prevIndex + 1
    );
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const getSlidePosition = (index: number): 'prev' | 'current' | 'next' | 'hidden' => {
    if (index === currentIndex) return 'current';

    const prevIndex = currentIndex === 0 ? HERO_SLIDES.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === HERO_SLIDES.length - 1 ? 0 : currentIndex + 1;

    if (index === prevIndex) return 'prev';
    if (index === nextIndex) return 'next';
    return 'hidden';
  };

  return (
    <section className="relative bg-gray-900">
      {/* Hero Slides Container */}
      <div
        className="relative h-[32rem] md:h-[36rem] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* All Slides - Only render visible slides for performance */}
        {HERO_SLIDES.map((slide, index) => {
          const position = getSlidePosition(index);
          // Don't render hidden slides to improve performance
          if (position === 'hidden') return null;

          return (
            <HeroSlideCard
              key={slide.id}
              slide={slide}
              position={position}
            />
          );
        })}

        {/* Navigation Arrows */}
        <NavigationButton direction="left" onClick={goToPrevious} />
        <NavigationButton direction="right" onClick={goToNext} />
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            type="button"
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? 'bg-[--color-primary] w-8'
                : 'bg-white/50 hover:bg-white/75 w-2'
            }`}
            aria-label={`スライド${index + 1}へ${index === currentIndex ? '（現在表示中）' : ''}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
};
