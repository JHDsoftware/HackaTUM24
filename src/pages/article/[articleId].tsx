import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArticleView } from "../../views";
import { useEffect, useState } from "react";

const ArticlePage: NextPage = () => {
  const router = useRouter();
  const { articleId } = router.query;
  const [error, setError] = useState<string | null>(null);

  // Validate articleId format
  useEffect(() => {
    if (articleId) {
      // Example validation - adjust based on your articleId format
      if (!/^[a-zA-Z0-9-]+$/.test(articleId as string)) {
        setError("Invalid article ID format");
        // Optionally redirect to 404 or articles list
        router.push('/404');
      }
    }
  }, [articleId, router]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      <Head>
        <title>Article | {articleId}</title>
        <meta
          name="detailed article"
          content="article content"
        />
      </Head>
      <ArticleView articleId={articleId as string} />
    </div>
  );
};

export default ArticlePage;