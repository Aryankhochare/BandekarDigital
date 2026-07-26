'use client';

import styles from './Testimonials.module.css';

interface Review {
  id: number;
  title: string;
  badge: string;
  comment: string;
  rating: number;
  initials: string;
  avatarBg: string;
}

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?gs_ssp=eJzj4tFP1zc0MikuzDBPrzBgtFI1qDBOSkpLMk61MEy2MDcysUiyMqhIs0w1MTNNNE4zMLAwSTNP9ZJISsxLSc1OLFJIyUzPLEnMUcjMTUzPzEsHAJfEGIA&q=bandekar+digital+imaging&rlz=1C1ONGR_enIN1069IN1069&oq=bande&gs_lcrp=EgZjaHJvbWUqDwgBEC4YJxivARjHARiOBTIGCAAQRRg5Mg8IARAuGCcYrwEYxwEYjgUyDwgCEAAYQxixAxiABBiKBTIHCAMQLhiABDINCAQQLhivARjHARiABDIHCAUQABiABDINCAYQLhivARjHARiABDINCAcQLhivARjHARiABDIHCAgQLhiABDIHCAkQABiPAtIBCTM1ODJqMGoxNagCCLACAfEFoxcG9Ld2dQ4&sourceid=chrome&source=chrome.rb&ie=UTF-8#lrd=0x3bbfb3e81c87248b:0xf9e465a3f0084f7e,1,,,,";

export default function Testimonials() {
  const reviews: Review[] = [
    {
      id: 1,
      title: "Premium Quality Custom College Badges",
      badge: "Student Council / Institutional Client",
      comment: "We recently got a batch of custom-made council student badges for our college from Bandekar's Digital Imaging, and I must say, the experience has been nothing short of exceptional. From the very beginning, their team was extremely professional, patient, and attentive to every single detail we provided. We had specific names, designations, and expectations for each badge—and not only did they meet all our requests, but they also executed them with a level of quality and precision that truly impressed us. The print quality, finish, and overall look of the badges were absolutely top-notch...",
      rating: 5,
      initials: "SC",
      avatarBg: "linear-gradient(135deg, #00f0ff, #7000ff)"
    },
    {
      id: 2,
      title: "Flawless Medical Clinic Branding",
      badge: "Local Business Owner / Clinic Client",
      comment: "I have done all my printing work with them and their quality is excellent! Even the work on my Clinic Board was very neat and good. It was a difficult color to get, but Shailesh ensured that it was matched perfectly!...",
      rating: 5,
      initials: "CC",
      avatarBg: "linear-gradient(135deg, #7000ff, #ff007a)"
    },
    {
      id: 3,
      title: "Consistent 3-Year Customer Loyalty",
      badge: "Long-term Loyal Client",
      comment: "Very nice place and work environment, the staff is very polite, and nice. I have been getting my prints done from here for the past 3 years. And they have served me the best; the print quality is also amazing...",
      rating: 5,
      initials: "LC",
      avatarBg: "linear-gradient(135deg, #ff6b00, #00f0ff)"
    },
    {
      id: 4,
      title: "Exceptional Urgent Same-Day Delivery",
      badge: "Rush Order Client",
      comment: "They did an excellent job designing and printing a memento for me on extremely short notice. I needed it urgently on the same day, and they handled everything very quickly and professionally. The design was done beautifully, and the printing was of great quality. I am really thankful that they completed the work even though it was past their closing time...",
      rating: 5,
      initials: "RC",
      avatarBg: "linear-gradient(135deg, #00f0ff, #00ff66)"
    },
    {
      id: 5,
      title: "Complete Restaurant Branding & Personalization",
      badge: "Hospitality Business / Restaurant Client",
      comment: "We have always worked with Bandekar for a variety of customized products for our restaurant, and the experience was excellent from start to finish. They handled the design and printing of our restaurant menu, created beautiful personalized mugs, and even delivered a customized sticker, all with great attention to detail and quality...",
      rating: 5,
      initials: "RB",
      avatarBg: "linear-gradient(135deg, #ff007a, #ffb400)"
    }
  ];

  // Triplicated for seamless infinite horizontal loop
  const marqueeItems = [...reviews, ...reviews, ...reviews];

  return (
    <section className={`section-padding ${styles.testimonialsSection}`} id="reviews">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerTitleArea}>
            <span className={styles.subTitle}>Verified Google Reviews</span>
            <h2 className={styles.mainTitle}>Rated 4.7 Stars by Our Clients</h2>
          </div>
          
          {/* Trust Score & Google Link */}
          <div className={styles.trustSummary}>
            <div className={styles.trustBox}>
              <div className={styles.googleBadge}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Google Business Reviews</span>
              </div>
              <div className={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#ffb400">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className={styles.ratingText}>4.7 / 5.0</span>
              </div>
            </div>

            <a 
              href={GOOGLE_REVIEWS_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.googleBtn}
              title="View all reviews on Google"
            >
              <span>View All on Google</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Continuous Horizontal Scrolling Marquee */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((r, index) => (
            <a 
              key={`${r.id}-${index}`}
              href={GOOGLE_REVIEWS_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.cardAnchor}
              title="Click to read full review on Google"
            >
              <div className={styles.card}>
                {/* Card Header */}
                <div className={styles.cardHeader}>
                  <div 
                    className={styles.avatar}
                    style={{ background: r.avatarBg }}
                  >
                    {r.initials}
                  </div>
                  
                  <div className={styles.details}>
                    <h3 className={styles.reviewTitle}>{r.title}</h3>
                    <span className={styles.badge}>{r.badge}</span>
                  </div>

                  {/* Google Logo Icon */}
                  <div className={styles.googleIconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className={styles.ratingRow}>
                  <div className={styles.stars}>
                    {[...Array(r.rating)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#ffb400">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className={styles.ratingTag}>5.0</span>
                </div>

                {/* Dotted Snippet Comment */}
                <p className={styles.comment}>&ldquo;{r.comment}&rdquo;</p>

                {/* Card Footer with Verified Badge & Read Full Link */}
                <div className={styles.cardFooter}>
                  <div className={styles.verifiedBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Verified Review</span>
                  </div>
                  <span className={styles.readMoreLink}>
                    Read full review ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
