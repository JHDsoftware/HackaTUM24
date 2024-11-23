import React from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { SendTransaction } from '../components/SendTransaction';

interface ContentLockProps {
  isPreview?: boolean;
  previewContent: string;
  lockedContent: string;
}

export const ContentLock = ({ isPreview = true, previewContent, lockedContent }: ContentLockProps) => {
//   const content = isPreview ? previewContent : fullContent;

  return (
    <div className="relative">
    {/* Article Content Preview */}
    <div className={`prose prose-lg max-w-2xl mx-auto px-4 `}>
        <p>{previewContent}</p>
    </div>
      {/* Locked Article Content */}
      <div className={`prose prose-lg max-w-2xl mx-auto px-4 ${isPreview ? 'blur-sm' : ''}`}>
        <p>{lockedContent}</p>
      </div>

      {/* Membership Overlay */}
      {isPreview && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/90 to-white">
          <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center text-center">
            

            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-sm w-60 mb-8">
              <p className="text-[#D9D9D9] mb-6">
                The author made this story available to paid users only. 
              </p>
            </div>

          
            {/* Action Buttons */}
            {/* <div className="space-y-3 w-full max-w-lg">
               <SendTransaction toAddr={toAddr} />  
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};