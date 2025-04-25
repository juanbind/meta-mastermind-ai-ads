
import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Enhanced child element animation with more variety
            if (entry.target.children.length > 0) {
              Array.from(entry.target.children).forEach((child, index) => {
                const animationDelay = index * 200; // Increased delay for more pronounced effect
                const randomTransform = [
                  'translateY(20px)',
                  'translateX(-20px)',
                  'scale(0.9)',
                  'rotate(5deg)'
                ];
                
                setTimeout(() => {
                  (child as HTMLElement).classList.add('child-visible');
                  (child as HTMLElement).style.transform = randomTransform[index % randomTransform.length];
                }, animationDelay);
              });
            }
          } else {
            entry.target.classList.remove('visible');
            Array.from(entry.target.children).forEach((child) => {
              (child as HTMLElement).classList.remove('child-visible');
              (child as HTMLElement).style.transform = '';
            });
          }
        });
      },
      { 
        threshold: 0.15, 
        rootMargin: '0px 0px -10% 0px'
      }
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

// Enhanced scroll reveal hook with more animation variety
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
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('revealed');
            
            // Additional classes for more dynamic animations
            const animationType = target.dataset.animation;
            switch(animationType) {
              case 'pop':
                target.classList.add('animate-[pop_0.5s_ease-out]');
                break;
              case 'bounce':
                target.classList.add('animate-[bounce_0.5s_ease-in-out]');
                break;
            }
          } else {
            const target = entry.target as HTMLElement;
            target.classList.remove('revealed');
            target.classList.remove('animate-[pop_0.5s_ease-out]');
            target.classList.remove('animate-[bounce_0.5s_ease-in-out]');
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

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
