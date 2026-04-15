'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { Link } from '@/components/common/Link';
import { cn } from '@/lib/utils/cn';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'ホーム' },
    { href: '/contact', label: 'お問い合わせ' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-md">
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group" onClick={closeMenu}>
              <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                直樹<span className="text-[--color-primary]">バイク</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-[--color-primary] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-900 relative z-50"
              aria-label="メニュー"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Menu Content */}
          <div className="absolute top-16 left-0 right-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-lg">
            <div className="container-custom">
              <div className="flex flex-col py-4">
                {navItems.map((item) => (
                  <NextLink
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-[--color-primary] transition-colors"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NextLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
