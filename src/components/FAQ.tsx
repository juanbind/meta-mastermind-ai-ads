
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What's included in the free trial?",
      answer: "Our 14-day free trial includes full access to all platform features including the ad library, AI campaign builder, funnel builder, and team collaboration tools. No credit card required to start."
    },
    {
      question: "How does the AI campaign builder work?",
      answer: "Our AI analyzes thousands of successful Facebook ads to create optimized campaign strategies. Simply answer a few questions about your business and goals, and the AI will generate a complete campaign structure with targeting recommendations."
    },
    {
      question: "Can I import my existing ads and funnels?",
      answer: "Yes! MetaMaster supports importing your existing Facebook ads, landing pages, and funnels. Our platform will analyze your current assets and provide AI-powered recommendations for optimization."
    },
    {
      question: "Do you offer agency features?",
      answer: "Absolutely! Our Agency plan includes multi-client management, white-label reporting, team collaboration tools, and unlimited ad research. Perfect for agencies managing multiple client accounts."
    },
    {
      question: "What makes MetaMaster different?",
      answer: "Unlike other tools, MetaMaster combines AI-powered ad research, campaign creation, and funnel building in one platform. Our AI learns from millions of ads to provide data-driven recommendations unique to your business."
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-12 reveal-element" data-animation="fade-up">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-metamaster-gray-400 text-lg">
          Everything you need to know about our platform
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="reveal-element bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-6"
            data-animation="fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <AccordionTrigger className="text-lg text-white hover:text-metamaster-primary py-6">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-metamaster-gray-400 pb-6 text-base leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
