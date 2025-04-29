
import React from 'react';
import { 
  BarChart, 
  Zap, 
  TrendingUp, 
  Search, 
  CheckCircle, 
  ArrowUpRight, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';

const StatCard: React.FC<{ title: string; value: string; change?: string; icon: React.ReactNode; isPositive?: boolean }> = ({
  title,
  value,
  change,
  icon,
  isPositive = true,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-metamaster-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-metamaster-primary">
          {icon}
        </div>
        {change && (
          <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{change}
            <ArrowUpRight size={14} className="ml-1" />
          </div>
        )}
      </div>
      <h3 className="text-metamaster-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-metamaster-gray-800">{value}</p>
    </div>
  );
};

const RecentAd: React.FC<{ title: string; image: string; engagement: string; date: string }> = ({
  title,
  image,
  engagement,
  date
}) => {
  return (
    <div className="flex items-center space-x-4 py-3">
      <div className="w-12 h-12 bg-metamaster-gray-200 rounded-lg overflow-hidden flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate text-metamaster-gray-800">{title}</h4>
        <div className="flex items-center space-x-2 text-xs text-metamaster-gray-600">
          <span>{engagement}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

const ActionCard: React.FC<{ title: string; description: string; buttonText: string; icon: React.ReactNode }> = ({
  title,
  description,
  buttonText,
  icon
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <div className="flex items-start mb-4 space-x-4">
        <div className="bg-metamaster-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-metamaster-primary flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-bold mb-2 text-metamaster-gray-800">{title}</h3>
          <p className="text-metamaster-gray-600 text-sm mb-4">{description}</p>
          <Button variant="outline" size="sm" className="flex items-center">
            {buttonText}
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-metamaster-gray-800">Welcome back, User</h1>
            <p className="text-metamaster-gray-600">Here's what's happening with your ad campaigns today.</p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Ads Saved" 
              value="127"
              change="12.8%"
              icon={<BarChart size={18} />}
            />
            <StatCard 
              title="Funnels Created" 
              value="24"
              change="4.3%"
              icon={<Zap size={18} />}
            />
            <StatCard 
              title="Total Leads" 
              value="1,485"
              change="28.5%"
              icon={<TrendingUp size={18} />}
            />
            <StatCard 
              title="Ad Searches" 
              value="347"
              change="5.2%"
              isPositive={false}
              icon={<Search size={18} />}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-4 text-metamaster-gray-800">Quick Actions</h3>
                <div className="space-y-4">
                  <Button className="w-full bg-metamaster-primary hover:bg-metamaster-secondary justify-start">
                    <Search size={18} className="mr-2" /> Search FB Ads Library
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-metamaster-gray-800">
                    <Zap size={18} className="mr-2" /> Create AI Campaign
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-metamaster-gray-800">
                    <TrendingUp size={18} className="mr-2" /> Track New Competitor
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-4 text-metamaster-gray-800">Getting Started</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-metamaster-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Create your account</span>
                  </div>
                  <div className="flex items-center text-sm text-metamaster-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Set up your profile</span>
                  </div>
                  <div className="flex items-center text-sm text-metamaster-gray-800">
                    <div className="w-5 h-5 rounded-full border-2 border-metamaster-gray-300 mr-3 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-metamaster-gray-300"></div>
                    </div>
                    <span>Connect Facebook Ad account</span>
                  </div>
                  <div className="flex items-center text-sm text-metamaster-gray-800">
                    <div className="w-5 h-5 rounded-full border-2 border-metamaster-gray-300 mr-3 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-metamaster-gray-300"></div>
                    </div>
                    <span>Create your first funnel</span>
                  </div>
                  <div className="flex items-center text-sm text-metamaster-gray-800">
                    <div className="w-5 h-5 rounded-full border-2 border-metamaster-gray-300 mr-3 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-metamaster-gray-300"></div>
                    </div>
                    <span>Invite your team members</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Middle Column - Actions & Reminders */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-metamaster-primary to-metamaster-secondary rounded-xl p-6 shadow-md text-white">
                <h3 className="font-bold text-lg mb-2">Discover Winning Ads</h3>
                <p className="opacity-80 mb-4">Analyze the top performing Facebook ads in your niche and leverage their strategies.</p>
                <Button className="bg-white text-metamaster-primary hover:bg-opacity-90">
                  Start Exploring
                </Button>
              </div>
              
              <div className="space-y-6">
                <ActionCard
                  title="Create Your First Funnel"
                  description="Use our drag & drop builder to create high-converting funnels in minutes."
                  buttonText="Build Funnel"
                  icon={<Zap size={18} />}
                />
                
                <ActionCard
                  title="Generate AI Campaign"
                  description="Answer a few questions and let AI create the perfect campaign structure."
                  buttonText="Start Generator"
                  icon={<BarChart size={18} />}
                />
              </div>
            </div>
            
            {/* Right Column - Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-metamaster-gray-800">Recently Saved Ads</h3>
                <Button variant="ghost" size="sm" className="text-metamaster-primary">
                  View All
                </Button>
              </div>
              
              <div className="space-y-1 divide-y divide-gray-100">
                <RecentAd
                  title="Fitness Program Ad"
                  image="https://placehold.co/100x100/1E88E5/FFFFFF?text=Ad"
                  engagement="High Engagement"
                  date="2 hours ago"
                />
                <RecentAd
                  title="E-commerce Product Carousel"
                  image="https://placehold.co/100x100/0D47A1/FFFFFF?text=Ad"
                  engagement="Medium Engagement"
                  date="Yesterday"
                />
                <RecentAd
                  title="SaaS Demo Video Ad"
                  image="https://placehold.co/100x100/2A2A2A/FFFFFF?text=Ad"
                  engagement="Very High Engagement"
                  date="2 days ago"
                />
                <RecentAd
                  title="Real Estate Lead Gen Ad"
                  image="https://placehold.co/100x100/757575/FFFFFF?text=Ad"
                  engagement="Medium Engagement"
                  date="3 days ago"
                />
                <RecentAd
                  title="Coaching Program Testimonial"
                  image="https://placehold.co/100x100/1E88E5/FFFFFF?text=Ad"
                  engagement="High Engagement"
                  date="5 days ago"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

