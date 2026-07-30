'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryModal from '@/components/GalleryModal';
import { getPortfolioItems } from '@/sanity/lib/fetchPortfolio';
import { PortfolioCategory } from '@/data/portfolioData';
import styles from './portfolioPage.module.css';

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const fetched = await getPortfolioItems();
      if (fetched && fetched.length > 0) {
        setItems(fetched);
      }
    }
    loadData();
  }, []);

  // Filter logic
  const filteredItems = items.filter((item) => {
    const matchesCategory = activeFilter === 'all' || item.filterGroup === activeFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.filterLabel && item.filterLabel.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Extract unique filters
  const filterMap = new Map<string, string>();
  items.forEach((item) => {
    if (item.filterGroup && item.filterGroup !== 'all') {
      filterMap.set(item.filterGroup, item.filterLabel || item.category || 'Specialized');
    }
  });

  const defaultOrder = ['signs', 'printing', 'gifts', 'other'];
  const filters: { value: string; label: string }[] = [{ value: 'all', label: 'All Work' }];

  defaultOrder.forEach((key) => {
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
    <>
      <Navbar />

      {/* Floating Background Glow Blobs */}
      <div className="bg-blobs-container">
        <div className="blob-1" style={{ animationDelay: '2s' }}></div>
        <div className="blob-2" style={{ animationDelay: '4s' }}></div>
        <div className="blob-3" style={{ animationDelay: '1s' }}></div>
      </div>

      <main className={styles.portfolioPage} id="portfolio-page">
        {/* Hero Section */}
        <section className={styles.pageHero}>
          <div className="container">
            <div className={styles.heroContent}>
              <span className={styles.subTitle}>Creative Showcase</span>
              <h1 className={styles.mainTitle}>Featured Work Gallery</h1>
              <p className={styles.heroDesc}>
                Explore our full digital portfolio of custom acrylic signs, wide-format prints, neon lighting installations, and premium corporate merchandise.
              </p>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar Section */}
        <section className={styles.controlsSection}>
          <div className="container">
            <div className={styles.controlsContainer}>
              {/* Text Search Input */}
              <div className={styles.searchWrapper}>
                <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search work (e.g. acrylic, neon, uniforms...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                {searchQuery && (
                  <button className={styles.clearBtn} onClick={() => setSearchQuery('')} aria-label="Clear Search">
                    ✕
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
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
          </div>
        </section>

        {/* Portfolio Bento Grid */}
        <section className={styles.gridSection}>
          <div className="container">
            {filteredItems.length > 0 ? (
              <div className={styles.portfolioGrid}>
                {filteredItems.map((item) => (
                  <div
                    key={item.title + item.category}
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
            ) : (
              <div className={styles.noResults}>
                <svg className={styles.noResultsIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                  <path d="M8 11h6" />
                </svg>
                <h3>No work found</h3>
                <p>We couldn&apos;t find any portfolio items matching &ldquo;{searchQuery}&rdquo;. Try adjusting your filters or search terms.</p>
                <button
                  className={styles.resetBtn}
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA section */}
        <section className={styles.pageCta}>
          <div className="container">
            <div className={styles.ctaCard}>
              <h2>Have a custom branding requirement?</h2>
              <p>Let&apos;s collaborate to bring your signs, banners, printing ideas, and logo identity designs into reality.</p>
              <Link href="/#contact">
                <button className={styles.ctaButton}>Get a Free Quote</button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Blurred Overlay Photo Gallery Modal */}
      <GalleryModal
        isOpen={isModalOpen}
        category={selectedCategory}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
