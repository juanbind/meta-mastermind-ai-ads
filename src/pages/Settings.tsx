
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { User, Bell, Lock, CreditCard, Users, Briefcase, Mail, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  
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
            <Tabs defaultValue="profile">
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
                    <div>
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
                    
                    <div className="pt-4 border-t border-gray-100">
                      <Button className="bg-metamaster-primary hover:bg-metamaster-secondary">
                        Save Changes
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
                                  {fullName?.charAt(0) || 'U'}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{fullName || 'Current User'}</div>
                                  <div className="text-sm text-gray-500">{email || 'user@example.com'}</div>
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
