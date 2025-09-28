const getAbsoluteImageUrl = (imagePath) => {
  try {
    // Handle null, undefined, or empty string
    if (!imagePath) {
      return '/placeholder-logo.png';
    }

    // If it's already a full URL, return as is
    if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
      return imagePath;
    }

    // Handle case where imagePath might be an object (like from Cloudinary)
    if (typeof imagePath === 'object' && imagePath !== null) {
      // Try common URL properties
      return imagePath.url || imagePath.secure_url || imagePath.publicUrl || '/placeholder-logo.png';
    }

    // Convert to string in case it's a number or other type
    const path = String(imagePath);

    // If path starts with /uploads (covers subfolders too: /uploads/images, /uploads/profile etc.)
    if (path.startsWith('/uploads')) {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const apiBaseUrl = apiUrl.replace('/api', '');

      // Development: use backend API base URL (localhost)
      if (window.location.hostname === 'localhost' && apiBaseUrl) {
        return `${apiBaseUrl}${path}`;
      }

      // Production: use current domain
      return `${window.location.origin}${path}`;
    }

    // For public assets or relative paths
    return path;
  } catch (error) {
    console.error('Error processing image URL:', error, 'Image path:', imagePath);
    return '/placeholder-logo.png';
  }
};

// Image optimization utility
export const optimizeImageSrc = (src, width = 1200, quality = 80) => {
  // If it's already an optimized URL or external URL, return as is
  if (src.includes('?') || src.startsWith('http')) {
    return src;
  }

  // For local images, we can add optimization parameters if needed
  // For now, we'll just return the original src
  // In production, you might want to use a service like Cloudinary or similar
  return src;
};

export const generateResponsiveImages = (baseSrc, alt, className = '') => {
  // Generate responsive image sources for different screen sizes
  const sources = [
    { media: '(max-width: 768px)', width: 800 },
    { media: '(max-width: 1200px)', width: 1200 },
    { media: '(min-width: 1201px)', width: 1600 }
  ];

  return {
    src: baseSrc,
    alt,
    className,
    loading: 'lazy',
    sources
  };
};

// Image preloader utility
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

// Batch image preloader
export const preloadImages = (imageSources) => {
  const promises = imageSources.map(src => preloadImage(src));
  return Promise.all(promises);
};

// Lazy loading utility with intersection observer
export const createLazyImage = (imgElement, src) => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  imageObserver.observe(imgElement);
  return imageObserver;
};

export default getAbsoluteImageUrl;
