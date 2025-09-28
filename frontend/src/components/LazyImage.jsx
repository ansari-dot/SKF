import React, { useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/usePerformance';

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder = '/placeholder.jpg',
  onLoad,
  onError,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const isIntersecting = useIntersectionObserver(imgRef);

  useEffect(() => {
    if (isIntersecting && !isLoaded && !hasError) {
      const img = new Image();

      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };

      img.onerror = () => {
        setHasError(true);
        setImageSrc(placeholder);
        onError?.();
      };

      img.src = src;
    }
  }, [isIntersecting, src, isLoaded, hasError, placeholder, onLoad, onError]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'} ${hasError ? 'error' : ''}`}
      {...props}
    />
  );
};

export default LazyImage;
