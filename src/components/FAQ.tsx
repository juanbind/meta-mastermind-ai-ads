
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
      answer: "Our 7-day free trial includes full access to all features of the plan you select. This allows you to explore the complete platform including the ad library, AI Media Buyer, funnel builder, and CRM, depending on the plan you choose."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference for the remainder of your billing cycle. If you downgrade, the new plan will take effect at the start of your next billing cycle."
    },
    {
      question: "Is there a limit to how many ads I can save?",
      answer: "The Starter plan allows you to save up to 100 ads, Pro plan increases this to 500, and Agency plan offers unlimited ad saving. These limits reset monthly, and you can always delete saved ads to make room for new ones."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as PayPal for payment. All payments are securely processed and encrypted."
    },
    {
      question: "Do you offer any discounts for annual billing?",
      answer: "Yes, we offer a 20% discount when you choose annual billing. This option is available for all plans and represents a significant savings compared to monthly billing."
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-12 reveal-element" data-animation="fade-up">
        <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
        <p className="text-metamaster-gray-400">Everything you need to know about our pricing plans</p>
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="reveal-element bg-metamaster-gray-800/50 rounded-lg border border-metamaster-gray-700/50 px-4"
            data-animation="fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <AccordionTrigger className="text-white hover:text-metamaster-primary">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-metamaster-gray-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
