import { ArticleMetadata, Author, ArticleDetails } from '../models/article';

export const articleDetails: Record<string, ArticleDetails> = {
  '5ebe0250bbc70a5cf708e66679409299': {
    metadata: {
      id: '5ebe0250bbc70a5cf708e66679409299',
      title: 'Python is No More The King of Data Science',
      subtitle: '5 Reasons Why Python is Losing Its Crown',
      publishDate: 'Oct 23, 2023',
      readingTime: '8 min',
      publication: 'Stackademic',
      isMemberOnly: true,
      content: `
# Python is No More The King of Data Science

For years, Python has reigned supreme in the data science realm. However, recent developments suggest its dominance might be waning. Here's why:

## 1. Rise of Specialized Languages
Julia and R have gained significant traction, offering better performance for specific use cases.

## 2. Performance Limitations
Despite improvements, Python's interpreted nature still poses performance challenges for large-scale data processing.

## 3. Growing Complexity
As data science evolves, the ecosystem has become increasingly fragmented...
      `,
      stats: {
        claps: 342,
        comments: 32,
        views: 7900,
        likes: 156
      },
      tags: ['Python', 'Data Science', 'Programming', 'Technology'],
      coverImage: 'https://example.com/images/python-data-science.jpg'
    },
    author: {
      address: '9NPjSbDECcyAhN2E7J2eM5fKaTpfQQTnX72RjjcettXV',
      name: 'Abdur Rahman',
      image: 'https://example.com/images/abdur-rahman.jpg',
      following: false,
      bio: 'Senior Data Scientist | Technical Writer | Python Expert',
      avatar: 'https://example.com/images/abdur-rahman.jpg',
      followers: 5200,
      following_count: 892,
      socialLinks: {
        twitter: 'https://twitter.com/abdurrahman',
        github: 'https://github.com/abdurrahman',
        linkedin: 'https://linkedin.com/in/abdurrahman'
      }
    }
  },
  '2': {
    metadata: {
      id: '2',
      title: 'Solana: The High-Performance Blockchain Revolutionizing Digital Transactions',
      subtitle: 'A must-have collection for every developer',
      publishDate: 'Oct 7, 2023',
      readingTime: '15 min',
      publication: 'Stackademic',
      isMemberOnly: false,
      content: `
Solana has emerged as one of the most prominent blockchain platforms in the cryptocurrency ecosystem, gaining attention for its remarkable speed, low transaction costs, and innovative technical architecture. Founded in 2017 by Anatoly Yakovenko, Solana was designed to address the scalability limitations that plagued earlier blockchain networks.
At its core, Solana's distinctive feature is its proof-of-history (PoH) consensus mechanism, which works in conjunction with proof-of-stake (PoS) to achieve unprecedented transaction processing capabilities. Unlike traditional blockchains that require nodes to agree on time, Solana's PoH creates a historical record that proves that an event has occurred at a specific moment in time, effectively creating a decentralized clock for the entire network.
The platform's technical prowess is evident in its performance metrics. Solana can theoretically process up to 65,000 transactions per second (TPS) with sub-second finality, while maintaining average transaction fees of less than $0.01. This remarkable efficiency has made it particularly attractive for decentralized finance (DeFi) applications, non-fungible token (NFT) marketplaces, and other blockchain-based services that require high throughput and low latency.
      `,
      stats: {
        claps: 256,
        comments: 48,
        views: 3800,
        likes: 120
      },
      tags: ['Python', 'Automation', 'Programming', 'Productivity'],
      coverImage: 'https://example.com/images/python-automation.jpg'
    },
    author: {
      address: '3NwSw9xrYf3kNdLCxZenbYgnuoZ3RL9C6EdVmXU7tSr3',
      name: 'Xiyue Zhang',
      image: 'https://example.com/images/abdur-rahman.jpg',
      following: false,
      bio: 'Senior Data Scientist | Technical Writer | Python Expert',
      avatar: 'https://example.com/images/abdur-rahman.jpg',
      followers: 5200,
      following_count: 892,
      socialLinks: {
        twitter: 'https://twitter.com/abdurrahman',
        github: 'https://github.com/abdurrahman',
        linkedin: 'https://linkedin.com/in/abdurrahman'
      }
    }
  }
};

export const getArticleById = (id: string): ArticleDetails | null => {
  return articleDetails[id] || null;
};