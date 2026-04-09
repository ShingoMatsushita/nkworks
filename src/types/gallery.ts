// Gallery Item Types
export interface GalleryImage {
  url: string;
  width: number;
  height: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
  category: '修理' | 'カスタム' | '販売車両';
  beforeImage?: GalleryImage;
  afterImage?: GalleryImage;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItemList {
  contents: GalleryItem[];
  totalCount: number;
  offset: number;
  limit: number;
}
