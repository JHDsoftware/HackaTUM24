export interface Author {
  address: string;
  name: string;
  image: string;
  following?: boolean;
  bio?: string;
  avatar?: string;
  followers?: number;
  following_count?: number;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface ArticleMetadata {
  id: string;
  title: string;
  subtitle: string;
  publishDate: string;
  readingTime: string;
  publication?: string;
  isMemberOnly?: boolean;
  content?: string;
  coverImage?: string;
  tags?: string[];
  stats: {
    claps: number;
    comments: number;
    views?: number;
    likes?: number;
  };
}

export interface ArticleViewProps {
  articleId?: string;
}

export interface ArticleDetails {
  metadata: ArticleMetadata;
  author: Author;
}