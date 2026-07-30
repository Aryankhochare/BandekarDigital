'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryModal from '@/components/GalleryModal';
import { getEventItems } from '@/sanity/lib/fetchEvents';
import { EventItem } from '@/data/eventData';
import styles from './eventsPage.module.css';

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const fetched = await getEventItems();
      if (fetched && fetched.length > 0) {
        setEvents(fetched);
      }
    }
    loadData();
  }, []);

  // Helper to categorize regions
  const getRegion = (loc: string) => {
    const lower = loc.toLowerCase();
    if (lower.includes('vagator') || lower.includes('north')) return 'north';
    if (lower.includes('panaji') || lower.includes('bambolim') || lower.includes('hyatt') || lower.includes('central')) return 'central';
    if (lower.includes('lalit') || lower.includes('south')) return 'south';
    return 'other';
  };

  // Filtering logic
  const filteredEvents = events.filter((event) => {
    // 1. Location match
    const region = getRegion(event.location);
    const matchesLocation = selectedLocation === 'all' || region === selectedLocation;

    // 2. Type match
    const type = event.categoryGroup || 'other';
    const matchesType = selectedType === 'all' || type === selectedType;

    // 3. Search match
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLocation && matchesType && matchesSearch;
  });

  // Dynamically collect unique categories from active event items
  const categoryMap = new Map<string, string>();
  events.forEach(event => {
    const group = event.categoryGroup || 'other';
    const label = event.categoryLabel || 'Other Events';
    categoryMap.set(group, label);
  });

  const defaultCategoryOrder = ['festivals', 'corporate', 'culture', 'sports'];
  const eventCategories: { value: string; label: string }[] = [];

  defaultCategoryOrder.forEach(key => {
    if (categoryMap.has(key)) {
      eventCategories.push({ value: key, label: categoryMap.get(key)! });
      categoryMap.delete(key);
    }
  });

  categoryMap.forEach((label, value) => {
    eventCategories.push({ value, label });
  });

  const handleCardClick = (event: EventItem) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />

      {/* Floating Background Glow Blobs */}
      <div className="bg-blobs-container">
        <div className="blob-1" style={{ animationDelay: '3s' }}></div>
        <div className="blob-2" style={{ animationDelay: '1s' }}></div>
        <div className="blob-3" style={{ animationDelay: '5s' }}></div>
      </div>

      <main className={styles.eventsPage} id="events-page">
        {/* Page Hero */}
        <section className={styles.pageHero}>
          <div className="container">
            <div className={styles.heroContent}>
              <span className={styles.subTitle}>Live Setup Showcase</span>
              <h1 className={styles.mainTitle}>Signature Events & Branding</h1>
              <p className={styles.heroDesc}>
                Explore the scale and impact of festivals, summits, and exhibitions we have fabricated and branded. We build entry arches, stages, backlit fabric signs, and premium trophies.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Controls Panel */}
        <section className={styles.controlsSection}>
          <div className="container">
            <div className={styles.controlsGrid}>
              {/* Search Bar */}
              <div className={styles.searchWrapper}>
                <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search events (e.g. sunburn, arches, Hyatt...)"
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

              {/* Location Region Selection */}
              <div className={styles.filterGroup}>
                <span className={styles.filterGroupLabel}>Location / Region:</span>
                <div className={styles.buttonTabs}>
                  {[
                    { value: 'all', label: 'All Locations' },
                    { value: 'north', label: 'North Goa' },
                    { value: 'central', label: 'Central Goa' },
                    { value: 'south', label: 'South Goa' },
                  ].map((loc) => (
                    <button
                      key={loc.value}
                      className={`${styles.tabBtn} ${selectedLocation === loc.value ? styles.activeTabBtn : ''}`}
                      onClick={() => setSelectedLocation(loc.value)}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Event Type / Theme Dropdown */}
              <div className={styles.filterGroup}>
                <span className={styles.filterGroupLabel}>Event Category:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={styles.selectDropdown}
                >
                  <option value="all">All Event Types</option>
                  {eventCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Events Cards Grid */}
        <section className={styles.gridSection}>
          <div className="container">
            {filteredEvents.length > 0 ? (
              <div className={styles.eventsGrid}>
                {filteredEvents.map((event) => (
                  <div
                    key={event.title}
                    className={`${styles.eventCard} ${styles[event.hoverClass]}`}
                    onClick={() => handleCardClick(event)}
                  >
                    {/* Background Cover Image */}
                    <Image
                      src={event.coverImage}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 550px"
                      style={{ objectFit: 'cover' }}
                      className={styles.cardImage}
                    />

                    {/* Dark Gradient overlay */}
                    <div className={styles.cardOverlay}>
                      {/* Event details container */}
                      <div className={styles.cardContent}>
                        {/* Meta badges */}
                        <div className={styles.cardMeta}>
                          <span className={styles.clientBadge}>{event.client}</span>
                          <span className={`${styles.dateBadge} ${styles[event.tagClass]}`}>
                            {event.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className={styles.cardTitle}>{event.title}</h3>

                        {/* Location */}
                        <div className={styles.cardLocation}>
                          <svg
                            className={styles.locationIcon}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{event.location}</span>
                        </div>

                        {/* Description (reveals on hover on desktop) */}
                        <p className={styles.cardDesc}>{event.desc}</p>

                        {/* View Gallery Link */}
                        <div className={styles.actionLink}>
                          <span className={styles[event.textClass]}>Explore Event Gallery</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={styles[event.textClass]}
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
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
                <h3>No events found</h3>
                <p>We couldn&apos;t find any events matching &ldquo;{searchQuery}&rdquo;. Try adjusting your filters or search terms.</p>
                <button
                  className={styles.resetBtn}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedLocation('all');
                    setSelectedType('all');
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
              <h2>Planning a Corporate Launch or Live Festival?</h2>
              <p>We provide full fabrication, structural build, stage installations, and premium glowing backdrops at any scale across Goa.</p>
              <Link href="/#contact">
                <button className={styles.ctaButton}>Get in Touch</button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Blurred Overlay Photo Gallery Modal */}
      <GalleryModal
        isOpen={isModalOpen}
        category={
          selectedEvent
            ? {
                title: selectedEvent.title,
                desc: selectedEvent.desc,
                images: selectedEvent.images,
              }
            : null
        }
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
