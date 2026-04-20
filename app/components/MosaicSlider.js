'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { register, setVisible } from './sliderScheduler';

const TRANSITION_MS = 2000;
const IMAGE_SIZES = '(max-width: 600px) 100vw, (max-width: 960px) 50vw, 50vw';

export default function MosaicSlider({ images, alt }) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);

  const count = images.length;

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;

    const subscriber = { visible: false, imageCount: count, advance };

    const unregister = register(subscriber);

    const el = containerRef.current;
    if (!el) return unregister;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(subscriber, entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      unregister();
    };
  }, [count, advance]);

  if (count === 1) {
    return (
      <Image
        src={images[0]}
        alt={alt}
        fill
        sizes={IMAGE_SIZES}
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <div ref={containerRef} className="mosaic-slider">
      <div
        className="mosaic-slider__track"
        style={{
          width: `${count * 100}%`,
          transform: `translateX(-${(current * 100) / count}%)`,
          transitionDuration: `${TRANSITION_MS}ms`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="mosaic-slider__slide"
            style={{ width: `${100 / count}%` }}
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              sizes={IMAGE_SIZES}
              className="mosaic-slider__img"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
