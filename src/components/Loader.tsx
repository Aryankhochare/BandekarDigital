'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Loader.module.css';

export default function Loader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if loader has run in this session
    const hasRun = sessionStorage.getItem('loader-has-run');
    if (hasRun) {
      setVisible(false);
      return;
    }

    // Lock scrolling on mount
    document.body.style.overflow = 'hidden';
    sessionStorage.setItem('loader-has-run', 'true');

    const timer = setTimeout(() => {
      setFade(true);
      const removeTimer = setTimeout(() => {
        setVisible(false);
        // Restore scrolling on unmount
        document.body.style.overflow = 'unset';

        // Scroll to hash if present after loader hides
        if (window.location.hash) {
          const id = window.location.hash.substring(1);
          const element = document.getElementById(id);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }
        }
      }, 800); // Wait for translation to complete
      return () => clearTimeout(removeTimer);
    }, 2800); // Loader displays for 2.8s

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted || !visible) return null;

  const titleText = "BANDEKAR'S";

  return (
    <div className={`${styles.loaderContainer} ${fade ? styles.fadeOut : ''}`}>
      <div className={styles.loaderContent}>
        <div className={styles.loaderLogoWrapper}>
          <div className={styles.logoGlowRing}></div>
          <Image
            src="https://cdn.sanity.io/files/7pct1njc/production/47c5b894e9cf34ab2dab6fcf67a81a9cf3e3352c.jpg"
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
