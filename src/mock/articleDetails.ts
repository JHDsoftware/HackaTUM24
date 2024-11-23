import { ArticleMetadata, Author, ArticleDetails } from '../models/article';

export const articleDetails: Record<string, ArticleDetails> = {
  '1': {
    metadata: {
      id: '1',
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
      id: 'ar123',
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
      title: '20 Python Scripts To Automate Your Daily Tasks',
      subtitle: 'A must-have collection for every developer',
      publishDate: 'Oct 7, 2023',
      readingTime: '15 min',
      publication: 'Stackademic',
      isMemberOnly: false,
      content: `
# 20 Python Scripts To Automate Your Daily Tasks

Automation is the key to productivity. Here are 20 Python scripts that will make your life easier:

## 1. File Organization Script
\`\`\`python
import os
import shutil

def organize_files(directory):
    for filename in os.listdir(directory):
        # Organization logic here
        pass
\`\`\`

## 2. Automated Backup Script
...
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
      id: 'ar123',
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
  }
};

export const getArticleById = (id: string): ArticleDetails | null => {
  return articleDetails[id] || null;
};