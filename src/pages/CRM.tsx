import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
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
  ChevronRight,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Contact, fetchContacts, createContact, updateContact, deleteContact, formatDate } from '@/lib/crm';
import { useAuth } from '@/contexts/AuthContext';

const stageBadges = {
  'new': 'bg-blue-100 text-blue-800',
  'lead': 'bg-blue-100 text-blue-800',
  'contacted': 'bg-purple-100 text-purple-800',
  'qualified': 'bg-yellow-100 text-yellow-800',
  'proposal': 'bg-orange-100 text-orange-800',
  'customer': 'bg-green-100 text-green-800',
};

const StageCard: React.FC<{ stage: string; count: number; value: number }> = ({ stage, count, value }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
      <h3 className="font-bold text-lg mb-1">{stage.charAt(0).toUpperCase() + stage.slice(1)}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-adking-gray-600 text-sm">{count} Leads</span>
        <span className="font-medium">${value.toLocaleString()}</span>
      </div>
      <div className="w-full h-2 bg-adking-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-adking-primary" 
          style={{ width: `${Math.min(100, count * 10)}%` }}
        ></div>
      </div>
    </div>
  );
};

const LeadRow: React.FC<{ lead: Contact; onUpdate: (id: string, updates: Partial<Contact>) => void }> = ({ lead, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteContact(lead.id);
      toast({
        title: "Contact deleted",
        description: `${lead.first_name} ${lead.last_name} has been removed`
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: "Error",
        description: "Could not delete contact. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      window.location.reload();
    }
  };

  const handleStageChange = async (stage: string) => {
    try {
      await onUpdate(lead.id, { stage });
      toast({
        title: "Contact updated",
        description: `${lead.first_name} ${lead.last_name} moved to ${stage}`
      });
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: "Error",
        description: "Could not update contact stage. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const displayName = `${lead.first_name} ${lead.last_name}`;
  const stageBadge = stageBadges[lead.stage?.toLowerCase() as keyof typeof stageBadges] || 'bg-gray-100 text-gray-800';
  
  return (
    <tr className="hover:bg-adking-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-adking-primary text-white flex items-center justify-center mr-3">
            {displayName.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{displayName}</p>
            <p className="text-xs text-adking-gray-600">{lead.email}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm">{lead.phone || 'N/A'}</span>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm">{lead.source || 'Direct'}</span>
      </td>
      <td className="py-3 px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${stageBadge}`}>
              {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleStageChange('lead')}>
              Lead
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStageChange('contacted')}>
              Contacted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStageChange('qualified')}>
              Qualified
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStageChange('proposal')}>
              Proposal
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStageChange('customer')}>
              Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-1 flex-wrap">
          {lead.tags?.map((tag, i) => (
            <span key={i} className="bg-adking-gray-200 px-2 py-0.5 rounded-full text-xs">
              {tag}
            </span>
          )) || 'No tags'}
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm">${lead.value.toLocaleString()}</span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center text-sm text-adking-gray-600">
          <Clock size={14} className="mr-1" />
          <span>{formatDate(lead.last_activity || lead.created_at)}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"
            disabled={!lead.email}
            title={!lead.email ? "No email address" : "Send email"}
            onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
          >
            <Mail size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"
            disabled={!lead.phone}
            title={!lead.phone ? "No phone number" : "Call"}
            onClick={() => window.open(`tel:${lead.phone}`, '_blank')}
          >
            <Phone size={16} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Contact</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} disabled={isDeleting} className="text-red-600">
                {isDeleting ? "Deleting..." : "Delete Contact"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};

const NewContactDialog: React.FC<{ onContactAdded: () => void }> = ({ onContactAdded }) => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('direct');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      toast({
        title: "Error",
        description: "First name and last name are required",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createContact({
        first_name: firstName,
        last_name: lastName,
        email: email || null,
        phone: phone || null,
        source: source || 'direct',
        status: 'active',
        stage: 'lead',
        value: 0,
        tags: [],
        assigned_to: user?.id || null,
        last_activity: new Date().toISOString()
      });
      
      toast({
        title: "Success",
        description: "New contact has been created"
      });
      
      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setSource('direct');
      setOpen(false);
      
      // Refresh contacts list
      onContactAdded();
      
    } catch (error) {
      console.error('Error creating contact:', error);
      toast({
        title: "Error",
        description: "Failed to create contact. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-adking-primary hover:bg-adking-secondary text-white flex items-center">
          <Plus size={16} className="mr-2" /> Add Lead
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">First Name*</label>
              <Input 
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">Last Name*</label>
              <Input 
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">Phone</label>
            <Input 
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="source" className="text-sm font-medium">Lead Source</label>
            <select
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="direct">Direct</option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="facebook">Facebook</option>
              <option value="google">Google</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {isSubmitting ? "Creating..." : "Create Contact"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FacebookIntegrationDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSetupInstructions = () => {
    toast({
      title: "Facebook Integration",
      description: "Webhook URL copied. Follow the setup steps in your Facebook Lead Form Settings."
    });
    
    navigator.clipboard.writeText('https://mbbfcjdfdkoggherfmff.functions.supabase.co/fb-lead-sync');
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={16} className="mr-2" /> Connect Facebook
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Facebook Lead Ads Integration</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  Connect your Facebook Lead Ads to automatically import leads.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Integration Steps:</h3>
            <ol className="list-decimal ml-5 space-y-2">
              <li>Go to your Facebook Business Manager</li>
              <li>Navigate to your Lead Form settings</li>
              <li>Select "Connect to CRM"</li>
              <li>Choose "Custom Integration"</li>
              <li>Enter the webhook URL below:</li>
            </ol>
            
            <div className="mt-2 bg-gray-50 p-3 rounded-md">
              <div className="flex items-center">
                <code className="text-sm flex-1 text-gray-800">
                  https://mbbfcjdfdkoggherfmff.functions.supabase.co/fb-lead-sync
                </code>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText('https://mbbfcjdfdkoggherfmff.functions.supabase.co/fb-lead-sync');
                    toast({
                      title: "Copied to clipboard",
                      description: "Webhook URL has been copied to clipboard"
                    });
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600">
              Once configured, leads from your Facebook forms will automatically appear in your CRM.
              For detailed instructions, refer to our <a href="#" className="text-blue-600 hover:underline">documentation</a>.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSetupInstructions}>
              Set Up Integration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const QuickActionCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  onClick?: () => void;
}> = ({
  icon,
  title,
  description,
  onClick
}) => {
  return (
    <div 
      className="bg-white rounded-xl p-5 shadow-md border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="bg-adking-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-adking-primary mr-4">
          {icon}
        </div>
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-adking-gray-600">{description}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <ChevronRight size={20} />
      </Button>
    </div>
  );
};

const CRM: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [stageData, setStageData] = useState<{stage: string; count: number; value: number}[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const {
    data: contactsData,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['contacts', page, searchQuery],
    queryFn: () => fetchContacts(page, 10, { search: searchQuery }),
    enabled: !!user
  });

  useEffect(() => {
    // Calculate stage statistics
    if (contactsData?.data) {
      // In a real app, this would be a separate query to get aggregated data
      const stages: Record<string, { count: number; value: number }> = {};
      
      contactsData.data.forEach(contact => {
        const stage = contact.stage || 'lead';
        if (!stages[stage]) {
          stages[stage] = { count: 0, value: 0 };
        }
        stages[stage].count++;
        stages[stage].value += contact.value || 0;
      });
      
      const stageStats = Object.entries(stages).map(([stage, data]) => ({
        stage,
        count: data.count,
        value: data.value
      }));
      
      // Add default stages if missing
      const defaultStages = ['lead', 'contacted', 'qualified', 'proposal', 'customer'];
      defaultStages.forEach(stage => {
        if (!stageStats.find(s => s.stage === stage)) {
          stageStats.push({ stage, count: 0, value: 0 });
        }
      });
      
      setStageData(stageStats);
    }
  }, [contactsData]);

  const handleContactUpdate = async (id: string, updates: Partial<Contact>) => {
    try {
      await updateContact(id, updates);
      refetch(); // Refresh the contacts list
      toast({
        title: "Contact updated",
        description: "The contact has been successfully updated"
      });
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: "Error",
        description: "Failed to update contact. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleNextPage = () => {
    if (contactsData && contactsData.page * contactsData.pageSize < (contactsData.count || 0)) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };
  
  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'new-lead':
        // This will be handled by the NewContactDialog component
        document.getElementById('add-lead-button')?.click();
        break;
      case 'schedule-followup':
        toast({
          title: "Follow-up Scheduler",
          description: "The follow-up scheduler will be available soon."
        });
        break;
      case 'high-value-leads':
        toast({
          title: "High-Value Leads",
          description: "Filtering for high-value leads will be available soon."
        });
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="min-h-screen bg-adking-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Customer Relationship Management</h1>
            <p className="text-adking-gray-600">Manage your leads and customers in one place</p>
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
              onClick={() => handleQuickAction('new-lead')}
            />
            <QuickActionCard 
              icon={<Calendar size={20} />}
              title="Schedule Follow-up"
              description="Set up reminders and follow-up tasks"
              onClick={() => handleQuickAction('schedule-followup')}
            />
            <QuickActionCard 
              icon={<Star size={20} />}
              title="View High-Value Leads"
              description="Focus on your highest potential customers"
              onClick={() => handleQuickAction('high-value-leads')}
            />
          </div>
          
          {/* Leads Table */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-lg font-bold">Leads & Customers</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-adking-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search leads..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-adking-primary text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter size={16} className="mr-2" /> Filter
                </Button>
                <NewContactDialog onContactAdded={refetch} />
                <Button 
                  id="add-lead-button" 
                  className="hidden" // Hidden button that can be triggered programmatically
                  onClick={() => document.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')?.click()}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-adking-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 font-medium text-adking-gray-700">
                      <div className="flex items-center">
                        Name <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="py-3 px-4 font-medium text-adking-gray-700">Phone</th>
                    <th className="py-3 px-4 font-medium text-adking-gray-700">Source</th>
                    <th className="py-3 px-4 font-medium text-adking-gray-700">Stage</th>
                    <th className="py-3 px-4 font-medium text-adking-gray-700">Tags</th>
                    <th className="py-3 px-4 font-medium text-adking-gray-700">Value</th>
                    <th className="py-3 px-4 font-medium text-adking-gray-700">Last Activity</th>
                    <th className="py-3 px-4 font-medium text-adking-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        <p className="mt-2 text-sm text-adking-gray-600">Loading leads...</p>
                      </td>
                    </tr>
                  ) : isError ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center">
                        <AlertCircle className="h-6 w-6 mx-auto text-red-500" />
                        <p className="mt-2 text-sm text-red-600">Error loading leads. Please try again.</p>
                      </td>
                    </tr>
                  ) : contactsData?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center">
                        <div className="max-w-md mx-auto">
                          <h3 className="text-lg font-medium mb-2">No leads found</h3>
                          <p className="text-adking-gray-600 mb-6">
                            Get started by adding your first lead or connecting your Facebook Ads
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <NewContactDialog onContactAdded={refetch} />
                            <FacebookIntegrationDialog />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    contactsData?.data?.map(lead => (
                      <LeadRow 
                        key={lead.id} 
                        lead={lead} 
                        onUpdate={handleContactUpdate}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-5 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm text-adking-gray-600">
                {contactsData ? (
                  `Showing ${(contactsData.page - 1) * contactsData.pageSize + 1}-${Math.min(
                    contactsData.page * contactsData.pageSize,
                    contactsData.count || 0
                  )} of ${contactsData.count || 0} leads`
                ) : (
                  "Loading..."
                )}
              </span>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrevPage}
                  disabled={page === 1 || isLoading}
                >
                  Previous
                </Button>
                {contactsData && Array.from({ length: Math.ceil((contactsData.count || 0) / contactsData.pageSize) }).map((_, i) => (
                  <Button 
                    key={i}
                    variant="outline" 
                    size="sm"
                    className={page === i + 1 ? "bg-adking-primary text-white" : ""}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleNextPage}
                  disabled={!contactsData || page * contactsData.pageSize >= (contactsData.count || 0) || isLoading}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          
          {/* Integration CTA */}
          <div className="mt-8 bg-gradient-to-r from-adking-gray-800 to-adking-gray-900 rounded-xl p-6 shadow-lg text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-bold text-xl mb-2">Connect your favorite tools</h3>
                <p className="text-adking-gray-300">
                  Integrate with Facebook, email marketing platforms, calendars, and more to streamline your workflow.
                </p>
              </div>
              <Button className="bg-white text-adking-gray-800 hover:bg-white/90">
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
