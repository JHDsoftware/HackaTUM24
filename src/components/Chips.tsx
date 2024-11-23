import React from 'react';

interface ChipProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const TrendingChip = ({ label, isSelected = false, onClick }: ChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-colors
        ${isSelected 
          ? 'bg-white text-black' 
          : 'bg-transparent text-gray-300 border border-gray-700 hover:border-gray-500'
        }
      `}
    >
      {label}
    </button>
  );
};

interface TrendingChipsProps {
  chips?: Array<{
    id: string;
    label: string;
  }>;
  selectedChipId?: string;
  onChipSelect?: (id: string) => void;
}

const TrendingChips = ({ 
  chips = [
    { id: '1', label: 'Trending' },
    { id: '2', label: 'Trading' },
    { id: '3', label: 'Tech' },
    { id: '4', label: 'New' }
  ],
  selectedChipId = '1',
  onChipSelect 
}: TrendingChipsProps) => {
  return (
    <div className="w-full bg-transparent px-4 py-3">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {chips.map((chip) => (
          <TrendingChip
            key={chip.id}
            label={chip.label}
            isSelected={chip.id === selectedChipId}
            onClick={() => onChipSelect?.(chip.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Optional: Add the no-scrollbar utility to your Tailwind config
const styles = `
  @layer utilities {
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-x: hidden;
      scrollbar-width: none;
    }
  }
`;

export default TrendingChips;