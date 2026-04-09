import React from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils/cn';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'outlineOnDark';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
  fullWidth = false,
}) => {
  const baseClasses =
    'font-medium transition-all duration-200 inline-flex items-center justify-center text-center no-underline';

  const variantClasses = {
    primary:
      'bg-[#cc0000] hover:bg-[#990000] text-white',
    secondary:
      'bg-[#212121] hover:bg-[#000000] text-white',
    outline:
      'border border-[#cc0000] bg-white text-[#cc0000] hover:bg-[#cc0000] hover:text-white',
    outlineOnDark:
      'border border-white bg-white text-[#cc0000] hover:bg-gray-50',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded',
    md: 'px-6 py-2.5 text-sm rounded',
    lg: 'px-8 py-3 text-base rounded',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  const widthClass = fullWidth ? 'w-full' : '';

  const composed = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    widthClass,
    className
  );

  if (href && !disabled) {
    return (
      <NextLink href={href} className={composed}>
        {children}
      </NextLink>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={composed}
    >
      {children}
    </button>
  );
};
