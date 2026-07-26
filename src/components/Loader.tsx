'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Loader.module.css';

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Lock scrolling on mount
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setFade(true);
      const removeTimer = setTimeout(() => {
        setVisible(false);
        // Restore scrolling on unmount
        document.body.style.overflow = 'unset';
      }, 800); // Wait for translation to complete
      return () => clearTimeout(removeTimer);
    }, 2800); // Loader displays for 2.8s

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!visible) return null;

  const titleText = "BANDEKAR'S";

  return (
    <div className={`${styles.loaderContainer} ${fade ? styles.fadeOut : ''}`}>
      <div className={styles.loaderContent}>
        <div className={styles.loaderLogoWrapper}>
          <div className={styles.logoGlowRing}></div>
          <Image
            src="/logo.jpg"
            alt="Bandekar's Digital Imaging Logo"
            width={180}
            height={180}
            className={styles.loaderLogo}
            priority
          />
          <div className={styles.scannerLine}></div>
        </div>
        <h1 className={styles.loaderText}>
          {titleText.split('').map((char, index) => (
            <span key={index} className={styles.char} style={{ animationDelay: `${index * 0.05}s` }}>
              {char}
            </span>
          ))}
        </h1>
        <p className={styles.loaderSubtext}>Printing Ideas Into Reality</p>
        <div className={styles.loaderProgress}>
          <div className={styles.loaderProgressBar}></div>
        </div>
      </div>
    </div>
  );
}
