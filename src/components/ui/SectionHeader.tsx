import React from 'react';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: React.ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`text-center mb-10 md:mb-14 ${className}`}>
      <p
        className={`text-xs font-bold tracking-widest uppercase mb-2 ${
          isDark ? 'text-[--color-primary]' : 'text-[--text-secondary]'
        }`}
      >
        {label}
      </p>
      <h2
        className={`text-2xl md:text-3xl font-bold ${
          isDark ? 'text-white' : 'text-[--text-primary]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm md:text-base leading-relaxed max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-[--text-secondary]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
