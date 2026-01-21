'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc = 'https://via.placeholder.com/600x338?text=Image+Not+Found',
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={cn('transition-opacity duration-300', className)}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
