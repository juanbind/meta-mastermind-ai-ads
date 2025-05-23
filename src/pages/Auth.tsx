
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';

const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !loading) {
      console.log("User is logged in, redirecting to dashboard...");
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);
  
  const handleAuthSuccess = () => {
    // Redirect to dashboard on successful auth
    console.log("Auth success, redirecting to dashboard...");
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 shadow-xl rounded-2xl overflow-hidden w-full max-w-5xl bg-white border border-gray-200">
        {/* Left Side - Form */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <Logo />
          </div>
          
          <h1 className="text-2xl font-bold mb-2 text-adking-gray-800">
            {activeTab === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-adking-gray-600 mb-6">
            {activeTab === 'login' 
              ? 'Sign in to access your account.' 
              : 'Get started with AdKing today.'}
          </p>
          
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`pb-2 px-4 mr-4 text-sm font-medium ${
                activeTab === 'login'
                  ? 'text-adking-primary border-b-2 border-adking-primary'
                  : 'text-adking-gray-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`pb-2 px-4 text-sm font-medium ${
                activeTab === 'register'
                  ? 'text-adking-primary border-b-2 border-adking-primary'
                  : 'text-adking-gray-500'
              }`}
            >
              Sign Up
            </button>
          </div>
          
          {activeTab === 'login' ? (
            <LoginForm onSuccess={handleAuthSuccess} />
          ) : (
            <RegisterForm onSuccess={handleAuthSuccess} />
          )}
          
          <div className="mt-6 text-center text-sm text-adking-gray-600">
            <p>
              {activeTab === 'login' 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <button 
                onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                className="text-adking-primary hover:underline font-medium"
              >
                {activeTab === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
        
        {/* Right Side - Image/Info */}
        <div className="hidden md:block bg-gradient-to-br from-adking-primary/80 to-adking-secondary/80 p-12 text-adking-dark relative">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M40.7,-68.2C52.9,-62.3,63,-49.1,69.5,-34.7C75.9,-20.4,78.8,-5,76.2,9.1C73.6,23.3,65.6,36.3,55.3,47.2C45,58.2,32.3,67.1,18.1,72.4C3.9,77.7,-11.7,79.3,-24,73.7C-36.2,68.1,-45,55.4,-53.8,42.9C-62.6,30.5,-71.3,18.3,-74.5,4.1C-77.7,-10.1,-75.3,-26.3,-67.3,-38.9C-59.2,-51.5,-45.5,-60.5,-31.5,-65.2C-17.6,-70,-8.8,-70.5,3.2,-75.5C15.3,-80.5,28.5,-90.1,40.7,-62.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Transform Your Facebook Ads Strategy</h2>
            <p className="text-adking-dark/90 mb-6">
              Join thousands of marketers who are discovering winning ads, building high-converting funnels, and scaling their businesses with AdKing.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-adking-dark">Find winning ads in seconds, not hours</p>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-adking-dark">Build high-converting funnels in minutes</p>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-adking-dark">Get AI-powered campaign suggestions</p>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-adking-dark">Manage your leads with our integrated CRM</p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-0 p-4 text-sm text-adking-dark/90">
            Trusted by 10,000+ marketers worldwide
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
