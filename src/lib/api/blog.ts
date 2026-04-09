import { client } from '@/lib/microcms';
import type { BlogPost, BlogPostList } from '@/types/blog';

// Cache configuration: revalidate every 1 hour
export const revalidate = 3600;

// ブログ記事一覧を取得
export async function getBlogPosts(
  limit = 10,
  offset = 0
): Promise<BlogPostList> {
  try {
    const data = await client.get<BlogPostList>({
      endpoint: 'blog',
      queries: {
        limit,
        offset,
        orders: '-publishedAt',
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit,
    };
  }
}

// ブログ記事の詳細を取得
export async function getBlogPost(
  contentId: string
): Promise<BlogPost | null> {
  try {
    const data = await client.get<BlogPost>({
      endpoint: 'blog',
      contentId,
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch blog post ${contentId}:`, error);
    return null;
  }
}

// カテゴリーでフィルタリング
export async function getBlogPostsByCategory(
  category: string,
  limit = 10
): Promise<BlogPostList> {
  try {
    const data = await client.get<BlogPostList>({
      endpoint: 'blog',
      queries: {
        filters: `category[equals]${category}`,
        limit,
        orders: '-publishedAt',
      },
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch blog posts for category ${category}:`, error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit,
    };
  }
}

// 最新のブログ記事を取得（トップページ用）
export async function getLatestBlogPosts(limit = 3): Promise<BlogPost[]> {
  const data = await getBlogPosts(limit, 0);
  return data.contents;
}
