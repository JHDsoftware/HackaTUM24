import type { NextPage } from "next";
import Head from "next/head";
import { ArticleView } from "../../views"; // You'll need to create this view

const ArticlesPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Articles</title>
        <meta
          name="description"
          content="List of articles"
        />
      </Head>
      <ArticleView />
    </div>
  );
};

export default ArticlesPage;