
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, TrendingUp } from 'lucide-react';

interface BudgetDistribution {
  type: string;
  allocation: number;
  dailyBudget: number;
}

interface CampaignAnalysisProps {
  buyerPersona: string;
  recommendedObjective: string;
  budgetDistribution: BudgetDistribution[];
  isAnalyzing?: boolean;
}

const CampaignStructureAnalysis: React.FC<CampaignAnalysisProps> = ({
  buyerPersona,
  recommendedObjective,
  budgetDistribution,
  isAnalyzing = false,
}) => {
  if (isAnalyzing) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-metamaster-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Analyzing your campaign data...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 border-l-4 border-l-blue-500">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <Users size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Target Audience Analysis</h3>
            <p className="text-gray-700">{buyerPersona}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-l-4 border-l-green-500">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-2 rounded-full">
            <Target size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Campaign Objective</h3>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                {recommendedObjective}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {recommendedObjective === 'LEAD_GENERATION' 
                ? 'Best for collecting leads and potential customer information'
                : recommendedObjective === 'CONVERSIONS'
                ? 'Best for driving sales and conversions on your website'
                : 'Optimized for your campaign goals'}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-l-4 border-l-purple-500">
        <div className="flex items-start gap-4">
          <div className="bg-purple-100 p-2 rounded-full">
            <TrendingUp size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Budget Distribution</h3>
            
            <div className="space-y-3 mt-4">
              {budgetDistribution.map((budget, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{budget.type}</span>
                    <span>${budget.dailyBudget.toFixed(2)}/day ({Math.round(budget.allocation * 100)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div 
                      className="bg-metamaster-primary h-full rounded-full"
                      style={{ width: `${budget.allocation * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CampaignStructureAnalysis;
