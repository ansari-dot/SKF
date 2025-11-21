// utils/imageUtils.js

// Get absolute URL for any image path
const getAbsoluteImageUrl = (imagePath) => {
  try {
    if (!imagePath) return '/placeholder-logo.png';

    // Already a full URL
    if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
      return imagePath;
    }

    // If imagePath is an object (Cloudinary, Strapi, etc.)
    if (typeof imagePath === 'object' && imagePath !== null) {
      return imagePath.url || imagePath.secure_url || imagePath.publicUrl || '/placeholder-logo.png';
    }

    // Convert to string for numbers or other types
    const path = String(imagePath);

    // Handle backend uploads
    if (path.startsWith('uploads') || path.startsWith('/uploads')) {
      const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
      return `${apiUrl.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`;
    }

    // Fallback to public assets
    return path;
  } catch (error) {
    console.error('Error processing image URL:', error, 'Image path:', imagePath);
    return '/placeholder-logo.png';
  }
};

// Optional: image optimization (placeholder for future Cloudinary integration)
export const optimizeImageSrc = (src, width = 1200, quality = 80) => {
  if (!src) return '/placeholder-logo.png';
  if (src.startsWith('http') || src.includes('?')) return src;
  return src; // No changes for now
};

// Generate responsive image data for <picture> element
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
  if (!imgElement) return;

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
