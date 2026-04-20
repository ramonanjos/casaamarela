'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { register, setVisible } from './sliderScheduler';

const TRANSITION_MS = 2000;

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
      <img
        src={images[0]}
        alt={alt}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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
          <img
            key={src}
            src={src}
            alt={`${alt} ${i + 1}`}
            loading="lazy"
            className="mosaic-slider__img"
            style={{ width: `${100 / count}%` }}
          />
        ))}
      </div>
    </div>
  );
}
