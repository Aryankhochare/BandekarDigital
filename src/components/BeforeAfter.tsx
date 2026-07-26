'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './BeforeAfter.module.css';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className={`section-padding ${styles.sliderSection}`} id="transformations">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.subTitle}>Visual Transformations</span>
          <h2 className={styles.mainTitle}>Real Project Impact</h2>
          <p className={styles.sectionDesc}>
            Drag the slider to see how premium signage and corporate branding visually transform local businesses.
          </p>
        </div>

        {/* Slider Container */}
        <div className={styles.sliderContainer}>
          <div className={styles.imageWrapper}>
            {/* Before Image (Background) */}
            <div className={styles.beforeImage}>
              <Image 
                src="/before_restaurant.png" 
                alt="Restaurant wall before branding"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
              <span className={`${styles.imageLabel} ${styles.beforeLabel}`}>Before Branding</span>
            </div>

            {/* After Image (Foreground, clipped) */}
            <div 
              className={styles.afterImage} 
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image 
                src="/after_restaurant.png" 
                alt="Restaurant wall after premium neon branding"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
              <span className={`${styles.imageLabel} ${styles.afterLabel}`}>Branded Signage</span>
            </div>

            {/* Slider Handle Line & Button */}
            <div 
              className={styles.sliderLine} 
              style={{ left: `${sliderPosition}%` }}
            >
              <div className={styles.sliderHandle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>

            {/* Native range input overlay to capture interactions */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPosition} 
              onChange={handleSliderChange}
              className={styles.sliderInput}
              aria-label="Before after image comparison slider"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
