'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Helper to construct links based on whether we are on home page
  const getLink = (hash: string) => {
    return isHome ? hash : `/${hash}`;
  };

  return (
    <nav className={styles.navbar}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link href={isHome ? '#home' : '/'} className={styles.logoArea}>
          <Image
            src="/logo.jpg"
            alt="Bandekar's Digital Imaging Logo"
            width={42}
            height={42}
            className={styles.logoImage}
          />
          <div>
            <span className={styles.logoText}>Bandekar&apos;s</span>
            <span className={styles.logoSubText}>Digital Imaging</span>
          </div>
        </Link>

        {/* Nav Links - Desktop */}
        <ul className={styles.navLinks}>
          <li>
            <Link href={isHome ? '#home' : '/'} className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href={pathname === '/portfolio' ? '#portfolio-page' : '/portfolio'} className={styles.navLink}>
              Featured Work
            </Link>
          </li>
          <li>
            <Link href={pathname === '/events' ? '#events-page' : '/events'} className={styles.navLink}>
              Events
            </Link>
          </li>
          <li>
            <Link href={getLink('#transformations')} className={styles.navLink}>
              Transformations
            </Link>
          </li>
          <li>
            <Link href={getLink('#process')} className={styles.navLink}>
              Process
            </Link>
          </li>
          <li>
            <Link href={getLink('#contact')} className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>

        <Link href={getLink('#contact')}>
          <button className={styles.navBtn}>Get in Touch</button>
        </Link>

        {/* Burger Menu for Mobile */}
        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu} aria-label="Toggle Navigation Menu">
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <ul className={styles.mobileMenuLinks}>
            <li>
              <Link href={isHome ? '#home' : '/'} onClick={toggleMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/portfolio" onClick={toggleMobileMenu}>
                Featured Work
              </Link>
            </li>
            <li>
              <Link href="/events" onClick={toggleMobileMenu}>
                Events
              </Link>
            </li>
            <li>
              <Link href={getLink('#transformations')} onClick={toggleMobileMenu}>
                Transformations
              </Link>
            </li>
            <li>
              <Link href={getLink('#process')} onClick={toggleMobileMenu}>
                Process
              </Link>
            </li>
            <li>
              <Link href={getLink('#contact')} onClick={toggleMobileMenu}>
                Contact
              </Link>
            </li>
            <li>
              <Link href={getLink('#contact')} onClick={toggleMobileMenu}>
                <button className={styles.navBtn} style={{ display: 'block', margin: '20px auto' }}>
                  Get in Touch
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
