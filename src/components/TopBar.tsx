import React from 'react';
import { ChevronLeft, Bookmark } from 'lucide-react';

interface TopBarProps {
  category: string;
  onBackClick?: () => void;
  onSaveClick?: () => void;
  isSaved?: boolean;
}

export const TopBar = ({
  category = "Trending",
  onBackClick,
  onSaveClick,
  isSaved = false
}: TopBarProps) => {
  return (
    <div className="w-full bg-black px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Back Button */}
        <button 
          onClick={onBackClick}
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-800/50"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Category Name */}
        <h1 className="text-white text-lg font-medium">
          {category}
        </h1>

        {/* Save Button */}
        <button 
          onClick={onSaveClick}
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-800/50"
        >
          <Bookmark 
            size={24} 
            className={isSaved ? 'fill-white text-white' : ''} 
          />
        </button>
      </div>
    </div>
  );
};