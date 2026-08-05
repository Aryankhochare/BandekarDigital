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
              <span className={styles.subTitle}>About Us</span>
              <h1 className={styles.mainTitle}>Bandekar&apos;s Digital Imaging</h1>
              <p className={styles.heroDesc}>
                Established in 2007, Bandekar&apos;s Digital Imaging began as a small digital printing firm with a clear vision 
                — to deliver creative, reliable and high-quality printing, advertising and event solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Company Narrative & Numbers Section */}
        <section className={styles.narrativeSection}>
          <div className="container">
            <div className={styles.narrativeGrid}>
              <div className={styles.narrativeText}>
                <span className={styles.sectionLabel}>Our History & Growth</span>
                <h2>Bringing Ideas to Life Since 2007</h2>
                <p>
                  Over the years, we have grown into a full-service printing, signage, advertising and event management company, 
                  supported by an experienced team of creative professionals and comprehensive in-house production facilities. 
                </p>
                <p>
                  Our services include digital and offset printing, UV printing, flatbed UV printing, indoor and outdoor advertising, 
                  billboards, LED channel letters, shop signage, acrylic and embossed lettering, laser cutting, fabric printing, 
                  personalised gifting, corporate events and government events.
                </p>
                <p>
                  We believe that creativity, quality and dependable service are the foundations of every successful project. 
                  Our commitment to excellence, attention to detail and comprehensive one-stop solutions enable us to add meaningful 
                  value to our clients and help their organisations move forward with confidence.
                </p>
              </div>
              <div className={styles.statsCardWrapper}>
                <div className={styles.statsGlassCard}>
                  <div className={styles.statsCardItem}>
                    <h3>19+</h3>
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
                  src="https://cdn.sanity.io/files/7pct1njc/production/01a377bbc850f970bbc9e62d6602e69ed4796a07.jpeg"
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
                    &ldquo;Together, we bring ideas to life through advertising, design and memorable events.&rdquo;
                  </p>
                </div>
                
                <p className={styles.ceoBio}>
                  Shailesh Bandekar founded Bandekar’s Digital Imaging with a focus on custom manufacturing 
                  and high-fidelity print engineering. With over 19 years of technical expertise in materials, 
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

        {/* Comprehensive Services Brochure List Section */}
        <section className={styles.servicesBrochureSection}>
          <div className="container">
            <div className={styles.brochureHeader}>
              <span className={styles.brochureLabel}>Our Capabilities</span>
              <h2>Comprehensive Indoor & Outdoor Services</h2>
              <p>Explore our complete list of advertising, printing, and personalized gifting solutions.</p>
            </div>

            <div className={styles.brochureGrid}>
              {/* Column 1 */}
              <div className={styles.brochureColumn}>
                <div className={styles.columnTitleBox} style={{ borderLeftColor: 'var(--accent-cyan)' }}>
                  <h3 style={{ color: 'var(--accent-cyan)' }}>Indoor & Outdoor Advertising</h3>
                </div>
                <ul className={styles.brochureList}>
                  <li>LED Signage</li>
                  <li>LED Channel Letters</li>
                  <li>Shop Signage</li>
                  <li>Acrylic & Embossed Lettering</li>
                  <li>Banners</li>
                  <li>Hoarding & Billboards</li>
                  <li>Vinyl & Flex</li>
                  <li>Eco-solvent Printing</li>
                  <li>Plate Printing</li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className={styles.brochureColumn}>
                <div className={styles.columnTitleBox} style={{ borderLeftColor: 'var(--accent-purple)' }}>
                  <h3 style={{ color: 'var(--accent-purple)' }}>Marketing & Corporate Print</h3>
                </div>
                <ul className={styles.brochureList}>
                  <li>Posters, Brochures & Flyers</li>
                  <li>Business Cards & Letterheads</li>
                  <li>Invitation, Birthday & Wedding Cards</li>
                  <li>Certificates & Calendars</li>
                  <li>Bill Books & Receipt Books</li>
                  <li>Door Hangers</li>
                  <li>Tickets & ID Cards</li>
                  <li>Diaries & Catalogs</li>
                  <li>Lottery Coupons</li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className={styles.brochureColumn}>
                <div className={styles.columnTitleBox} style={{ borderLeftColor: 'var(--accent-orange)' }}>
                  <h3 style={{ color: 'var(--accent-orange)' }}>Specialized Custom Solutions</h3>
                </div>
                <ul className={styles.brochureList}>
                  <li>Trophies & Awards</li>
                  <li>Personalized Mugs & Gifting</li>
                  <li>Lanyards</li>
                  <li>Nylon Stamps</li>
                  <li>Barcode & QR Code Standees</li>
                  <li>Laser Engraving & Cutting</li>
                  <li>Print-n-Cut Stickers</li>
                  <li>Shape Cutting Cards</li>
                  <li>Fabric & DTF Printing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars / Values Section */}
        <section className={styles.pillarsSection}>
          <div className="container">
            <div className={styles.pillarsHeader}>
              <span className={styles.pillarsSubtitle}>Our Values</span>
              <h2 className={styles.pillarsTitle}>The Foundations of Our Projects</h2>
            </div>
            
            <div className={styles.pillarsGrid}>
              {/* Pillar 1 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox} style={{ color: 'var(--accent-cyan)', borderColor: 'rgba(0, 240, 255, 0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3>Creativity</h3>
                <p>We blend design aesthetics with technical execution to produce signs and prints that represent your brand name with absolute pride.</p>
              </div>

              {/* Pillar 2 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox} style={{ color: 'var(--accent-purple)', borderColor: 'rgba(176, 38, 255, 0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.93 4.93 14.14 14.14" />
                  </svg>
                </div>
                <h3>Premium Quality</h3>
                <p>We manage color reproduction strictly, matching challenging color palettes across a variety of durable substrates.</p>
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
                <h3>Dependable Service</h3>
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
