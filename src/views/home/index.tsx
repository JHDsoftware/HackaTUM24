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

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  const [selectedChip, setSelectedChip] = useState('1');
  
  const trendingChips = [
    { id: '1', label: 'Trending' },
    { id: '2', label: 'Trading' },
    { id: '3', label: 'Tech' },
    { id: '4', label: 'News' }
  ];

  const [articles, setArticles] = useState<ArticleOverview[]>([]);
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
      <div className="md:hero-content flex flex-col max-w-4xl w-full">
        <div className="sticky top-0 z-10 px-4 py-1 bg-[radial-gradient(circle_farthest-side_at_50%_100%,rgba(1,9,18,0),rgba(1,6,14,0.6)_36%,rgba(1,14,29,0.6)_55%,rgba(49,18,93,0.4))]">
          
          <TrendingChips
            chips={trendingChips}
            selectedChipId={selectedChip}
            onChipSelect={setSelectedChip}
          />
        </div >
        <div className="px-6 py-2">
          <List articles={articles} />
        </div>
      </div>
    </div>
  );
};
