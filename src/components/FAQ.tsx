
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
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. If you cancel, you'll maintain access to your plan features until the end of your current billing cycle."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee on all plans. If you're not satisfied with your purchase, contact our support team within 14 days of your purchase for a full refund."
    },
    {
      question: "Do I need any technical skills to use AdKing?",
      answer: "No technical skills are required to use AdKing. Our platform is designed with an intuitive, user-friendly interface that makes it easy for anyone to discover winning ads, build campaigns, and manage their marketing efforts."
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 bg-adking-primary/10 text-adking-primary rounded-full mb-4">
          FAQ
        </div>
        <h2 className="text-4xl font-bold mb-4 text-adking-dark">
          Frequently Asked Questions
        </h2>
        <p className="text-adking-gray-600 text-lg">
          Still have questions? We've got answers.
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="bg-white rounded-xl border border-adking-gray-200 px-6 shadow-sm"
          >
            <AccordionTrigger className="text-lg text-adking-dark hover:text-adking-primary py-6">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-adking-gray-600 pb-6 text-base leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
