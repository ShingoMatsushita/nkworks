import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactCTA } from '@/components/common/ContactCTA';

export const metadata: Metadata = {
  title: 'サービス紹介',
  description: '直樹バイクのサービス内容のご案内です。修理・整備、カスタム、中古車販売など。',
};

type ServiceItem = {
  name: string;
  price: string;
  description: string;
};

type Service = {
  title: string;
  description: string;
  image?: string;
  items: ServiceItem[];
};

export default function ServicesPage() {
  const services: Service[] = [
    {
      title: '修理・整備',
      description: '一般整備から車検対応まで、確かな技術で丁寧に対応いたします。国産車・輸入車問わず、あらゆるバイクの整備に対応しています。',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop',
      items: [
        { name: '一般整備', price: '¥5,000〜', description: 'オイル交換、タイヤ交換、ブレーキ調整、チェーン調整など定期メンテナンス' },
        { name: '車検対応', price: '¥30,000〜', description: '車検に必要な整備・点検を実施。代行手続きもお任せください' },
        { name: 'エンジンオーバーホール', price: '¥80,000〜', description: 'エンジンの完全分解・整備。異音や不調の根本解決' },
        { name: '緊急修理', price: '要相談', description: '故障による緊急対応。ツーリング先からのレッカー手配も可能' },
        { name: '定期点検', price: '¥3,000〜', description: '12ヶ月点検、24ヶ月点検に対応。点検記録簿発行' },
        { name: '電装系修理', price: '¥5,000〜', description: 'バッテリー交換、ライト・ウィンカー修理、配線トラブル対応' },
      ],
    },
    {
      title: 'カスタム・チューニング',
      description: 'お客様だけの一台を。ご要望に合わせたカスタムやチューニングを承ります。理想のバイクを一緒に作り上げましょう。',
      image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?q=80&w=2070&auto=format&fit=crop',
      items: [
        { name: 'マフラー交換', price: '¥10,000〜', description: '有名ブランドマフラー取り扱い。音質・パワー向上を実現（パーツ代別途）' },
        { name: 'ハンドル・ミラー交換', price: '¥5,000〜', description: 'セパハン、バーハンドル、ミラー交換で乗り心地向上（パーツ代別途）' },
        { name: 'カスタムペイント', price: '¥50,000〜', description: '全塗装・部分塗装対応。オリジナルカラーでの仕上げも可能' },
        { name: 'パーツ取り付け', price: '¥3,000〜', description: 'お持ち込みパーツの取り付け。ネット購入品も歓迎' },
        { name: 'サスペンション交換', price: '¥15,000〜', description: 'フロントフォーク、リアショック交換・セッティング（パーツ代別途）' },
        { name: 'ECUチューニング', price: '¥30,000〜', description: 'エンジン特性の変更でパワー・燃費向上を実現' },
      ],
    },
    {
      title: '中古車販売・買取',
      description: '厳選された中古バイクを取り揃えています。買取も積極的に行っています。全車両整備・保証付きで安心です。',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop',
      items: [
        { name: '中古車販売', price: '車両による', description: '厳選された中古バイクをご用意。全車整備・保証付き' },
        { name: 'バイク買取', price: '査定無料', description: '高価買取実施中。他店より高く買い取ります' },
        { name: '下取り対応', price: '要相談', description: '買い替え時の下取りOK。お得な乗り換えをサポート' },
        { name: '納車整備', price: '無料', description: '販売車両には必ず整備を実施。安心してお乗りいただけます' },
        { name: '車両探し代行', price: '¥10,000〜', description: 'ご希望の車両を全国から探してご提案します' },
        { name: '名義変更代行', price: '¥8,000〜', description: '面倒な手続きは全てお任せください' },
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop"
            alt="バイク修理"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Red Accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-[--color-primary]/20 to-transparent"></div>

        <div className="container-custom text-center relative z-10">
          <p className="text-xs md:text-sm font-bold mb-3 text-white/90 tracking-widest uppercase">
            Services
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            サービス紹介
          </h1>
        </div>
      </section>

      {/* Services List */}
      {services.map((service, index) => (
        <section
          key={service.title}
          className={`py-16 md:py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-[--color-accent]'}`}
        >
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <div className="text-3xl font-bold text-[--color-primary] mb-3">
                  0{index + 1}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[--text-primary]">
                  {service.title}
                </h2>
                <p className="text-base text-[--text-secondary] max-w-3xl mx-auto">
                  {service.description}
                </p>
              </div>

              {/* Service Image */}
              {service.image && (
                <div className="mb-10 overflow-hidden rounded-lg shadow-lg relative h-64 md:h-80">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1024px"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100"
                  >
                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <h3 className="text-base font-bold text-[--text-primary]">
                        {item.name}
                      </h3>
                      <span className="shrink-0 text-base font-bold text-[--color-primary] sm:text-right">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-[--text-secondary]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Note Section */}
      <section className="py-16 bg-[--color-accent]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-center text-[--text-primary]">
              ご利用にあたって
            </h3>
            <div className="bg-white p-8 shadow-md mb-8">
              <h4 className="text-base font-bold mb-4 text-[--text-primary]">料金・作業について</h4>
              <ul className="space-y-2 text-[--text-secondary] text-sm mb-6">
                <li>• 料金は目安です。作業内容により変動する場合があります</li>
                <li>• パーツ代は別途必要となります</li>
                <li>• お見積もりは無料です。お気軽にご相談ください</li>
                <li>• 作業前に必ず見積もりを提示し、ご了承いただいてから作業を開始します</li>
                <li>• 作業時間は内容により異なります。事前にご確認ください</li>
                <li>• カスタムパーツのお持ち込みも歓迎いたします</li>
              </ul>

              <h4 className="text-base font-bold mb-4 text-[--text-primary]">お支払い方法</h4>
              <p className="text-sm text-[--text-secondary] mb-2">
                現金、クレジットカード（VISA・MasterCard・JCB）、電子マネー（PayPay・楽天Pay）がご利用いただけます。
              </p>

              <h4 className="text-base font-bold mb-4 mt-6 text-[--text-primary]">保証について</h4>
              <p className="text-sm text-[--text-secondary]">
                当店で実施した整備・修理には3ヶ月または3,000kmの保証が付きます。販売車両には6ヶ月保証が付帯します。
              </p>
            </div>

            {/* Work Flow */}
            <div className="bg-white p-8 shadow-md">
              <h4 className="text-xl font-bold mb-6 text-center text-[--text-primary]">
                ご利用の流れ
              </h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[--color-primary] text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-[--text-primary] mb-1">お問い合わせ</h5>
                    <p className="text-sm text-[--text-secondary]">
                      お電話またはメールでご相談ください。症状や作業内容をお伺いします。
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[--color-primary] text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-[--text-primary] mb-1">ご来店・診断</h5>
                    <p className="text-sm text-[--text-secondary]">
                      バイクをお持ち込みいただき、詳細な診断を行います。
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[--color-primary] text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-[--text-primary] mb-1">お見積もり</h5>
                    <p className="text-sm text-[--text-secondary]">
                      作業内容と料金のお見積もりを提示します。ご納得いただけましたら作業開始です。
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[--color-primary] text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h5 className="font-bold text-[--text-primary] mb-1">作業・整備</h5>
                    <p className="text-sm text-[--text-secondary]">
                      熟練の整備士が丁寧に作業します。作業完了後、しっかりと点検・確認を行います。
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[--color-primary] text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h5 className="font-bold text-[--text-primary] mb-1">お引き渡し</h5>
                    <p className="text-sm text-[--text-secondary]">
                      作業内容をご説明の上、お引き渡しします。アフターフォローもお任せください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
