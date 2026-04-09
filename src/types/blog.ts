// Blog Post Types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  category: 'お知らせ' | 'イベント' | 'メンテナンス情報' | 'コラム';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostList {
  contents: BlogPost[];
  totalCount: number;
  offset: number;
  limit: number;
}
