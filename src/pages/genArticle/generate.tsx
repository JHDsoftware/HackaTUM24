import { useRouter } from 'next/router';
import { FC } from 'react';

interface GeneratedArticleProps {
  title?: string;
  content?: string;
}

const GeneratedArticle: FC<GeneratedArticleProps> = () => {
  const router = useRouter();
  const { title, content } = router.query;

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
        {/* Title */}
        <h1 className="text-3xl font-bold font-poppins text-[#D9D9D9] mb-8">
          {title || 'Generated Article'}
        </h1>

        {/* Main content */}
        <div className="text-[#8F8F8F] font-poppins leading-relaxed whitespace-pre-wrap">
          {content || 'Content is loading...'}
        </div>
      </article>
    </div>
  );
};

export default GeneratedArticle;