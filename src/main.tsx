
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import App from './App';
import './index.css';

// Pages
import Index from './pages/Index';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import FunnelBuilder from './pages/FunnelBuilder';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Templates from './pages/Templates';
import CRM from './pages/CRM';
import AITools from './pages/AITools';
import AIMediaBuyerPage from './pages/AIMediaBuyerPage'; 
import AdsLibrary from './pages/AdsLibrary';
import Creatives from './pages/Creatives';
import AdCopyGeneratorPage from './pages/AdCopyGeneratorPage';
import Integrations from './pages/Integrations';
import FacebookIntegration from './pages/FacebookIntegration';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { AuthCheck } from './components/auth/AuthCheck';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Index />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />

            {/* Protected Routes */}
            <Route element={<AuthCheck>Protected routes</AuthCheck>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/funnel-builder" element={<FunnelBuilder />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/ai-media-buyer" element={<AIMediaBuyerPage />} />
              <Route path="/ads-library" element={<AdsLibrary />} />
              <Route path="/creatives" element={<Creatives />} />
              <Route path="/ad-copy-generator" element={<AdCopyGeneratorPage />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/facebook-integration" element={<FacebookIntegration />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
