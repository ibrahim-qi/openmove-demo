'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress with smoother increments
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10 + 3; // Smaller, smoother increments
        if (newProgress >= 100) {
          clearInterval(interval);
          // Start fade out after loading complete with longer delay
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Longer fade out for smoothness
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 120); // Slightly faster updates for smoother progress

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-primary-500 flex items-center justify-center transition-opacity duration-500 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        {/* Footer Logo */}
        <div className="mb-8">
          <img
            src="/footer.png"
            alt="yoomoove"
            className="h-24 w-auto mx-auto mb-6 opacity-95 sm:h-28 md:h-32 lg:h-40 xl:h-48"
            style={{ 
              imageRendering: 'crisp-edges',
              filter: 'brightness(0) invert(1)'
            }}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Simple Loading Dots */}
        <div className="flex justify-center space-x-1.5">
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
