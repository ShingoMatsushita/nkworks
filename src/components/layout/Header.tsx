'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/components/common/Link';
import { FaEnvelope, FaHouse } from 'react-icons/fa6';

export const Header: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'ホーム' },
    { href: '/contact', label: 'お問い合わせ' },
  ];

  // モバイル用：現在いないページへのボタンを表示
  const mobileButton = pathname === '/contact'
    ? { href: '/', label: 'ホームへ', Icon: FaHouse }
    : { href: '/contact', label: 'お問い合わせ', Icon: FaEnvelope };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-md">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="NK Works Motorcycle Shop" className="h-10 w-auto" />
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

          {/* Mobile Button */}
          <Link
            href={mobileButton.href}
            className="md:hidden flex items-center gap-1.5 px-4 py-1.5 text-sm font-bold bg-[--color-primary] text-black rounded hover:opacity-90 transition-opacity"
          >
            <mobileButton.Icon className="w-3.5 h-3.5" />
            {mobileButton.label}
          </Link>
        </div>
      </nav>
    </header>
  );
};
