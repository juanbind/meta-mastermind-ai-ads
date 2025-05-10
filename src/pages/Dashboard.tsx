
import React from 'react';
import { 
  BarChart, 
  Zap, 
  TrendingUp, 
  Search, 
  CheckCircle, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-yellow-100 w-10 h-10 rounded-lg flex items-center justify-center text-yellow-500">
          {icon}
        </div>
        {change && (
          <div className="flex items-center text-sm font-medium text-green-500">
            {change}
            {change !== '+0%' && <span className="ml-1">↑</span>}
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

const ActionCard = ({ title, description, buttonText, icon, onClick }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start mb-4 space-x-4">
        <div className="bg-yellow-100 w-10 h-10 rounded-lg flex items-center justify-center text-yellow-500 flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center border border-gray-200"
            onClick={onClick}
          >
            {buttonText}
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:ml-[220px] pt-6">
        <div className="container mx-auto px-4 pb-12">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-gray-800">Welcome back, User</h1>
            <p className="text-gray-600">Here's what's happening with your ad campaigns today.</p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Total Ads Saved" 
              value="0"
              change="+0%"
              icon={<BarChart size={18} />}
            />
            <StatCard 
              title="Funnels Created" 
              value="0"
              change="+0%"
              icon={<Zap size={18} />}
            />
            <StatCard 
              title="Total Leads" 
              value="0"
              change="+0%"
              icon={<TrendingUp size={18} />}
            />
            <StatCard 
              title="Ad Searches" 
              value="0"
              change="+0%"
              icon={<Search size={18} />}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column - Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-yellow-400 hover:bg-yellow-500 justify-start text-gray-800 border-none"
                    onClick={() => navigate('/ads-library')}
                  >
                    <Search size={18} className="mr-2" /> Search FB Ads Library
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-gray-700 border border-gray-200 bg-white hover:bg-gray-50"
                    onClick={() => navigate('/ai-tools')}
                  >
                    <Zap size={18} className="mr-2" /> Create AI Campaign
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-gray-700 border border-gray-200 bg-white hover:bg-gray-50"
                    onClick={() => navigate('/ads-library')}
                  >
                    <TrendingUp size={18} className="mr-2" /> Track New Competitor
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Getting Started</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-green-500 mr-3 flex items-center justify-center text-white">
                      <CheckCircle size={14} />
                    </div>
                    <span>Create your account</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-green-500 mr-3 flex items-center justify-center text-white">
                      <CheckCircle size={14} />
                    </div>
                    <span>Set up your profile</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                    <span>Connect Facebook Ad account</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                    <span>Create your first funnel</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                    <span>Invite your team members</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Middle Column */}
            <div className="space-y-4">
              <div className="bg-yellow-400 rounded-xl p-6 shadow-sm text-gray-800">
                <h3 className="font-bold text-lg mb-2">Discover Winning Ads</h3>
                <p className="mb-4">Analyze the top performing Facebook ads in your niche and leverage their strategies.</p>
                <Button 
                  className="bg-white text-gray-800 hover:bg-gray-50"
                  onClick={() => navigate('/ads-library')}
                >
                  Start Exploring
                </Button>
              </div>
              
              <div className="space-y-4">
                <ActionCard
                  title="Create Your First Funnel"
                  description="Use our drag & drop builder to create high-converting funnels in minutes."
                  buttonText="Build Funnel"
                  icon={<Zap size={18} />}
                  onClick={() => navigate('/funnel-builder')}
                />
                
                <ActionCard
                  title="Generate AI Campaign"
                  description="Answer a few questions and let AI create the perfect campaign structure."
                  buttonText="Start Generator"
                  icon={<BarChart size={18} />}
                  onClick={() => navigate('/ai-tools')}
                />
              </div>
            </div>
            
            {/* Right Column - Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-800">Recently Saved Ads</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-yellow-600"
                  onClick={() => navigate('/ads-library')}
                >
                  View All
                </Button>
              </div>
              
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Search size={48} className="text-gray-300 mb-3" />
                <p className="text-gray-600 mb-2">No ads saved yet</p>
                <p className="text-gray-400 text-sm mb-4">Start exploring the ads library to save ads</p>
                <Button 
                  variant="outline" 
                  className="text-gray-700 border border-gray-200"
                  onClick={() => navigate('/ads-library')}
                >
                  Browse Ad Library
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
