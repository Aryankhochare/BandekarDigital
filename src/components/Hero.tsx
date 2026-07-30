'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import Navbar from './Navbar';

function Counter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrameId: number;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startTimestamp = null;
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          setCount(0);
          if (animationFrameId) {
            window.cancelAnimationFrame(animationFrameId);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function Hero() {
  return (
    <section className={styles.heroSection} id="home">
      {/* Reusable Navbar */}
      <Navbar />

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.bgVideo}
      >
        <source src="https://cdn.sanity.io/files/7pct1njc/production/d9a38a0f5a0c28afee2befba7b70377fb8ad6ed5.mp4" type="video/mp4" />
      </video>
      <div className={styles.videoOverlay}></div>

      {/* Background glow layers */}
      <div className={styles.ambientGlowCyan}></div>
      <div className={styles.ambientGlowPurple}></div>
      <div className={styles.radialLighting}></div>


      {/* Hero Content */}
      <div className={`container ${styles.contentContainer}`}>
        <div className={styles.heroContainer}>
          {/* Left Text Column */}
          <div className={styles.heroLeft}>
            <div className={styles.heroTagline}>
              <span>Premium Signage & Branding Studio</span>
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.textLineWrapper}>
                <span className={styles.textLineInner} style={{ animationDelay: '0.1s' }}>WE BRAND</span>
              </span>
              <span className={styles.textLineWrapper}>
                <span className={styles.textLineInner} style={{ animationDelay: '0.3s' }}>
                  <span className={styles.gradientText}>SPACES</span>
                </span>
              </span>
            </h1>
            <p className={styles.heroDesc}>
              We craft architectural signage, custom printing, and high-impact digital imaging solutions that command attention and elevate your business presence.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact">
                <button className={styles.btnPrimary}>Get Quote</button>
              </a>
              <a href="#portfolio">
                <button className={styles.btnSecondary}>View Our Work</button>
              </a>
              <a href="https://wa.me/919822123456" target="_blank" rel="noopener noreferrer">
                <button className={styles.btnWhatsApp}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar (Immediately below hero content) */}
      <div className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                <Counter end={2000} suffix="+" />
              </span>
              <span className={styles.statLabel}>Projects Completed</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                <Counter end={15} suffix="+" />
              </span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                <Counter end={500} suffix="+" />
              </span>
              <span className={styles.statLabel}>Clients Served</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                <Counter end={98} suffix="%" />
              </span>
              <span className={styles.statLabel}>Client Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

