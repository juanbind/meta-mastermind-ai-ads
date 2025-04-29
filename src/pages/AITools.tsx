
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Zap, Brain, Sparkles, FileCode, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, buttonText }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-start space-x-4">
        <div className="bg-metamaster-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-metamaster-primary flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2 text-metamaster-gray-800">{title}</h3>
          <p className="text-metamaster-gray-600 mb-4">{description}</p>
          <Button className="bg-metamaster-primary hover:bg-metamaster-secondary">
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

const AITools: React.FC = () => {
  const tools = [
    {
      title: "Ad Copy Generator",
      description: "Create compelling ad copy that converts using our advanced AI model trained on high-performing ads.",
      icon: <MessageSquare size={24} />,
      buttonText: "Generate Copy"
    },
    {
      title: "Campaign Analyzer",
      description: "Get AI-powered insights and recommendations to improve your campaign performance.",
      icon: <Brain size={24} />,
      buttonText: "Analyze Campaign"
    },
    {
      title: "Creative Generator",
      description: "Generate scroll-stopping ad creative concepts based on your product and target audience.",
      icon: <Sparkles size={24} />,
      buttonText: "Generate Creative"
    },
    {
      title: "Funnel Optimizer",
      description: "AI analysis of your funnel to identify bottlenecks and suggest optimizations.",
      icon: <Zap size={24} />,
      buttonText: "Optimize Funnel"
    },
    {
      title: "Landing Page Builder",
      description: "Generate high-converting landing pages with AI-optimized copy and layout.",
      icon: <FileCode size={24} />,
      buttonText: "Build Page"
    }
  ];

  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">AI Tools</h1>
            <p className="text-metamaster-gray-600">Leverage AI to supercharge your marketing campaigns</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <ToolCard 
                key={index}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                buttonText={tool.buttonText}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITools;
