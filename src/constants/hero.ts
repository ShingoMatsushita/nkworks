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
    image: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/17e8fc642331440f9fc6705bc8f5d6dc/IMG_5504.jpg',
    title: '確かな技術で',
    subtitle: '最高のバイクライフを',
    description: 'バイク修理・整備から中古車販売まで、お客様のバイクライフを全力でサポート',
  },
  {
    id: 2,
    image: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/c8c1bcb527f44673a92f4d403ab17d06/IMG_2480.jpg',
    title: 'カスタム・チューニング',
    subtitle: 'お客様だけの一台を',
    description: 'ご要望に合わせた最高のカスタムバイクを実現します',
  },
  {
    id: 3,
    image: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/9aace8c40fc84aa3983d3d845cce684e/IMG_6278.jpg',
    title: '厳選された中古車',
    subtitle: '安心の品質保証',
    description: '整備済みの高品質な中古バイクを多数取り揃えています',
  },
  {
    id: 4,
    image: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/bb64331c40d44d53b98cecfdfc588f5e/IMG_5816.jpg',
    title: '修理・メンテナンス',
    subtitle: '一般整備から車検まで',
    description: '経験豊富な整備士が、あなたのバイクを丁寧にメンテナンス',
  },
] as const;
