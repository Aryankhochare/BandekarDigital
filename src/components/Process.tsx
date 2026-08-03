import styles from './Process.module.css';

interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  stepClass: string;
  colorHex: string;
  icon: React.ReactNode;
}

export default function Process() {
  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Concept",
      desc: "We align on your creative vision, take site dimensions, and specify material finishes.",
      stepClass: styles.cyanStep,
      colorHex: "var(--accent-cyan)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6M10 22h4" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Design",
      desc: "Our sign designers create 3D mockups and technical visual proofs for your approval.",
      stepClass: styles.purpleStep,
      colorHex: "var(--accent-purple)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Production",
      desc: "We fabricate your sign with computerized laser cutters, glowing neon, and premium finishes.",
      stepClass: styles.orangeStep,
      colorHex: "var(--accent-orange)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Installation",
      desc: "Our technical field team securely delivers, installs, and connects your signs.",
      stepClass: styles.greenStep,
      colorHex: "var(--accent-green)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    }
  ];

  return (
    <section className={`section-padding ${styles.processSection}`} id="process">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.subTitle}>Workflow</span>
          <h2 className={styles.mainTitle}>From Concept to Installation</h2>
        </div>

        {/* Timeline grid */}
        <div className={styles.timelineWrapper}>
          <div className={styles.timelineLine}></div>
          
          {steps.map((step, index) => (
            <div key={index} className={`${styles.stepCard} ${step.stepClass}`}>
              <span className={styles.stepNumber}>{step.number}</span>
              
              {/* Outer circle with glow */}
              <div 
                className={styles.iconOuter}
                style={{ color: step.colorHex }}
              >
                {step.icon}
              </div>

              <div className={styles.stepTextContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
