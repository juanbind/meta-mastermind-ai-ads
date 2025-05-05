
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Image } from 'lucide-react';

const Creatives: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    businessServices: '',
    location: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    
    // Simulate request submission
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
    } catch (error) {
      toast({
        title: "Error submitting request",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-metamaster-gray-800">Creative Requests</h1>
            <p className="text-metamaster-gray-600">Request new creatives for your marketing campaigns</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-metamaster-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-metamaster-primary mr-4">
                <Image size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-metamaster-gray-800">Request New Creative</h2>
                <p className="text-metamaster-gray-600">Fill out the form below to request custom creative for your business</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                  Business Name*
                </label>
                <Input 
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Enter your business name"
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="businessServices" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                  Business Services*
                </label>
                <Input 
                  id="businessServices"
                  name="businessServices"
                  value={formData.businessServices}
                  onChange={handleChange}
                  placeholder="What services or products do you offer?"
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                  Where are you located?
                </label>
                <Input 
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State, Country"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-metamaster-gray-700 mb-1">
                  Additional Business Information
                </label>
                <Textarea 
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Please provide as much information about your business as possible. This helps us create more effective creatives for you."
                  className="w-full min-h-[150px]"
                />
              </div>
              
              <Button 
                type="submit" 
                className="bg-metamaster-primary hover:bg-metamaster-secondary w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Creative Request"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creatives;
