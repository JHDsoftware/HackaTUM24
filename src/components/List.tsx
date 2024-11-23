import React, { useState } from 'react';
import { MessageCircle, Eye, Lock } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArticleOverview } from '../models/articleOverview';
import Image from 'next/image';
import { getRelativeTime } from 'utils/dateUtils';
import { articleService } from 'services/api';

interface SelectedArticle {
  source: string;
  summary: string;
}

interface ListProps {
  articles: ArticleOverview[];  // Your existing articles prop
  selectedArticles: SelectedArticle[];  // Current selection from parent
  onSelectionChange: (selected: SelectedArticle[]) => void;  // Callback to update parent
}


const List = ({ 
    articles = [],
    selectedArticles,
    onSelectionChange
}: ListProps) => {
    const router = useRouter();
    // const [selectedArticles, setSelectedArticles] = useState<SelectedArticle[]>([]);

    const handleSelect = (article: ArticleOverview) => {
        const isSelected = selectedArticles.some(
        item => item.source === article.content_link
        );
        
        const newSelection = isSelected
        ? selectedArticles.filter(item => item.source !== article.content_link)
        : [...selectedArticles, {
            source: article.content_link,
            summary: article.summary
            }];
        
        onSelectionChange(newSelection);
    };

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
      {articles.map((article, index) => (
        <div 
            key={article.news_id} 
            className="py-6"
            // onClick={() => handleArticleClick(article.news_id)}
            onClick={(e) => {
                // Only handle click if it's not on the select button
                if (!(e.target as HTMLElement).closest('button')) {
                    handleArticleClick('2');
                }
    }}
        >

       
            <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
  
                    <Image 
                        width={30}
                        height={30}
                        src="/profile.jpg"
                        alt="Author avatar"
                        className="rounded-full object-cover"
                        />
                
                    <div className="text-[#8F8F8F] text-xs font-semibold font-poppins break-words"> 
                        <span>{article.author}</span>
                    </div>
                </div>

                <button 
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors
                        ${selectedArticles.some(item => item.source === article.content_link)
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'text-blue-600 border border-blue-600 hover:bg-blue-50'
                        }`}
                    onClick={(e) => {
                        e.stopPropagation(); // Stop event from bubbling up
                        handleSelect(article);
                    }}
    >
        {selectedArticles.some(item => item.source === article.content_link) 
            ? 'Selected' 
            : 'Select'}
    </button>
            </div>
          
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
             
              <div className="text-[#D9D9D9] text-lg font-semibold font-poppins break-words w-full mb-4">
                {article.title}
              </div>

              {/* <p className="text-gray-600 text-sm gap-2 mb-4">
                {article.content_link}
              </p> */}
              
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-[#ED6646] text-xs font-semibold font-poppins">
                  <span>{getRelativeTime(article.published_at)}</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Eye size={12} />
                  <span>3800</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Lock size={12} />
                </div>
            </div>
                
              
            </div>
            
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 image-container">
              {/* Placeholder for article thumbnail */}
              <Image 
                width={96}
                height={96}
                src={article.image_links}
                alt="Article thumbnail"
                className="article-image"
                style={{ objectFit: 'cover' }}
              />
            </div>

          </div>

        {/* Divider */}
          {index !== articles.length - 1 && (
            <div style={{width: '100%', height: '1px', background: '#33363F'}}></div>
          )}
        </div>
        
      ))}
    </div>
  );
};

export default List;