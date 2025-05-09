
import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AITools from './pages/AITools';
import AIMediaBuyerPage from './pages/AIMediaBuyerPage';
import AdsLibrary from './pages/AdsLibrary';
import Creatives from './pages/Creatives';
import FunnelBuilder from './pages/FunnelBuilder';
import CRM from './pages/CRM';
import Reports from './pages/Reports';
import Integrations from './pages/Integrations';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import CampaignBuilder from './pages/CampaignBuilder';

function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {showSplashScreen ? (
        <div className="splash-screen">
          <img src="/logo.svg" alt="Logo" className="h-20 animate-pulse" />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          <Route path="/dashboard" element={
            <AuthCheck>
              <Dashboard />
            </AuthCheck>
          } />
          <Route path="/ai-tools" element={
            <AuthCheck>
              <AITools />
            </AuthCheck>
          } />
          <Route path="/ai-media-buyer" element={
            <AuthCheck>
              <AIMediaBuyerPage />
            </AuthCheck>
          } />
          <Route path="/campaign-builder" element={
            <AuthCheck>
              <CampaignBuilder />
            </AuthCheck>
          } />
          <Route path="/ads-library" element={
            <AuthCheck>
              <AdsLibrary />
            </AuthCheck>
          } />
          <Route path="/creatives" element={
            <AuthCheck>
              <Creatives />
            </AuthCheck>
          } />
          <Route path="/funnel-builder" element={
            <AuthCheck>
              <FunnelBuilder />
            </AuthCheck>
          } />
          <Route path="/crm" element={
            <AuthCheck>
              <CRM />
            </AuthCheck>
          } />
          <Route path="/reports" element={
            <AuthCheck>
              <Reports />
            </AuthCheck>
          } />
          <Route path="/integrations" element={
            <AuthCheck>
              <Integrations />
            </AuthCheck>
          } />
          <Route path="/templates" element={
            <AuthCheck>
              <Templates />
            </AuthCheck>
          } />
          <Route path="/settings" element={
            <AuthCheck>
              <Settings />
            </AuthCheck>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
