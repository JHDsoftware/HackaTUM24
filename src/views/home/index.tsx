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
import { articles } from '../../mock/articles';
import TrendingChips from 'components/Chips';

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

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className="sticky top-0 z-10 bg-transparent pb-4">
          
          <TrendingChips
            chips={trendingChips}
            selectedChipId={selectedChip}
            onChipSelect={setSelectedChip}
          />
        </div>
        <List articles={articles} />
        </div>
    </div>
  );
};
