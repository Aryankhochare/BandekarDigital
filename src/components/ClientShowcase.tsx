'use client';

import styles from './ClientShowcase.module.css';

export default function ClientShowcase() {
  const clients = [
    "IFB",
    "Bank of Baroda",
    "Federal Bank",
    "Parsik Bank",
    "RTO",
    "Government of Goa",
    "Police",
    "Novotel",
    "Nanu",
    "Radisson",
    "Caravela Beach Resort",
    "Sqay",
    "Silca Fuels",
    "First Cry",
    "Ulhas Jewellers",
    "Guardian Angel",
    "Chetna Special Child School"
  ];

  // Duplicate the list to ensure a seamless infinite loop scroll
  const marqueeItems = [...clients, ...clients, ...clients];

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.sectionTitle}>
        <span>Trusted By Leading Goan Brands</span>
      </div>
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((client, idx) => (
            <div key={idx} className={styles.marqueeItem}>
              <span className={styles.glowDot}>•</span>
              <span className={styles.clientName}>{client}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
