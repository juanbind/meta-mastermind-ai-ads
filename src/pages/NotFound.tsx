
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const NotFound = () => {
  const animationRef = useScrollAnimation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-metamaster-gray-100">
      <div ref={animationRef} className="text-center max-w-md px-4 animate-on-scroll">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-metamaster-primary to-metamaster-secondary text-white text-6xl font-bold inline-block rounded-xl px-6 py-3 hover-lift">
            404
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-metamaster-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-metamaster-primary hover:bg-metamaster-secondary">
            <ArrowLeft size={18} className="mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
