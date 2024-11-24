import { useRouter } from 'next/router';
import { FC, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface GeneratedArticleProps {
  titles?: string[];
  content?: string;
}

const GeneratedArticle: FC<GeneratedArticleProps> = () => {
  const router = useRouter();
  const { title, content } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    if (title && content) {
      const parsedTitles = Array.isArray(title) ? title : [title];
      setTitles(parsedTitles);
      setIsLoading(false);
    }
  }, [title, content]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-8 text-[#8F8F8F] hover:text-white transition-colors flex items-center gap-2"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>

      {/* Article Content */}
      <article className="prose prose-invert max-w-none">
        {/* Main Title */}
        {titles.length > 0 && (
          <h1 className="text-3xl font-bold font-poppins text-[#D9D9D9] mb-8">
            {titles[0]}
          </h1>
        )}

        {/* Article Image */}
       
          <div className="mb-8">
            <img 
              src="/e-car.jpg" 
              alt={titles[0] || 'Article image'}
              className="w-full h-auto rounded-lg object-cover max-h-[400px]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
          />
        </div>
    

        {/* Markdown Content */}
        <div className="text-[#8F8F8F] font-poppins leading-relaxed">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            className="markdown-content"
            components={{
              // Customize markdown components
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-[#D9D9D9] mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-[#D9D9D9] mt-6 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-medium text-[#D9D9D9] mt-4 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 text-[#8F8F8F]" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-[#33363F] pl-4 italic my-4" {...props} />
              ),
              // ... existing code ...
              code: ({node, inline, ...props}: {node: any, inline?: boolean} & React.HTMLProps<HTMLElement>) => (
                inline 
                  ? <code className="bg-[#1E1E1E] px-1 rounded" {...props} />
                  : <code className="block bg-[#1E1E1E] p-4 rounded my-4" {...props} />
              ),
// ... existing code ...
            }}
          >
            {typeof content === 'string' ? content : ''}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default GeneratedArticle;