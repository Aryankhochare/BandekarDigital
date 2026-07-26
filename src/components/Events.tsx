'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Events.module.css';
import { eventData as staticEventData, EventItem } from '@/data/eventData';
import { getEventItems } from '@/sanity/lib/fetchEvents';
import GalleryModal from './GalleryModal';

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>(staticEventData);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadEventsData() {
      const fetchedEvents = await getEventItems();
      if (fetchedEvents && fetchedEvents.length > 0) {
        setEvents(fetchedEvents);
      }
    }
    loadEventsData();
  }, []);

  const handleCardClick = (event: EventItem) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <section className={`section-padding ${styles.eventsSection}`} id="events">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.titleWrapper}>
            <span className={styles.subTitle}>Live Branding & Setup</span>
            <h2 className={styles.mainTitle}>Signature Events</h2>
          </div>
          <p className={styles.sectionDesc}>
            Explore the scale of corporate launches, music festivals, and high-profile exhibitions we have engineered, fabricated, and branded.
          </p>
        </div>

        {/* Events Grid */}
        <div className={styles.eventsGrid}>
          {events.slice(0, 3).map((event) => (
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

        {/* Call to Action */}
        <div className={styles.ctaWrapper}>
          <Link href="/events">
            <button className={styles.loadMoreBtn} style={{ borderColor: 'var(--accent-purple)', boxShadow: '0 0 15px rgba(176, 38, 255, 0.15)' }}>
              Explore All Events & Setup
            </button>
          </Link>
        </div>
      </div>

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
    </section>
  );
}
