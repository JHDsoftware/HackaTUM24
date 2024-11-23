export interface ArticleOverview {
  id: string;
  title: string;
  content: string;
  author_id: string; //author id
  published_at: string;
  image_url: string;
  likes: number;
  category: string;
}

export interface ListProps {
  articles?: ArticleOverview[];
}