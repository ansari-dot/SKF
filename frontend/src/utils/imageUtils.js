const getAbsoluteImageUrl = (imagePath) => {
  try {
    if (!imagePath) {
      return '/placeholder-logo.png';
    }

    // Already full URL
    if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
      return imagePath;
    }

    // If object (Cloudinary type)
    if (typeof imagePath === 'object' && imagePath !== null) {
      return imagePath.url || imagePath.secure_url || imagePath.publicUrl || '/placeholder-logo.png';
    }

    const path = String(imagePath);

    // FIX: Always add /uploads/images/ before filename
    // If the path already includes /uploads/images — return normally
    if (path.includes('/uploads/images/')) {
      return `${window.location.origin}${path}`;
    }

    // If frontend sends only filename → FIX HERE
    // example: 1763728142373-971499833.jpg
    if (!path.startsWith('/uploads')) {
      return `${window.location.origin}/uploads/images/${path}`;
    }

    // If it starts with /uploads but missing /images
    if (path.startsWith('/uploads')) {
      return `${window.location.origin}/uploads/images/${path.replace('/uploads/', '')}`;
    }

    return path;
  } catch (error) {
    console.error('Error processing image URL:', error, 'Image path:', imagePath);
    return '/placeholder-logo.png';
  }
};

export default getAbsoluteImageUrl;
