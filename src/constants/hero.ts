export interface HeroSlide {
  id: number;
  image: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
}

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: 1,
    image: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/17e8fc642331440f9fc6705bc8f5d6dc/IMG_5504.jpg',
    label: 'NK WORKS MOTORCYCLE SHOP',
    title: 'バイクを、もっと',
    subtitle: '好きになれる場所',
    description: 'レストア・車両製作から板金・塗装、サーキット活動まで。創業15年以上の技術でお客様のバイクライフを全力でサポートします。',
  },
  {
    id: 2,
    image: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/51a7e379ddc14d4eb7794598a3f1f44a/IMG_3355.jpg',
    label: 'RESTORE & CUSTOM BUILD',
    title: 'レストア・',
    subtitle: '車両製作',
    description: '旧車のフルレストアからオーダーメイド車両製作まで。お客様の思い描く理想の1台を丁寧に仕上げます。',
  },
  {
    id: 3,
    image: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/d0e296dbf4c1477b84b13d04b3d13985/paint-buff.jpeg',
    label: 'PAINT & FINISH',
    title: '板金・塗装・',
    subtitle: 'バフ仕上げ',
    description: '全塗装・板金からバフ仕上げ・ポリッシュ、サンドブラスト処理まで。細部まで妥協しない仕上がりをお届けします。',
  },
  {
    id: 4,
    image: 'https://images.microcms-assets.io/assets/5dd44bc9b2924bdfada852944b9a2723/3cabca613a234891806ac30a76a3988a/IMG_5810.jpg',
    label: 'CIRCUIT ACTIVITY',
    title: 'サーキットで',
    subtitle: '鍛えた技術を',
    description: 'NK Worksはレースフィールドにも積極参戦。実戦で培った知識と技術が、すべての整備・車両製作に還元されます。',
  },
] as const;
