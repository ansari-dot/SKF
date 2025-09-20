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

export default getAbsoluteImageUrl;
