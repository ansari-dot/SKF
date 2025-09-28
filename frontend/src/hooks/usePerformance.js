import { useEffect, useState } from 'react';

// Hook to defer loading of non-critical resources
export const useDeferredLoading = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Defer loading of non-critical resources
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Small delay to ensure critical rendering is complete

    return () => clearTimeout(timer);
  }, []);

  return isLoaded;
};

// Hook to handle intersection observer for lazy loading
export const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isIntersecting;
};

// Hook to preload critical resources
export const useResourcePreloader = (resources) => {
  useEffect(() => {
    resources.forEach(resource => {
      if (resource.type === 'image') {
        const img = new Image();
        img.src = resource.src;
      } else if (resource.type === 'script') {
        const script = document.createElement('script');
        script.src = resource.src;
        script.defer = true;
        document.head.appendChild(script);
      } else if (resource.type === 'link') {
        const link = document.createElement('link');
        link.rel = resource.rel;
        link.href = resource.href;
        document.head.appendChild(link);
      }
    });
  }, [resources]);
};

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vitals' in window) {
      // This would require importing web-vitals library
      // For now, we'll use basic performance API
    }

    // Basic performance monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          console.log('CLS:', entry.value);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    return () => observer.disconnect();
  }, []);
};
