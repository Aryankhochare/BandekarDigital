'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './aboutPage.module.css';

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Floating Background Glow Blobs for premium aesthetics */}
      <div className="bg-blobs-container">
        <div className="blob-1" style={{ animationDelay: '1s' }}></div>
        <div className="blob-2" style={{ animationDelay: '3s' }}></div>
        <div className="blob-3" style={{ animationDelay: '5s' }}></div>
      </div>

      <main className={styles.aboutPage} id="about-page">
        {/* About Hero Section */}
        <section className={styles.aboutHero}>
          <div className="container">
            <div className={styles.heroContent}>
              <span className={styles.subTitle}>Our Legacy & Vision</span>
              <h1 className={styles.mainTitle}>Crafting Visual Brands Across Goa</h1>
              <p className={styles.heroDesc}>
                We combine state-of-the-art print technology with architectural craftsmanship. 
                From complex corporate branding to custom glowing neon art, we translate concepts into physical reality.
              </p>
            </div>
          </div>
        </section>

        {/* Company Narrative & Numbers Section */}
        <section className={styles.narrativeSection}>
          <div className="container">
            <div className={styles.narrativeGrid}>
              <div className={styles.narrativeText}>
                <span className={styles.sectionLabel}>Who We Are</span>
                <h2>15 Years of Engineering Visual Excellence</h2>
                <p>
                  Established in Madgaon, Goa, Bandekar’s Digital Imaging started with a single promise: 
                  to deliver precision-engineered printing and architectural signboards that command attention. 
                  Today, we are Goa’s leading branding partner, serving hotels, banks, governmental offices, and local retail stores.
                </p>
                <p>
                  We operate a specialized production facility equipped with CNC laser cutters, high-fidelity UV printing presses, 
                  and custom neon fabrication benches. Our design-to-installation workflow ensures every board, wrap, or banner 
                  maintains the highest standards of durability and vibrancy.
                </p>
              </div>
              <div className={styles.statsCardWrapper}>
                <div className={styles.statsGlassCard}>
                  <div className={styles.statsCardItem}>
                    <h3>15+</h3>
                    <p>Years of Service</p>
                  </div>
                  <div className={styles.statsCardItem}>
                    <h3>2,000+</h3>
                    <p>Projects Fabricated</p>
                  </div>
                  <div className={styles.statsCardItem}>
                    <h3>500+</h3>
                    <p>Clients Empowered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CEO Section (Shailesh Bandekar Profile) */}
        <section className={styles.ceoSection}>
          <div className="container">
            <div className={styles.ceoCard}>
              {/* CEO Image Side */}
              <div className={styles.ceoImageContainer}>
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
                  alt="Shailesh Bandekar - CEO & Founder"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className={styles.ceoImage}
                  priority
                />
                <div className={styles.ceoImageGlow}></div>
                <div className={styles.ceoBadge}>
                  <span>Founder & CEO</span>
                </div>
              </div>

              {/* CEO Details Side */}
              <div className={styles.ceoInfo}>
                <span className={styles.ceoLabel}>Leadership</span>
                <h2 className={styles.ceoName}>Shailesh Bandekar</h2>
                <span className={styles.ceoTitle}>Founder & Chief Executive Officer</span>
                
                <div className={styles.ceoQuotes}>
                  <p>
                    &ldquo;Every custom board we produce represents our client&apos;s hard work and dream. 
                    Our mission isn&apos;t just to print; it&apos;s to shape physical structures and materials 
                    that carry your brand name with absolute pride and perfection.&rdquo;
                  </p>
                </div>
                
                <p className={styles.ceoBio}>
                  Shailesh Bandekar founded Bandekar’s Digital Imaging with a focus on custom manufacturing 
                  and high-fidelity print engineering. With over 15 years of technical expertise in materials, 
                  accurate color matching, and digital imaging, he continues to take a hands-on approach to client designs.
                </p>
                <p className={styles.ceoBio}>
                  Whether personally matching challenging color values for Goan institutional landmarks or supervising 
                  the layout details of heavy corporate LED display signages, Shailesh ensures that precision 
                  and high-durability production are integrated into every workflow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars / Values Section */}
        <section className={styles.pillarsSection}>
          <div className="container">
            <div className={styles.pillarsHeader}>
              <span className={styles.pillarsSubtitle}>Our Values</span>
              <h2 className={styles.pillarsTitle}>The Pillars of Our Craft</h2>
            </div>
            
            <div className={styles.pillarsGrid}>
              {/* Pillar 1 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox} style={{ color: 'var(--accent-cyan)', borderColor: 'rgba(0, 240, 255, 0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3>Precision Standards</h3>
                <p>We use state-of-the-art laser cutters and technical design mockups to ensure exact dimensions, material fits, and alignment.</p>
              </div>

              {/* Pillar 2 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox} style={{ color: 'var(--accent-purple)', borderColor: 'rgba(176, 38, 255, 0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.93 4.93 14.14 14.14" />
                  </svg>
                </div>
                <h3>Exact Color Matching</h3>
                <p>We manage color reproduction strictly, matching difficult color palettes and brand hues across a variety of substrates.</p>
              </div>

              {/* Pillar 3 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox} style={{ color: 'var(--accent-orange)', borderColor: 'rgba(255, 138, 0, 0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3>Local Goa Expertise</h3>
                <p>Our experienced team delivers secure sign installation and durable facade boards suitable for Goan weather conditions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className={styles.aboutCta}>
          <div className="container">
            <div className={styles.ctaCard}>
              <h2>Bring Your Printing Ideas to Life</h2>
              <p>Contact our design and production specialists to plan your next signboard, custom neon setup, or print campaign.</p>
              <Link href="/#contact">
                <button className={styles.ctaButton}>Start a Project</button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
