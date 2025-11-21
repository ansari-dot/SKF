// utils/imageUtils.js

// Get absolute URL for any image path
const getAbsoluteImageUrl = (imagePath) => {
  try {
    // Handle null, undefined, or empty string
    if (!imagePath) return '/placeholder-logo.png';

    // If it's already a full URL, return as is
    if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
      return imagePath;
    }

    // If imagePath is an object (like from Cloudinary)
    if (typeof imagePath === 'object' && imagePath !== null) {
      return imagePath.url || imagePath.secure_url || imagePath.publicUrl || '/placeholder-logo.png';
    }

    // Convert to string in case it's a number or other type
    let path = String(imagePath);

    // Handle paths starting with "uploads" or "/uploads"
    if (path.startsWith('uploads')) {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const apiBaseUrl = apiUrl.replace('/api', '');

      // Development: localhost
      if (window.location.hostname === 'local' && apiBaseUrl) {
        return `${apiBaseUrl}/${path}`;
      }

      // Production: use current domain
      return `${window.location.origin}/${path}`;
    }

    if (path.startsWith('/uploads')) {
      return `${window.location.origin}${path}`;
    }

    // Default: public assets
    return path;
  } catch (error) {
    console.error('Error processing image URL:', error, 'Image path:', imagePath);
    return '/placeholder-logo.png';
  }
};

// Image optimization (optional, can integrate Cloudinary later)
export const optimizeImageSrc = (src, width = 1200, quality = 80) => {
  if (!src) return '/placeholder-logo.png';
  if (src.startsWith('http') || src.includes('?')) return src;
  return src; // Return original for now
};

// Generate responsive image data
export const generateResponsiveImages = (baseSrc, alt, className = '') => {
  const sources = [
    { media: '(max-width: 768px)', width: 800 },
    { media: '(max-width: 1200px)', width: 1200 },
    { media: '(min-width: 1201px)', width: 1600 }
  ];

  return { src: baseSrc, alt, className, loading: 'lazy', sources };
};

// Preload a single image
export const preloadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });

// Preload multiple images
export const preloadImages = (imageSources) => Promise.all(imageSources.map(src => preloadImage(src)));

// Lazy-load image using IntersectionObserver
export const createLazyImage = (imgElement, src) => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = src;
        img.classList.remove('lazy');
        obs.unobserve(img);
      }
    });
  });

  observer.observe(imgElement);
  return observer;
};

export default getAbsoluteImageUrl;
