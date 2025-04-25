
import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add staggered animation for child elements if they exist
            if (entry.target.children.length > 0) {
              Array.from(entry.target.children).forEach((child, index) => {
                setTimeout(() => {
                  (child as HTMLElement).classList.add('child-visible');
                }, index * 150); // Stagger each child by 150ms
              });
            }
          } else {
            // Optional: Remove the class when element is not in view
            // This will reset the animation when scrolling up and down
            entry.target.classList.remove('visible');
            Array.from(entry.target.children).forEach((child) => {
              (child as HTMLElement).classList.remove('child-visible');
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' } // Trigger slightly before element comes into view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
};

// Add another hook for more elaborate animations
export const useScrollReveal = () => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if target is in view
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          } else {
            // Reset animation when out of view for repeating effect
            entry.target.classList.remove('revealed');
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    // Observe all refs
    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return addToRefs;
};
