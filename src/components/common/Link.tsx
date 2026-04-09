import React from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils/cn';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'nav' | 'footer';
  external?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className = '',
  variant = 'default',
  external = false,
}) => {
  const variantClasses = {
    default: 'text-[--color-primary] hover:text-[--color-primary-dark] transition-colors duration-200',
    nav: 'text-gray-900 hover:text-[--color-primary] transition-colors duration-200 font-medium',
    footer: 'text-gray-400 hover:text-white transition-colors duration-200',
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(variantClasses[variant], className)}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={cn(variantClasses[variant], className)}>
      {children}
    </NextLink>
  );
};
