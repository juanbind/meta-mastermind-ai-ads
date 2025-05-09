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
          <Route element={<AuthCheck />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/ai-media-buyer" element={<AIMediaBuyerPage />} />
            <Route path="/campaign-builder" element={<CampaignBuilder />} />
            <Route path="/ads-library" element={<AdsLibrary />} />
            <Route path="/creatives" element={<Creatives />} />
            <Route path="/funnel-builder" element={<FunnelBuilder />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
