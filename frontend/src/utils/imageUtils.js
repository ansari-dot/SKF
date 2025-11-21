// -------------------------------
// getAbsoluteImageUrl.js
// -------------------------------

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

    // Case 1: Already has /uploads/images/
    if (path.includes('/uploads/images/')) {
      return `${window.location.origin}${path}`;
    }

    // Case 2: Only filename (no /uploads/)
    if (!path.startsWith('/uploads')) {
      return `${window.location.origin}/uploads/images/${path}`;
    }

    // Case 3: Starts with /uploads but missing /images
    if (path.startsWith('/uploads')) {
      return `${window.location.origin}/uploads/images/${path.replace('/uploads/', '')}`;
    }

    // Fallback: return as is
    return path;
  } catch (error) {
    console.error('Error processing image URL:', error, 'Image path:', imagePath);
    return '/placeholder-logo.png';
  }
};

// -------------------------------
// Image optimization utility
// -------------------------------
export const optimizeImageSrc = (src, width = 1200, quality = 80) => {
  if (src.includes('?') || src.startsWith('http')) {
    return src;
  }

  // Add your image optimization logic here if needed
  return src;
};

// -------------------------------
// Generate responsive images
// -------------------------------
export const generateResponsiveImages = (baseSrc, alt, className = '') => {
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

// -------------------------------
// Image preloader utility
// -------------------------------
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

// Batch preloader
export const preloadImages = (imageSources) => {
  const promises = imageSources.map(src => preloadImage(src));
  return Promise.all(promises);
};

// -------------------------------
// Lazy loading with IntersectionObserver
// -------------------------------
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

// -------------------------------
// Export default
// -------------------------------
export default getAbsoluteImageUrl;
