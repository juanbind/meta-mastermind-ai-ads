
import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Mail, 
  Phone, 
  MoreHorizontal,
  Tag,
  Clock,
  Calendar,
  Star,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  stage: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Customer';
  lastActivity: string;
  value: number;
  tags: string[];
  assignedTo?: string;
}

const mockLeads: Lead[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    source: "Facebook Ad",
    stage: "New",
    lastActivity: "3 hours ago",
    value: 1200,
    tags: ["fitness", "high-intent"],
    assignedTo: "Sarah Johnson"
  },
  {
    id: 2,
    name: "Emily Parker",
    email: "emily@example.com",
    phone: "+1 (555) 987-6543",
    source: "Landing Page",
    stage: "Contacted",
    lastActivity: "1 day ago",
    value: 2500,
    tags: ["coaching", "returning"]
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    email: "michael@example.com",
    phone: "+1 (555) 234-5678",
    source: "Webinar",
    stage: "Qualified",
    lastActivity: "2 days ago",
    value: 5000,
    tags: ["enterprise", "urgent"]
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1 (555) 345-6789",
    source: "Referral",
    stage: "Proposal",
    lastActivity: "5 days ago",
    value: 8500,
    tags: ["high-value"]
  },
  {
    id: 5,
    name: "David Thompson",
    email: "david@example.com",
    phone: "+1 (555) 456-7890",
    source: "Google Ads",
    stage: "Customer",
    lastActivity: "1 week ago",
    value: 3200,
    tags: ["subscription", "upsell"]
  }
];

const stageBadges = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-purple-100 text-purple-800',
  'Qualified': 'bg-yellow-100 text-yellow-800',
  'Proposal': 'bg-orange-100 text-orange-800',
  'Customer': 'bg-green-100 text-green-800',
};

const StageCard: React.FC<{ stage: string; count: number; value: number }> = ({ stage, count, value }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
      <h3 className="font-bold text-lg mb-1">{stage}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-metamaster-gray-600 text-sm">{count} Leads</span>
        <span className="font-medium">${value.toLocaleString()}</span>
      </div>
      <div className="w-full h-2 bg-metamaster-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-metamaster-primary" 
          style={{ width: `${Math.min(100, count * 10)}%` }}
        ></div>
      </div>
    </div>
  );
};

const LeadRow: React.FC<{ lead: Lead }> = ({ lead }) => {
  return (
    <tr className="hover:bg-metamaster-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-metamaster-primary text-white flex items-center justify-center mr-3">
            {lead.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{lead.name}</p>
            <p className="text-xs text-metamaster-gray-600">{lead.email}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm">{lead.phone}</span>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm">{lead.source}</span>
      </td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageBadges[lead.stage]}`}>
          {lead.stage}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-1 flex-wrap">
          {lead.tags.map((tag, i) => (
            <span key={i} className="bg-metamaster-gray-200 px-2 py-0.5 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm">${lead.value.toLocaleString()}</span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center text-sm text-metamaster-gray-600">
          <Clock size={14} className="mr-1" />
          <span>{lead.lastActivity}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Mail size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Phone size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
};

const QuickActionCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-metamaster-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-metamaster-primary mr-4">
          {icon}
        </div>
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-metamaster-gray-600">{description}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <ChevronRight size={20} />
      </Button>
    </div>
  );
};

const CRM: React.FC = () => {
  const stageData = [
    { stage: "New", count: 12, value: 14400 },
    { stage: "Contacted", count: 8, value: 20000 },
    { stage: "Qualified", count: 5, value: 25000 },
    { stage: "Proposal", count: 3, value: 25500 },
    { stage: "Customer", count: 6, value: 19200 },
  ];
  
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Customer Relationship Management</h1>
            <p className="text-metamaster-gray-600">Manage your leads and customers in one place</p>
          </div>
          
          {/* Stage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {stageData.map((data, index) => (
              <StageCard 
                key={index}
                stage={data.stage}
                count={data.count}
                value={data.value}
              />
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <QuickActionCard 
              icon={<Plus size={20} />}
              title="Add New Lead"
              description="Create a new lead or customer record"
            />
            <QuickActionCard 
              icon={<Calendar size={20} />}
              title="Schedule Follow-up"
              description="Set up reminders and follow-up tasks"
            />
            <QuickActionCard 
              icon={<Star size={20} />}
              title="View High-Value Leads"
              description="Focus on your highest potential customers"
            />
          </div>
          
          {/* Leads Table */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-lg font-bold">Leads & Customers</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-metamaster-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search leads..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-metamaster-primary text-sm"
                  />
                </div>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter size={16} className="mr-2" /> Filter
                </Button>
                <Button className="bg-metamaster-primary hover:bg-metamaster-secondary text-white flex items-center">
                  <Plus size={16} className="mr-2" /> Add Lead
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-metamaster-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 font-medium text-metamaster-gray-700 flex items-center">
                      Name <ArrowUpDown size={14} className="ml-1" />
                    </th>
                    <th className="py-3 px-4 font-medium text-metamaster-gray-700">Phone</th>
                    <th className="py-3 px-4 font-medium text-metamaster-gray-700">Source</th>
                    <th className="py-3 px-4 font-medium text-metamaster-gray-700">Stage</th>
                    <th className="py-3 px-4 font-medium text-metamaster-gray-700">Tags</th>
                    <th className="py-3 px-4 font-medium text-metamaster-gray-700">Value</th>
                    <th className="py-3 px-4 font-medium text-metamaster-gray-700">Last Activity</th>
                    <th className="py-3 px-4 font-medium text-metamaster-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeads.map(lead => (
                    <LeadRow key={lead.id} lead={lead} />
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-5 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm text-metamaster-gray-600">Showing 1-5 of 34 leads</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-metamaster-primary text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
          
          {/* Integration CTA */}
          <div className="mt-8 bg-gradient-to-r from-metamaster-gray-800 to-metamaster-gray-900 rounded-xl p-6 shadow-lg text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-bold text-xl mb-2">Connect your favorite tools</h3>
                <p className="text-metamaster-gray-300">
                  Integrate with popular email marketing platforms, calendars, and more to streamline your workflow.
                </p>
              </div>
              <Button className="bg-white text-metamaster-gray-800 hover:bg-white/90">
                View Integrations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRM;
