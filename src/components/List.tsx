import React from 'react';
import { MessageCircle, Eye, Lock } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ListProps } from '../models/articleOverview';
import Image from 'next/image';


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
      {articles.map((article, index) => (
        <div 
            key={article.id} 
            className="py-6"
            onClick={() => handleArticleClick(article.id)}
        >

        <div className="flex items-center gap-2 mb-4">
         <Image 
            width={30}
           height={30}
           src="/profile.jpg"
           alt="Author avatar"
           className="rounded-full object-cover"
            />
          
          <div className="text-[#8F8F8F] text-xs font-semibold font-poppins break-words w-full"> 
            <span>{article.author_id}</span>
          </div>

         </div>
          
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
             
              <div className="text-[#D9D9D9] text-lg font-semibold font-poppins break-words w-full mb-4">
                {article.title}
              </div>

              <p className="text-gray-600 text-sm gap-2 mb-4">
                {article.content}
              </p>
              
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-[#ED6646] text-xs font-semibold font-poppins">
                  <span>{article.published_at}</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Eye size={12} />
                  <span>{article.likes}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Lock size={12} />
                </div>
            </div>
                
              
            </div>
            
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
              {/* Placeholder for article thumbnail */}
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