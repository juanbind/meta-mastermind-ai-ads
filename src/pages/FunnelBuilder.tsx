
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Info, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";

const FunnelBuilder: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-metamaster-gray-800">Funnel Builder</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-metamaster-gray-800">Funnel Progress</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-metamaster-gray-700">Overall Progress</span>
              <Badge variant="success">60%</Badge>
            </div>
            <Progress value={60} className="h-2" />
            
            <div className="mt-8 space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription className="text-metamaster-gray-700">
                  This is an informational alert for the funnel builder.
                </AlertDescription>
              </Alert>
              
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was an error with your funnel configuration.
                </AlertDescription>
              </Alert>
              
              <Alert variant="success">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your funnel settings have been saved successfully.
                </AlertDescription>
              </Alert>
              
              <Alert variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Please complete all required fields before publishing.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-metamaster-gray-800">Funnel Structure</h2>
          <div className="border rounded-lg p-4 border-metamaster-gray-300">
            <p className="text-sm text-metamaster-gray-600 mb-4">
              Your funnel is currently in development. The funnel builder feature will be fully available soon.
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-metamaster-gray-100 rounded">
                <span className="text-metamaster-gray-800">Landing Page</span>
                <Badge>Complete</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-metamaster-gray-100 rounded">
                <span className="text-metamaster-gray-800">Opt-in Form</span>
                <Badge>Complete</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-metamaster-gray-100 rounded">
                <span className="text-metamaster-gray-800">Sales Page</span>
                <Badge variant="warning">In Progress</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-metamaster-gray-100 rounded">
                <span className="text-metamaster-gray-800">Checkout</span>
                <Badge variant="secondary">Not Started</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-metamaster-gray-100 rounded">
                <span className="text-metamaster-gray-800">Thank You Page</span>
                <Badge variant="secondary">Not Started</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelBuilder;
