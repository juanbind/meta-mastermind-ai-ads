import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Image } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const Creatives: React.FC = () => {
  const {
    toast
  } = useToast();
  const {
    user
  } = useAuth();
  const [formData, setFormData] = useState({
    businessName: '',
    businessServices: '',
    location: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previousRequests, setPreviousRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  useEffect(() => {
    if (user) {
      fetchPreviousRequests();
    }
  }, [user]);
  const fetchPreviousRequests = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('creative_requests').select('*').order('created_at', {
        ascending: false
      });
      if (error) {
        console.error('Error fetching previous requests:', error);
        return;
      }
      setPreviousRequests(data || []);
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoadingRequests(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.businessName || !formData.businessServices) {
      toast({
        title: "Missing information",
        description: "Please provide your business name and services.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Submit to Supabase
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to submit a request.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    try {
      const {
        error
      } = await supabase.from('creative_requests').insert({
        user_id: user.id,
        business_name: formData.businessName,
        business_services: formData.businessServices,
        location: formData.location,
        additional_info: formData.additionalInfo
      });
      if (error) {
        throw error;
      }
      toast({
        title: "Creative request submitted!",
        description: "We'll process your request and get back to you soon.",
        variant: "default"
      });

      // Reset form
      setFormData({
        businessName: '',
        businessServices: '',
        location: '',
        additionalInfo: ''
      });

      // Refresh the requests list
      fetchPreviousRequests();
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error submitting request",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return <div className="min-h-screen bg-adking-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-adking-gray-800">Creative Requests</h1>
            <p className="text-adking-gray-600">Request new creatives for your marketing campaigns</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-adking-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-adking-primary mr-4 bg-amber-50">
                <Image size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-adking-gray-800">Request New Creative</h2>
                <p className="text-adking-gray-600">Fill out the form below to request custom creative for your business</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-adking-gray-700 mb-1">
                  Business Name*
                </label>
                <Input id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Enter your business name" className="w-full" required />
              </div>
              
              <div>
                <label htmlFor="businessServices" className="block text-sm font-medium text-adking-gray-700 mb-1">
                  Business Services*
                </label>
                <Input id="businessServices" name="businessServices" value={formData.businessServices} onChange={handleChange} placeholder="What services or products do you offer?" className="w-full" required />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-adking-gray-700 mb-1">
                  Where are you located?
                </label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="City, State, Country" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-adking-gray-700 mb-1">
                  Additional Business Information
                </label>
                <Textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder="Please provide as much information about your business as possible. This helps us create more effective creatives for you." className="w-full min-h-[150px]" />
              </div>
              
              <Button type="submit" className="bg-gradient-to-r from-adking-primary to-adking-secondary hover:opacity-90 text-white w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Creative Request"}
              </Button>
            </form>
          </div>

          {/* Previous Requests Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-adking-gray-800 mb-6">Your Previous Requests</h2>
            
            {loadingRequests ? <div className="text-center py-8">
                <p className="text-adking-gray-600">Loading your previous requests...</p>
              </div> : previousRequests.length === 0 ? <div className="text-center py-8">
                <p className="text-adking-gray-600">You haven't submitted any creative requests yet.</p>
              </div> : <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left font-medium text-adking-gray-700">Business Name</th>
                      <th className="py-3 px-4 text-left font-medium text-adking-gray-700">Services</th>
                      <th className="py-3 px-4 text-left font-medium text-adking-gray-700">Date</th>
                      <th className="py-3 px-4 text-left font-medium text-adking-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previousRequests.map(request => <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{request.business_name}</td>
                        <td className="py-3 px-4">{request.business_services}</td>
                        <td className="py-3 px-4">{formatDate(request.created_at)}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : request.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {request.status === 'pending' ? 'Pending' : request.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};

export default Creatives;
