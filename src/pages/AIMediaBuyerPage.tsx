
import React from 'react';
import Sidebar from '@/components/Sidebar';
import AIMediaBuyerEnhanced from '@/components/ai-tools/AIMediaBuyerEnhanced';

const AIMediaBuyerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">AI Media Buyer</h1>
            <p className="text-metamaster-gray-600">Create optimized ad campaigns using AI algorithms trained on high-performing campaigns.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <AIMediaBuyerEnhanced />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMediaBuyerPage;
