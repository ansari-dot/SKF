const getAbsoluteImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/placeholder-logo.png'; // fallback image
  }

  // If path starts with /uploads (covers subfolders too: /uploads/images, /uploads/profile etc.)
  if (imagePath.startsWith('/uploads')) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiBaseUrl = apiUrl.replace('/api', '');

    // Development: use backend API base URL (localhost)
    if (window.location.hostname === 'localhost') {
      return `${apiBaseUrl}${imagePath}`;
    }

    // Production: assume files are served by same domain (Hostinger/VPS)
    return `${window.location.origin}${imagePath}`;
  }

  // For already full URLs or public assets
  return imagePath;
};

export default getAbsoluteImageUrl;
