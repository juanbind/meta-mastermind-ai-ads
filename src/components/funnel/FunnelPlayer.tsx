
import React, { useState, useEffect } from 'react';
import { useFunnelLogic } from '@/hooks/useFunnelLogic';
import ContentElementRenderer from './renderers/ContentElementRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FunnelPlayerProps {
  funnelId: string;
  previewMode?: boolean;
  device?: 'mobile' | 'tablet' | 'desktop';
}

const FunnelPlayer: React.FC<FunnelPlayerProps> = ({ 
  funnelId, 
  previewMode = false,
  device = 'desktop'
}) => {
  const { toast } = useToast();
  const {
    pages,
    currentPage,
    currentPageIndex,
    formState,
    isLoading,
    leadId,
    logicRules,
    navigateToNextPage,
    navigateToPreviousPage,
    updateFormValue,
    submitForm,
    getRulesForElement,
  } = useFunnelLogic({ funnelId });

  const [pageTransition, setPageTransition] = useState<'none' | 'entering' | 'exiting'>('none');
  const [parsedContent, setParsedContent] = useState<any[]>([]);

  useEffect(() => {
    if (currentPage?.content) {
      try {
        const content = typeof currentPage.content === 'string' 
          ? JSON.parse(currentPage.content) 
          : currentPage.content;
          
        setParsedContent(Array.isArray(content) ? content : [content]);
      } catch (error) {
        console.error('Error parsing page content:', error);
        setParsedContent([]);
      }
    } else {
      setParsedContent([]);
    }
  }, [currentPage]);

  const handlePageTransition = (direction: 'next' | 'prev') => {
    setPageTransition('exiting');
    
    setTimeout(() => {
      if (direction === 'next') {
        navigateToNextPage();
      } else {
        navigateToPreviousPage();
      }
      
      setPageTransition('entering');
      
      setTimeout(() => {
        setPageTransition('none');
      }, 300);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-40 w-full mb-4" />
        <Skeleton className="h-12 w-1/3" />
      </div>
    );
  }

  if (!currentPage) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-lg font-medium">No funnel content found</h3>
        <p className="text-metamaster-gray-500 mt-2">This funnel has no pages or elements.</p>
      </div>
    );
  }

  return (
    <div className={`funnel-player ${previewMode ? 'preview-mode' : ''}`}>
      {/* Progress indicator */}
      {pages.length > 1 && (
        <div className="flex items-center justify-center mb-6">
          <div className="flex space-x-1">
            {pages.map((page, index) => (
              <div 
                key={page.id} 
                className={`h-1 w-8 rounded ${
                  index === currentPageIndex 
                    ? 'bg-metamaster-primary' 
                    : index < currentPageIndex 
                      ? 'bg-metamaster-gray-400' 
                      : 'bg-metamaster-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Page content with transition */}
      <div 
        className={`transition-opacity duration-300 ${
          pageTransition === 'exiting' ? 'opacity-0' : 
          pageTransition === 'entering' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className={`mx-auto ${
          device === 'mobile' ? 'max-w-sm' : 
          device === 'tablet' ? 'max-w-2xl' : 'max-w-4xl'
        }`}>
          {/* Render page content */}
          {parsedContent.map((element, index) => {
            // Get element-specific logic rules
            const elementRules = element?.id ? getRulesForElement(element.id) : [];
            
            return (
              <div key={`${element?.id || index}`} className="mb-6">
                <ContentElementRenderer
                  type={element?.type || 'text'}
                  content={element?.content || ''}
                  props={{
                    ...(element?.props || {}),
                    onNext: navigateToNextPage,
                    onPrevious: navigateToPreviousPage,
                  }}
                  device={device}
                  logicRules={elementRules}
                  formState={formState}
                  onFormChange={updateFormValue}
                  onSubmit={submitForm}
                />
              </div>
            );
          })}
          
          {/* Navigation controls for form/content pages */}
          {currentPage.type !== 'quiz' && currentPage.type !== 'form' && (
            <div className="flex justify-between items-center mt-8">
              {currentPageIndex > 0 && (
                <Button 
                  variant="outline" 
                  onClick={() => handlePageTransition('prev')}
                  className="flex items-center"
                >
                  <ArrowLeft size={16} className="mr-2" /> Back
                </Button>
              )}
              <div className="flex-1"></div>
              {currentPageIndex < pages.length - 1 && (
                <Button 
                  onClick={() => handlePageTransition('next')}
                  className="flex items-center"
                >
                  Next <ArrowRight size={16} className="ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunnelPlayer;
