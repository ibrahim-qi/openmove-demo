'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

interface LoadingProviderProps {
  children: React.ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Preload critical resources and ensure smooth transition
    const preloadResources = async () => {
      // Wait for fonts to load
      if (document.fonts) {
        await document.fonts.ready;
      }

      // Preload critical images
      const criticalImages = ['/header.png', '/footer.png'];
      const imagePromises = criticalImages.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails
          img.src = src;
        });
      });

      await Promise.all(imagePromises);
      setContentReady(true);
    };

    preloadResources();

    // Minimum loading time for smooth experience
    const minLoadTime = 2000; // 2 seconds minimum
    const timer = setTimeout(() => {
      if (contentReady) {
        setIsLoading(false);
      }
    }, minLoadTime);

    return () => clearTimeout(timer);
  }, [contentReady]);

  // Once content is ready and minimum time has passed, allow loading to complete
  useEffect(() => {
    if (contentReady && !isLoading) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 100); // Small delay to ensure smooth transition
      return () => clearTimeout(timer);
    }
  }, [contentReady, isLoading]);

  const handleLoadingComplete = () => {
    // Smooth transition with slight delay
    setTimeout(() => {
      setShowContent(true);
    }, 200);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div 
        className={`transition-all duration-700 ease-out ${
          showContent 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        }`}
        style={{ 
          visibility: showContent ? 'visible' : 'hidden',
          pointerEvents: showContent ? 'auto' : 'none'
        }}
      >
        {children}
      </div>
    </>
  );
}
