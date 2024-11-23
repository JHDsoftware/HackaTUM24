export interface ArticleOverview {
  news_id: string;
  title: string;
  content_link: string;
  summary: string;
  author: string; //author id
  published_at: string;
  rss_source: string;
  image_links: string;
  likes: number;
  category: string;
  score: number;
}

export interface ListProps {
  articles?: ArticleOverview[];
}