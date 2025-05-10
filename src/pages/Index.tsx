
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-xl font-medium mb-2 text-gray-800">Loading AdKing...</h1>
        <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-gray-800/30 animate-pulse-light"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
