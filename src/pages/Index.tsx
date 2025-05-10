

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to landing page
    navigate("/", { replace: true });
  }, [navigate]);

  // Return a loading screen in case the redirect takes a moment
  return (
    <div className="min-h-screen flex items-center justify-center bg-adking-gray-100">
      <div className="text-center">
        <h1 className="text-xl font-medium mb-2 text-adking-dark">Loading AdKing...</h1>
        <div className="w-16 h-1 bg-adking-primary mx-auto rounded-full relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-adking-dark/30 animate-pulse-light"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;

