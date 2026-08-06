'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Portfolio.module.css';
import { PortfolioCategory, portfolioData } from '@/data/portfolioData';
import { getPortfolioItems } from '@/sanity/lib/fetchPortfolio';
import GalleryModal from './GalleryModal';

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioCategory[]>(portfolioData);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadSanityData() {
      const fetchedItems = await getPortfolioItems();
      if (fetchedItems && fetchedItems.length > 0) {
        setItems(fetchedItems);
      }
    }
    loadSanityData();
  }, []);

  const filteredItems = (activeFilter === 'all' 
    ? items 
    : items.filter(item => item.filterGroup === activeFilter)
  ).slice(0, 6);

  // Dynamic filter buttons based on active data
  const filterMap = new Map<string, string>();
  items.forEach(item => {
    if (item.filterGroup && item.filterGroup !== 'all') {
      filterMap.set(item.filterGroup, item.filterLabel || item.category || 'Specialized');
    }
  });

  const defaultOrder = ['signs', 'printing', 'gifts', 'other'];
  const filters: { value: string; label: string }[] = [
    { value: 'all', label: 'All Work' }
  ];

  defaultOrder.forEach(key => {
    if (filterMap.has(key)) {
      filters.push({ value: key, label: filterMap.get(key)! });
      filterMap.delete(key);
    }
  });

  filterMap.forEach((label, value) => {
    filters.push({ value, label });
  });

  const handleItemClick = (item: PortfolioCategory) => {
    setSelectedCategory(item);
    setIsModalOpen(true);
  };

  return (
    <section className={`section-padding ${styles.portfolioSection}`} id="portfolio">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.titleWrapper}>
            <span className={styles.subTitle}>Featured Work</span>
            <h2 className={styles.mainTitle}>Crafting Visual Brands</h2>
          </div>

          {/* Filter Navigation */}
          <ul className={styles.filterControls}>
            {filters.map((filter) => (
              <li key={filter.value}>
                <button 
                  className={`${styles.filterBtn} ${activeFilter === filter.value ? styles.activeFilterBtn : ''}`}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Portfolio Grid */}
        <div className={styles.portfolioGrid}>
          {filteredItems.map((item, idx) => (
            <div 
              key={item._id || `${item.title}-${item.category}-${idx}`} 
              className={`${styles.gridItem} ${item.sizeClass ? styles[item.sizeClass] : ''} ${styles[item.hoverClass]}`}
              onClick={() => handleItemClick(item)}
            >

              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                className={styles.itemImage}
                placeholder={item.lqip ? 'blur' : undefined}
                blurDataURL={item.lqip}
              />
              
              {/* Info Overlay */}
              <div className={styles.itemOverlay}>
                <span className={`${styles.itemCategory} ${styles[item.textClass]}`}>{item.filterLabel}</span>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDesc}>{item.desc}</p>
                
                {/* Arrow Reveal Button */}
                <div className={styles.arrowBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={styles.ctaWrapper} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/portfolio">
            <button className={styles.loadMoreBtn} style={{ borderColor: 'var(--accent-cyan)', boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)' }}>
              View Full Gallery
            </button>
          </Link>
          <a href="#contact">
            <button className={styles.loadMoreBtn}>Discuss Your Project</button>
          </a>
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
