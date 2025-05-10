
import React from 'react';
import Sidebar from '@/components/Sidebar';
import AdCopyGenerator from '@/components/ai-tools/AdCopyGenerator';
import { FileText } from 'lucide-react';

const AdCopyGeneratorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-metamaster-gray-500 mb-2">
              <span>AI Tools</span>
              <span>/</span>
              <span className="font-medium text-metamaster-gray-700">Ad Copy Generator</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-metamaster-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-metamaster-primary" />
              </div>
              <h1 className="text-2xl font-bold text-metamaster-gray-800">Ad Copy Generator</h1>
            </div>
            <p className="text-metamaster-gray-600">Create high-converting ad copy for different platforms</p>
          </div>
          
          <AdCopyGenerator />
        </div>
      </div>
    </div>
  );
};

export default AdCopyGeneratorPage;
