import { client } from '@/lib/microcms';
import type { GalleryItem, GalleryItemList } from '@/types/gallery';

// Cache configuration: revalidate every 1 hour
export const revalidate = 3600;

// ギャラリー一覧を取得
export async function getGalleryItems(
  limit = 12,
  offset = 0
): Promise<GalleryItemList> {
  try {
    const data = await client.get<GalleryItemList>({
      endpoint: 'gallery',
      queries: {
        limit,
        offset,
        orders: '-publishedAt',
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch gallery items:', error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit,
    };
  }
}

// ギャラリー詳細を取得
export async function getGalleryItem(
  contentId: string
): Promise<GalleryItem | null> {
  try {
    const data = await client.get<GalleryItem>({
      endpoint: 'gallery',
      contentId,
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch gallery item ${contentId}:`, error);
    return null;
  }
}

// カテゴリーでフィルタリング
export async function getGalleryItemsByCategory(
  category: string,
  limit = 12
): Promise<GalleryItemList> {
  try {
    const data = await client.get<GalleryItemList>({
      endpoint: 'gallery',
      queries: {
        filters: `category[equals]${category}`,
        limit,
        orders: '-publishedAt',
      },
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch gallery items for category ${category}:`, error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit,
    };
  }
}

// 最新のギャラリーを取得（トップページ用）
export async function getLatestGalleryItems(limit = 6): Promise<GalleryItem[]> {
  const data = await getGalleryItems(limit, 0);
  return data.contents;
}
