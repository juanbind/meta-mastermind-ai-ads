
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthCheck } from "./components/auth/AuthCheck";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdsLibrary from "./pages/AdsLibrary";
import FunnelBuilder from "./pages/FunnelBuilder";
import CRM from "./pages/CRM";
import NotFound from "./pages/NotFound";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <AuthCheck>
                <Dashboard />
              </AuthCheck>
            } />
            <Route path="/ads-library" element={
              <AuthCheck>
                <AdsLibrary />
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
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
