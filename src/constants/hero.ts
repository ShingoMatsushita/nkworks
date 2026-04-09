export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop',
    title: '確かな技術で',
    subtitle: '最高のバイクライフを',
    description: 'バイク修理・整備から中古車販売まで、お客様のバイクライフを全力でサポート',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop',
    title: 'カスタム・チューニング',
    subtitle: 'お客様だけの一台を',
    description: 'ご要望に合わせた最高のカスタムバイクを実現します',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=2070&auto=format&fit=crop',
    title: '厳選された中古車',
    subtitle: '安心の品質保証',
    description: '整備済みの高品質な中古バイクを多数取り揃えています',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop',
    title: '修理・メンテナンス',
    subtitle: '一般整備から車検まで',
    description: '経験豊富な整備士が、あなたのバイクを丁寧にメンテナンス',
  },
] as const;
