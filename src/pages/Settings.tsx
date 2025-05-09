import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { User, Bell, Lock, CreditCard, Users, Mail, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from '@/lib/supabase';

const Settings: React.FC = () => {
  const { user, updateUserMetadata } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState<string | null>(user?.user_metadata?.avatar_url || null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Get tab from URL query parameter
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    // Update state when user metadata changes
    if (user) {
      setFullName(user.user_metadata?.full_name || '');
      setProfileImage(user.user_metadata?.avatar_url || null);
    }
  }, [user]);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // Only update the metadata that has changed
      const updates: Record<string, any> = {};
      
      if (fullName !== user?.user_metadata?.full_name) {
        updates.full_name = fullName;
      }
      
      if (profileImage !== user?.user_metadata?.avatar_url) {
        updates.avatar_url = profileImage;
      }
      
      // Only make the update call if we have changes to make
      if (Object.keys(updates).length > 0) {
        await updateUserMetadata(updates);
        
        toast({
          title: "Settings updated",
          description: "Your profile information has been updated successfully.",
        });
      } else {
        toast({
          title: "No changes detected",
          description: "No changes were made to your profile.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    try {
      // Create a preview immediately for better UX
      const objectUrl = URL.createObjectURL(file);
      setProfileImage(objectUrl);

      // Toast for user feedback
      toast({
        title: "Image selected",
        description: "Click 'Save Changes' to update your profile image.",
      });
    } catch (error) {
      console.error("Error handling profile image:", error);
      toast({
        title: "Error",
        description: "Failed to process the selected image.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-metamaster-gray-100">
      <Sidebar />
      <div className="md:ml-64 pt-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Settings</h1>
            <p className="text-metamaster-gray-600">Manage your account and preferences</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b border-gray-100">
                <TabsList className="flex bg-transparent h-auto p-0">
                  <TabsTrigger 
                    value="profile" 
                    className="flex items-center space-x-2 px-4 py-3 border-b-2 border-transparent data-[state=active]:border-metamaster-primary rounded-none"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications"
                    className="flex items-center space-x-2 px-4 py-3 border-b-2 border-transparent data-[state=active]:border-metamaster-primary rounded-none"
                  >
                    <Bell size={16} />
                    <span>Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security"
                    className="flex items-center space-x-2 px-4 py-3 border-b-2 border-transparent data-[state=active]:border-metamaster-primary rounded-none"
                  >
                    <Lock size={16} />
                    <span>Security</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="billing"
                    className="flex items-center space-x-2 px-4 py-3 border-b-2 border-transparent data-[state=active]:border-metamaster-primary rounded-none"
                  >
                    <CreditCard size={16} />
                    <span>Billing</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="team"
                    className="flex items-center space-x-2 px-4 py-3 border-b-2 border-transparent data-[state=active]:border-metamaster-primary rounded-none"
                  >
                    <Users size={16} />
                    <span>Team</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-6">
                <TabsContent value="profile">
                  <div className="space-y-6">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <Avatar className="w-24 h-24 cursor-pointer" onClick={handleProfileImageClick}>
                            {profileImage ? (
                              <AvatarImage src={profileImage} alt="Profile" />
                            ) : (
                              <AvatarFallback className="bg-metamaster-primary text-white text-xl">
                                {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="absolute bottom-0 right-0 bg-metamaster-primary rounded-full p-1.5 border-2 border-white cursor-pointer" onClick={handleProfileImageClick}>
                            <Upload size={14} className="text-white" />
                          </div>
                        </div>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleFileChange}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 text-sm" 
                          onClick={handleProfileImageClick}
                          disabled={isLoading}
                        >
                          Change Photo
                        </Button>
                      </div>
                      <div className="flex-1 w-full">
                        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-metamaster-gray-600 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full border border-gray-200 rounded-lg p-2.5"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-metamaster-gray-600 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full border border-gray-200 rounded-lg p-2.5"
                              disabled
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-metamaster-gray-600 mb-1">
                              Company
                            </label>
                            <input
                              type="text"
                              className="w-full border border-gray-200 rounded-lg p-2.5"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-metamaster-gray-600 mb-1">
                              Job Title
                            </label>
                            <input
                              type="text"
                              className="w-full border border-gray-200 rounded-lg p-2.5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <Button 
                        className="bg-metamaster-primary hover:bg-metamaster-secondary"
                        onClick={handleSaveChanges}
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="font-medium">Campaign Performance Updates</h4>
                          <p className="text-sm text-metamaster-gray-600">Receive updates when your campaigns reach milestones</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-metamaster-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="font-medium">Weekly Reports</h4>
                          <p className="text-sm text-metamaster-gray-600">Receive weekly performance summary reports</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-metamaster-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="font-medium">Team Activity</h4>
                          <p className="text-sm text-metamaster-gray-600">Get notified when team members make changes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-metamaster-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="font-medium">New Features & Updates</h4>
                          <p className="text-sm text-metamaster-gray-600">Get notified about new features and platform updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-metamaster-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Change Password</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-metamaster-gray-600 mb-1">
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="w-full border border-gray-200 rounded-lg p-2.5"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-metamaster-gray-600 mb-1">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="w-full border border-gray-200 rounded-lg p-2.5"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-metamaster-gray-600 mb-1">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              className="w-full border border-gray-200 rounded-lg p-2.5"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button className="bg-metamaster-primary hover:bg-metamaster-secondary">
                          Update Password
                        </Button>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                        <p className="text-sm text-metamaster-gray-600 mb-3">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="outline">
                          Enable Two-Factor Authentication
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="billing">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium mb-4">Billing Information</h3>
                    
                    <div className="bg-metamaster-gray-50 border border-metamaster-gray-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Current Plan: <span className="text-metamaster-primary">Professional</span></h4>
                          <p className="text-sm text-metamaster-gray-600">Your trial ends in 6 days</p>
                        </div>
                        <Button variant="outline">
                          Upgrade Plan
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Payment Method</h4>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-8 w-12 bg-gray-800 rounded mr-3 flex items-center justify-center text-white text-xs">
                            VISA
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-metamaster-gray-600">Expires 12/2025</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="team">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Team Members</h3>
                      <Button className="bg-metamaster-primary hover:bg-metamaster-secondary">
                        Invite Member
                      </Button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-metamaster-gray-600 uppercase tracking-wider">
                              User
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-metamaster-gray-600 uppercase tracking-wider">
                              Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-metamaster-gray-600 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-metamaster-gray-600 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-metamaster-primary text-white flex items-center justify-center">
                                  {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user?.user_metadata?.full_name || 'Current User'}</div>
                                  <div className="text-sm text-gray-500">{user?.email || 'user@example.com'}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">Admin</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
