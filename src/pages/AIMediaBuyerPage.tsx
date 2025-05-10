
import React from 'react';
import AIMediaBuyer from '@/components/ai-tools/AIMediaBuyer';
import { useNavigate } from 'react-router-dom';

const AIMediaBuyerPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    navigate('/tools');
  };
  
  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <AIMediaBuyer onClose={handleClose} />
      </div>
    </div>
  );
};

export default AIMediaBuyerPage;
