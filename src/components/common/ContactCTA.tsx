import React from 'react';
import { Button } from '@/components/common/Button';

export const ContactCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-20 border-t border-gray-200">
      <div className="container-custom text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[--text-primary]">
          お気軽にお問い合わせください
        </h2>
        <p className="text-base md:text-lg mb-8 leading-relaxed text-[--text-secondary] max-w-2xl mx-auto">
          バイクのことなら何でもご相談ください。<br />
          経験豊富なスタッフが丁寧に対応いたします。
        </p>
        <Button href="/contact" variant="primary" size="lg">
          お問い合わせをする
        </Button>
      </div>
    </section>
  );
};
