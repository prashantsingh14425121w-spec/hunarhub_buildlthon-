/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  badgeLabel?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  badgeLabel,
  className = '',
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <div className="relative overflow-hidden w-full h-full">
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className={`w-full h-full object-cover transition-transform duration-300 ${className}`}
        loading="lazy"
        {...props}
      />
      {badgeLabel && (
        <span className="absolute bottom-2 left-2 bg-[#1c1f1d]/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
          {badgeLabel}
        </span>
      )}
    </div>
  );
}
