'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Services.module.css';
import { portfolioData, PortfolioCategory } from '@/data/portfolioData';
import GalleryModal from './GalleryModal';

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // We can display all categories in the capabilities scroller
  const services: PortfolioCategory[] = portfolioData;

  const handleCardClick = (service: PortfolioCategory) => {
    setSelectedCategory(service);
    setIsModalOpen(true);
  };

  return (
    <section className={`section-padding ${styles.servicesSection}`} id="services">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.subTitle}>Capabilities</span>
            <h2 className={styles.mainTitle}>Premium Visual Production</h2>
          </div>
          <p className={styles.sectionDesc}>
            From large-format facade channel boards to custom engraving, apparel printing, and promotional branding.
          </p>
        </div>

        {/* Services scroller */}
        <div className={styles.servicesScrollerWrapper}>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div 
                key={service.category} 
                className={styles.serviceCard}
                onClick={() => handleCardClick(service)}
                style={{ cursor: 'pointer' }}
              >
                {/* Background Image */}
                <Image
                  src={service.coverImage}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 85vw, 380px"
                  className={styles.cardImage}
                />

                {/* Dark Gradient Overlay */}
                <div className={styles.cardOverlay}>
                  {/* Service Details */}
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardDesc}>{service.desc}</p>
                    
                    <div className={styles.exploreLink}>
                      <span className={styles[service.textClass]}>View Gallery</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles[service.textClass]}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe indicator for horizontal scroller */}
          <div className={styles.scrollIndicator}>
            <span className={styles.indicatorText}>Scroll horizontally to explore all capabilities</span>
            <div className={styles.indicatorTrack}>
              <div className={styles.indicatorBar}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Blurred Overlay Photo Gallery Modal */}
      <GalleryModal 
        isOpen={isModalOpen} 
        category={selectedCategory} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
