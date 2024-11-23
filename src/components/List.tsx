import React from 'react';
import { MessageCircle, Eye, Star } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ArticleOverview {
  id: string;
  title: string;
  description: string;
  author: string;
  publication?: string;
  date: string;
  views: number;
  comments: number;
  isStarred?: boolean;
}

interface ListProps {
  articles?: ArticleOverview[];
}

const List = ({ articles = [] }: ListProps) => {
const router = useRouter();

  if (!articles || articles.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto py-8 text-center text-gray-500">
        No articles available
      </div>
    );
  }

  const handleArticleClick = (articleId: string) => {
    router.push(`/article/${articleId}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {articles.map((article) => (
        <div 
            key={article.id} 
            className="border-b border-gray-200 py-6"
            onClick={() => handleArticleClick(article.id)}
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            {article.publication && (
              <>
                <span>In {article.publication}</span>
                <span className="px-1">·</span>
              </>
            )}
            <span>by {article.author}</span>
          </div>
          
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2 className="text-xl font-bold mb-1 text-gray-900">
                {article.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {article.description}
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{article.date}</span>
                <div className="flex items-center space-x-1">
                  <Eye size={16} />
                  <span>{article.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle size={16} />
                  <span>{article.comments}</span>
                </div>
                {article.isStarred && (
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
              {/* Placeholder for article thumbnail */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;