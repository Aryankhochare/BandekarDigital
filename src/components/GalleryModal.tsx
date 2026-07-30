'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './GalleryModal.module.css';

interface GalleryModalProps {
  isOpen: boolean;
  category: {
    title: string;
    desc: string;
    images: string[];
  } | null;
  onClose: () => void;
}

const isVideo = (path: string) => {
  if (!path) return false;
  const lowerPath = path.toLowerCase();
  return (
    lowerPath.endsWith('.mp4') ||
    lowerPath.endsWith('.webm') ||
    lowerPath.endsWith('.mov') ||
    lowerPath.includes('/files/') ||
    lowerPath.includes('.mp4')
  );
};

export default function GalleryModal({ isOpen, category, onClose }: GalleryModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [prevCategoryTitle, setPrevCategoryTitle] = useState<string | null>(category?.title || null);
  const modalRef = useRef<HTMLDivElement>(null);

  const currentTitle = category?.title || null;
  if (currentTitle !== prevCategoryTitle) {
    setPrevCategoryTitle(currentTitle);
    setLoadedImages({});
    setActiveImageIndex(null);
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle keyboard events (Escape to close, Left/Right arrows to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (activeImageIndex !== null) {
          setActiveImageIndex(null); // Close lightbox first
        } else {
          onClose(); // Close gallery modal
        }
      } else if (e.key === 'ArrowRight' && activeImageIndex !== null && category) {
        setActiveImageIndex((prev) => 
          prev !== null ? (prev + 1) % category.images.length : null
        );
      } else if (e.key === 'ArrowLeft' && activeImageIndex !== null && category) {
        setActiveImageIndex((prev) => 
          prev !== null ? (prev - 1 + category.images.length) % category.images.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeImageIndex, category, onClose]);

  if (!isOpen || !category) return null;

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => 
      prev !== null ? (prev + 1) % category.images.length : null
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => 
      prev !== null ? (prev - 1 + category.images.length) % category.images.length : null
    );
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose} ref={modalRef}>
      {/* Background Glow Blobs for aesthetics */}
      <div className={styles.modalBgBlobs}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
      </div>

      {/* Close Button */}
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Gallery">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Main Container */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header Section */}
        <div className={styles.modalHeader}>
          <span className={styles.photoCount}>{category.images.length} Project Photos</span>
          <h2 className={styles.modalTitle}>{category.title}</h2>
          <p className={styles.modalDesc}>{category.desc}</p>
        </div>

        {/* Image Grid */}
        <div className={styles.imageGrid}>
          {category.images.map((imagePath, idx) => (
            <div 
              key={idx} 
              className={styles.gridItem} 
              onClick={() => setActiveImageIndex(idx)}
            >
              {/* Shimmer Placeholder */}
              {!loadedImages[idx] && !isVideo(imagePath) && <div className={styles.shimmer}></div>}
              
              {isVideo(imagePath) ? (
                <video
                  src={imagePath}
                  className={`${styles.gridImage} ${styles.imageLoaded}`}
                  muted
                  playsInline
                  autoPlay
                  loop
                  style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block' }}
                />
              ) : (
                <Image
                  src={imagePath}
                  alt={`${category.title} detail photo ${idx + 1}`}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className={`${styles.gridImage} ${loadedImages[idx] ? styles.imageLoaded : ''}`}
                  onLoad={() => handleImageLoad(idx)}
                  loading="lazy"
                />
              )}

              <div className={styles.gridItemHover}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-Lightbox View (Single Image Zoomed-In Overlay) */}
      {activeImageIndex !== null && (
        <div className={styles.lightboxOverlay} onClick={() => setActiveImageIndex(null)}>
          <button className={styles.lightboxClose} onClick={() => setActiveImageIndex(null)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Left Arrow */}
          <button className={styles.navBtnLeft} onClick={prevImage} aria-label="Previous Image">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Large Image Showcase */}
          <div className={styles.lightboxImageContainer} onClick={(e) => e.stopPropagation()}>
            {isVideo(category.images[activeImageIndex]) ? (
              <video
                src={category.images[activeImageIndex]}
                controls
                autoPlay
                playsInline
                className={styles.lightboxImage}
                style={{ width: '100%', height: '100%', maxHeight: '80vh', outline: 'none' }}
              />
            ) : (
              <Image
                src={category.images[activeImageIndex]}
                alt={`${category.title} large photo ${activeImageIndex + 1}`}
                fill
                sizes="90vw"
                className={styles.lightboxImage}
                style={{ objectFit: 'contain' }}
                priority
              />
            )}
            
            {/* Lightbox Caption */}
            <div className={styles.lightboxCaption}>
              <span>{category.title}</span>
              <span>{activeImageIndex + 1} / {category.images.length}</span>
            </div>
          </div>

          {/* Right Arrow */}
          <button className={styles.navBtnRight} onClick={nextImage} aria-label="Next Image">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
