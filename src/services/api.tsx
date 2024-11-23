import axios from 'axios';
import { ArticleOverview } from 'models/articleOverview';

const API_BASE_URL = 'http://localhost:3307';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const articleService = {
  // Get all articles
  getAllArticles: async (): Promise<ArticleOverview[]> => {
    try {
      const response = await apiClient.get<ArticleOverview[]>('/articles');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch articles');
    }
  },

  // Generate new article from summaries
  generateArticle: async (summaries) => {
    try {
      const response = await apiClient.post('/generate-article', { summaries });
      const text = response.data["generated_article"];
      if (text) {
        return text;
      }
      throw new Error('Failed to generate article');
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to generate article');
    }
  }
};

// Example usage of the summaries format:
/*
const summaries = [
  {
    source: "https://example.com/article1",
    summary: "Summary of the first article"
  },
  {
    source: "https://example.com/article2",
    summary: "Summary of the second article"
  }
];
*/