export type GalleryCategory = '修理' | 'カスタム' | '中古車販売'

export interface GalleryItem {
  id: string
  title: string
  description: string
  image: {
    url: string
    width: number
    height: number
  }
  category: GalleryCategory
  publishedAt: string
}

export interface ContactFormData {
  name: string
  furigana: string
  email: string
  phone: string
  type: '修理・メンテナンス' | 'カスタム・チューニング' | '中古車・買取'
  message: string
  privacy: boolean
}
