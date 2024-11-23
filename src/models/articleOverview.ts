export interface ArticleOverview {
  id: string;
  title: string;
  description: string;
  author: string; //author id
  publication?: string;
  date: string;
  views: number;
  comments: number;
  isStarred?: boolean;
}

export interface ListProps {
  articles?: ArticleOverview[];
}