import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Main Grid */}
        <div className={styles.footerGrid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <div className={styles.logoArea}>
              <Image
                src="https://cdn.sanity.io/files/7pct1njc/production/47c5b894e9cf34ab2dab6fcf67a81a9cf3e3352c.jpg"
                alt="Bandekar's Digital Imaging Logo"
                width={40}
                height={40}
                className={styles.logoImage}
              />
              <div>
                <span className={styles.logoText}>Bandekar&apos;s</span>
                <span className={styles.logoSubText}>Digital Imaging</span>
              </div>
            </div>
            <p className={styles.description}>
              Premium architectural signboards, glowing neon signs, LED display engineering, and wide-format visual production built to transform Goan brands.
            </p>
            <div className={styles.socials}>
              {/* Facebook */}
              <a href="https://www.facebook.com/p/Bandekars-Digital-Imaging-100071961461644/" className={styles.socialIcon} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/bandekardigitalimaging/" className={styles.socialIcon} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}><a href="/#home">Home</a></li>
              <li className={styles.linkItem}><a href="/portfolio">Featured Work</a></li>
              <li className={styles.linkItem}><a href="/events">Our Events</a></li>
              <li className={styles.linkItem}><a href="/#transformations">Before & After</a></li>
              <li className={styles.linkItem}><a href="/#process">Work Flow</a></li>
              <li className={styles.linkItem}><a href="/about">About Us</a></li>
            </ul>
          </div>

          {/* Services quick links */}
          <div>
            <h4 className={styles.colTitle}>Services</h4>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}><a href="#portfolio">LED Signages</a></li>
              <li className={styles.linkItem}><a href="#portfolio">Neon Signs</a></li>
              <li className={styles.linkItem}><a href="#portfolio">Acrylic Sign Boards</a></li>
              <li className={styles.linkItem}><a href="#portfolio">Hotel Branding</a></li>
              <li className={styles.linkItem}><a href="#portfolio">Vehicle Branding</a></li>
              <li className={styles.linkItem}><a href="#portfolio">Large Format Printing</a></li>
            </ul>
          </div>


          {/* Contact details */}
          <div>
            <h4 className={styles.colTitle}>Main Office</h4>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <a 
                  href="https://maps.app.goo.gl/RxHpRBqN6md47DRq6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.googleBusinessLink}
                >
                  Varde Valaulikar Rd, Pajifond, Madgaon, Goa 403601 <br />
                  <span className={styles.googleMapsBadge}>View Google Business Profile →</span>
                </a>
              </div>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:bandekarsdigitalimaging@gmail.com" className={styles.footerEmailLink}>
                  bandekarsdigitalimaging@gmail.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
                <a href="tel:+919422438353" style={{ color: 'inherit', textDecoration: 'none' }}>+91 94224 38353</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <span>© {currentYear} Bandekar&apos;s Digital Imaging. All rights reserved.</span>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
