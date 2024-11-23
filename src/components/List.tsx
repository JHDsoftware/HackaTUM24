import React from 'react';
import { MessageCircle, Eye, Lock } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ListProps, ArticleOverview } from '../models/articleOverview';
import Image from 'next/image';
import { getRelativeTime } from 'utils/dateUtils';


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

  const handleSelect = (article: ArticleOverview) => {
    console.log('Selected article:', article);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {articles.map((article, index) => (
        <div 
            key={article.news_id} 
            className="py-6"
            // onClick={() => handleArticleClick(article.news_id)}
            onClick={() => handleArticleClick('2')}
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
                    className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                    onClick={() => handleSelect(article)}
                >
                    Select
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