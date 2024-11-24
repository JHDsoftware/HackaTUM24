// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';
import  List  from '../../components/List';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

// Mock
// import { articles } from '../../mock/articles';
import TrendingChips from 'components/Chips';
import { articleService } from 'services/api';
import { ArticleOverview } from 'models/articleOverview';
import router from 'next/router';

interface SelectedArticle {
  source: string;
  summary: string;
}

function extractHeadings(text) {
    const regex = /#([^\n]*)\n?/g;
    const matches = text.match(regex) || [];
    return matches.map(match => match.replace('#', '').trim());
}

function extractContent(text) {
    const firstNewlineIndex = text.indexOf('\n');
    if (firstNewlineIndex === -1) return '';
    return text.slice(firstNewlineIndex + 1).trim();
}


export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  const [selectedChip, setSelectedChip] = useState('1');

  const [selectedArticles, setSelectedArticles] = useState<SelectedArticle[]>([]);
  const [articles, setArticles] = useState<ArticleOverview[]>([]); // Your articles data

  const handleSelectionChange = (newSelection: SelectedArticle[]) => {
    setSelectedArticles(newSelection);
    // TODO: Add logic to handle selected articles
    console.log('Selected articles:', newSelection);
  };

  const handleGenerate = async () => {
    if (selectedArticles.length === 0) return;
    
    try {
      const result = await articleService.generateArticle(selectedArticles);
      const headings = extractHeadings(result);
      const content = extractContent(result);
      router.push({
        pathname: '/genArticle/generate',
        query: { 
          title: headings,
          content: content
        }
      });
    } catch (error) {
      console.error('Error generating article:', error);
    }
  };

  const generateNewArticle = async () => {
    try {
        
        const result = await articleService.generateArticle(selectedArticles);
        // console.log('Generated article:', result);
    } catch (error) {
        console.error('Error generating article:', error.message);
    }
  };
  
  const trendingChips = [
    { id: '1', label: 'Trending' },
    { id: '2', label: 'Trading' },
    { id: '3', label: 'Tech' },
    { id: '4', label: 'News' }
  ];


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const data = await articleService.getAllArticles();
        setArticles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

<div className="md:hero mx-auto p-2">
  <div className="md:hero-content flex flex-col max-w-4xl w-full relative min-h-screen pb-20">
    <div className="sticky top-0 z-10 px-4 py-1 bg-[radial-gradient(circle_farthest-side_at_50%_100%,rgba(1,9,18,0),rgba(1,6,14,0.6)_36%,rgba(1,14,29,0.6)_55%,rgba(49,18,93,0.4))]">
      <TrendingChips
        chips={trendingChips}
        selectedChipId={selectedChip}
        onChipSelect={setSelectedChip}
      />
    </div>
    <div className="px-6 py-2">
      <List 
        articles={articles} 
        selectedArticles={selectedArticles}
        onSelectionChange={handleSelectionChange}
      />
    </div>

    {/* Generate Button - Fixed at bottom */}
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-20">
      <button
        onClick={() => handleGenerate()}
        disabled={selectedArticles.length === 0}
        className={`
          px-8 py-3 rounded-full font-semibold shadow-lg
          transition-all duration-200 transform hover:scale-105
          ${selectedArticles.length === 0
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }
        `}
      >
        {selectedArticles.length > 0 
          ? `Generate from ${selectedArticles.length} articles`
          : 'Select articles to generate'
        }
      </button>
    </div>
  </div>
</div>
  );
};
