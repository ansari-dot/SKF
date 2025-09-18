const getAbsoluteImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/placeholder-logo.png';
  }

  if (imagePath.startsWith('/uploads/')) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiBaseUrl = apiUrl.replace('/api', '');

    // If VITE_API_URL points to localhost, but the current host is not localhost,
    // assume /uploads is relative to the current host.
    if (apiBaseUrl.includes('localhost') && window.location.hostname !== 'localhost') {
      return imagePath;
    } else {
      // Otherwise, use the full API base URL.
      return `${apiBaseUrl}${imagePath}`;
    }
  }
  return imagePath;
};

export default getAbsoluteImageUrl;