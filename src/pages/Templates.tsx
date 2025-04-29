
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Search, Filter, Grid, List, FileText, LayoutTemplate, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TemplateCardProps {
  title: string;
  category: string;
  image: string;
  rating: number;
  usedCount: number;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, category, image, rating, usedCount }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-metamaster-gray-600 ml-2">{usedCount} uses</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1 bg-metamaster-primary hover:bg-metamaster-secondary">
            Use Template
          </Button>
          <Button size="sm" variant="outline" className="w-9 p-0">
            <Copy size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Templates: React.FC = () => {
  const templates = [
    {
      title: "E-commerce Sales Funnel",
      category: "Funnel",
      image: "https://placehold.co/600x400/1E88E5/FFFFFF?text=E-commerce",
      rating: 5,
      usedCount: 1245
    },
    {
      title: "Lead Magnet Funnel",
      category: "Funnel",
      image: "https://placehold.co/600x400/0D47A1/FFFFFF?text=Lead+Magnet",
      rating: 4,
      usedCount: 856
    },
    {
      title: "Coaching Application",
      category: "Funnel",
      image: "https://placehold.co/600x400/2A2A2A/FFFFFF?text=Coaching",
      rating: 5,
      usedCount: 723
    },
    {
      title: "SaaS Product Launch",
      category: "Campaign",
      image: "https://placehold.co/600x400/757575/FFFFFF?text=SaaS",
      rating: 4,
      usedCount: 512
    },
    {
      title: "Facebook Retargeting Ads",
      category: "Ad Set",
      image: "https://placehold.co/600x400/1E88E5/FFFFFF?text=Facebook",
      rating: 4,
      usedCount: 489
    },
    {
      title: "Real Estate Landing Page",
      category: "Page",
      image: "https://placehold.co/600x400/0D47A1/FFFFFF?text=Real+Estate",
      rating: 5,
      usedCount: 378
    }
  ];

  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Templates</h1>
            <p className="text-metamaster-gray-600">Ready-to-use templates to accelerate your marketing</p>
          </div>
          
          {/* Search & Filters */}
          <div className="bg-white rounded-xl shadow-md p-5 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-metamaster-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-metamaster-primary"
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center">
                  <Filter size={16} className="mr-2" /> Filters
                </Button>
                <div className="flex border border-gray-200 rounded-lg">
                  <Button variant="ghost" size="sm" className="h-9 px-3 rounded-r-none">
                    <Grid size={18} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9 px-3 rounded-l-none border-l border-gray-200">
                    <List size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Template Categories */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button className="bg-metamaster-primary hover:bg-metamaster-secondary whitespace-nowrap">
              All Templates
            </Button>
            <Button variant="outline" className="whitespace-nowrap">
              <LayoutTemplate size={16} className="mr-2" /> Funnels
            </Button>
            <Button variant="outline" className="whitespace-nowrap">
              <FileText size={16} className="mr-2" /> Landing Pages
            </Button>
            <Button variant="outline" className="whitespace-nowrap">
              Ad Campaigns
            </Button>
            <Button variant="outline" className="whitespace-nowrap">
              Email Sequences
            </Button>
          </div>
          
          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <TemplateCard 
                key={index}
                title={template.title}
                category={template.category}
                image={template.image}
                rating={template.rating}
                usedCount={template.usedCount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
