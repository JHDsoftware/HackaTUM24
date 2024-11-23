import React from 'react';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Play, Share2, MoreHorizontal } from 'lucide-react';
import { useRouter } from "next/router";
import { getArticleById } from '../../mock/articleDetails';
import { ArticleMetadata, Author, ArticleViewProps, ArticleDetails } from '../../models/article';
import { ContentLock } from 'components/ContentLock';
import { SendTransaction } from 'components/SendTransaction';
import { TopBar } from 'components/TopBar';

// Header Component
const ArticleHeader = ({ metadata }: { metadata: ArticleMetadata }) => {
  return (
    <header className="max-w-2xl mx-auto pt-8 px-4">
      {metadata.isMemberOnly && (
        <div className="flex items-center space-x-2 text-yellow-500 mb-4">
          <span className="text-sm">✦ Member-only story</span>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-2 text-[#D9D9D9]">
        {metadata.title}
      </h1>
      <h2 className="text-xl text-[#5D5D5D] mb-6">
        {metadata.subtitle}
      </h2>
    </header>
  );
};

// Author Info Component
const AuthorInfo = ({ author, metadata }: { author: Author; metadata: ArticleMetadata }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src="/profile.jpg"
            alt={author.name}
            width={50}
            height={50}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{author.name}</span>
              <button className="text-green-600 text-sm font-medium">
                Follow
              </button>
            </div>
            <div className="text-sm text-gray-500">
              <span>Published in {metadata.publication}</span>
              <span className="mx-1">·</span>
              <span>{metadata.readingTime} read</span>
              <span className="mx-1">·</span>
              <span>{metadata.publishDate}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Share2 size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Article Actions Component
const ArticleActions = ({ onListen, onShare }: { onListen?: () => void; onShare?: () => void }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 mb-8">
      <div className="flex items-center space-x-4">
        <button 
          className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300"
          onClick={onListen}
        >
          <Play size={16} />
          <span>Listen</span>
        </button>
        <button 
          className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300"
          onClick={onShare}
        >
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

// Main Content Component
const ArticleContent = ({ children, isPreview = true, toAddr, setIsPreview }: { 
    children: string, 
    isPreview?: boolean,
     toAddr?: string, 
     setIsPreview?: (isPreview: boolean) => void 
}) => {
    const previewContent = `Let's be very clear: I do think Python is the GOAT. I don't deny that. Yet, it doesn't come without flaws either. It might not lose its place in one night, but there are cracks forming.

Edit: Hey everyone, this article reflects my personal opinion, and I fully respect that others may disagree. Healthy debate is welcome — after all, different perspectives are what drive progress!`;

  const fullContent = `[Full article content here...]`;
  return (
    <>
    <article className="max-w-2xl mx-auto px-4 prose prose-lg prose-headings:text-[#D9D9D9] prose-p:text-[#D9D9D9]">
        <ContentLock 
            isPreview={isPreview} 
            previewContent={previewContent}
            lockedContent={children}
        />
    </article>
    {isPreview && <div className="space-y-3 w-full max-w-lg">
        <SendTransaction 
        toAddr={toAddr} 
        onSuccess={() => setIsPreview(false)}
        />  
    </div>}
    </>
  );
};

// Stats Component
const ArticleStats = ({ stats }: { stats: ArticleMetadata['stats'] }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 border-t border-gray-200 mt-8">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-1">
          <span>👏</span>
          <span className="text-sm text-gray-500">{stats.claps}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>💬</span>
          <span className="text-sm text-gray-500">{stats.comments}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>💬</span>
          <span className="text-sm text-gray-500">{stats.views}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>💬</span>
          <span className="text-sm text-gray-500">{stats.likes}</span>
        </div>
      </div>
    </div>
  );
};


// Main Page Component
export const ArticleView: FC<ArticleViewProps> = ({ articleId }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<ArticleMetadata | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);

  const [isPreview, setIsPreview] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

const handleBackClick = () => {
    // Handle navigation
    router.back();
    console.log('Back clicked');
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

//   useEffect(() => {
//     const fetchArticle = async () => {
//       if (!articleId) return;
      
//       try {
//         setIsLoading(true);
//         // Example fetch call
//         const response = await fetch(`/articles/${articleId}`);
        
//         if (!response.ok) {
//           if (response.status === 404) {
//             throw new Error("Article not found");
//           }
//           throw new Error("Failed to fetch article");
//         }

//         const data = await response.json();
//         setMetadata(data.metadata);
//         setAuthor(data.author);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//         // Optionally redirect after a delay
//         setTimeout(() => {
//           router.push('/article');
//           }, 3000);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchArticle();
//   }, [articleId, router]);

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <div className="text-red-500 text-xl mb-4">
//           {error}
//         </div>
//         <div className="text-gray-600">
//           Redirecting to articles list...
//         </div>
//       </div>
//     );
//   }

//    // No data state
//   if (!metadata || !author) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-gray-600">
//           No article data available
//         </div>
//       </div>
//     );
//   }

  // MOCK DATA
  const article = getArticleById(articleId);

  if (!article) {
    return <div>Article not found</div>;
  }


  return (
    <div className="min-h-screen bg-black">
        <TopBar 
            category="Trending"
            onBackClick={handleBackClick}
            onSaveClick={handleSaveClick}
            isSaved={isSaved}
        />
      <ArticleHeader metadata={article.metadata} />
      <AuthorInfo author={article.author} metadata={article.metadata} />
      <ArticleActions />
      <ArticleContent 
        isPreview={isPreview} 
        toAddr={article.author.address}
        setIsPreview={setIsPreview}
      >
        {/* Article content goes here */}
       
          {article.metadata.content}
        
      </ArticleContent>
      <ArticleStats stats={article.metadata.stats} />
    </div>
  );
};

export default ArticleView;