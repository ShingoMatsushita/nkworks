import React from 'react';
import { Link } from '@/components/common/Link';
import { FaInstagram, FaXTwitter, FaFacebook } from 'react-icons/fa6';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: 'ホーム' },
    { href: '/contact', label: 'お問い合わせ' },
  ];

  const socialLinks = [
    {
      href: 'https://instagram.com',
      label: 'Instagram',
      Icon: FaInstagram,
      bgColor: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]',
      hoverColor: 'hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]'
    },
    {
      href: 'https://x.com',
      label: 'X (Twitter)',
      Icon: FaXTwitter,
      bgColor: 'bg-black',
      hoverColor: 'hover:bg-gray-900'
    },
    {
      href: 'https://facebook.com',
      label: 'Facebook',
      Icon: FaFacebook,
      bgColor: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#0e6ad8]'
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="NK Works Motorcycle Shop" className="h-12 w-auto" />
            </div>
            <p className="text-gray-300 mb-3 text-sm">
              バイク修理・整備、中古車販売
            </p>
            <p className="text-sm text-gray-300">
              営業時間: 9:00 - 18:00<br />
              定休日: なし
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4">リンク</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} variant="footer" className="hover:text-[--color-primary] text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-base font-bold mb-4">SNS</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const { Icon, bgColor, hoverColor } = social;
                return (
                  <Link
                    key={social.href}
                    href={social.href}
                    external
                    className={`w-11 h-11 flex items-center justify-center ${bgColor} ${hoverColor} rounded-full hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl`}
                    aria-label={social.label}
                  >
                    <span className="sr-only">{social.label}</span>
                    <Icon className="w-6 h-6 text-white" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} 直樹バイク. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
