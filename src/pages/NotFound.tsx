
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation, useScrollReveal } from "@/hooks/useScrollAnimation";

const NotFound = () => {
  const animationRef = useScrollAnimation();
  const revealRef = useScrollReveal();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-adking-gray-100">
      <div ref={animationRef} className="text-center max-w-md px-4 animate-on-scroll">
        <div className="mb-8">
          <div 
            ref={el => revealRef(el)}
            data-animation="fade-in"
            className="reveal-element bg-gradient-to-r from-adking-primary to-adking-secondary text-adking-dark text-6xl font-bold inline-block rounded-xl px-6 py-3 hover-lift"
          >
            404
          </div>
        </div>
        
        <h1 
          ref={el => revealRef(el)}
          data-animation="fade-up" 
          className="reveal-element text-3xl font-bold mb-4 text-adking-dark"
        >
          Page Not Found
        </h1>
        
        <p 
          ref={el => revealRef(el)}
          data-animation="fade-up"
          className="reveal-element text-adking-gray-700 mb-8"
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button 
            ref={el => revealRef(el)}
            data-animation="slide-right"
            className="bg-adking-primary hover:bg-adking-secondary text-adking-dark button-press reveal-element"
          >
            <ArrowLeft size={18} className="mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
