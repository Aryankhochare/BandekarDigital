'use client';

import { useEffect, useState } from 'react';
import styles from './Contact.module.css';
import { getPortfolioItems } from '@/sanity/lib/fetchPortfolio';
import { getEventItems } from '@/sanity/lib/fetchEvents';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  inquiryType: 'project' | 'event' | '';
  selectedItem: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: '',
    selectedItem: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const [projectList, setProjectList] = useState<string[]>([]);
  const [eventList, setEventList] = useState<string[]>([]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const portfolios = await getPortfolioItems();
        if (portfolios && portfolios.length > 0) {
          const titles = Array.from(new Set(portfolios.map(p => p.title || p.category)));
          setProjectList(titles);
        }
      } catch (err) {
        console.error('Failed to load portfolio items for dropdown:', err);
      }

      try {
        const events = await getEventItems();
        if (events && events.length > 0) {
          const titles = Array.from(new Set(events.map(e => e.title)));
          setEventList(titles);
        }
      } catch (err) {
        console.error('Failed to load events for dropdown:', err);
      }
    }
    loadOptions();
  }, []);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'inquiryType') {
        updated.selectedItem = '';
      }
      return updated;
    });
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus('submitting');

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (accessKey && accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY_HERE' && accessKey !== 'your_access_key_here') {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `🔥 New Lead: ${formData.firstName.trim()} ${formData.lastName.trim()} - Bandekar's Digital Imaging`,
          from_name: "Bandekar's Digital Website",
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          email: formData.email.trim(),
          phone: formData.phone.trim() || 'Not provided',
          message: formData.message.trim(),
          inquiry_type: formData.inquiryType ? (formData.inquiryType === 'project' ? 'Individual Project' : 'Signature Event') : 'Not specified',
          selected_item: formData.selectedItem || 'None'
        })
      })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          console.error('Web3Forms submission error:', data);
        } else {
          console.log('Web3Forms submitted successfully:', data);
        }
      })
      .catch((err) => console.error('Background Web3Forms email error:', err));
    } else {
      console.warn('Web3Forms access key not set in environment variables (NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY). Email notification skipped.');
    }

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917350452093";
    
    let textMessage = 
      `*New Website Inquiry - Bandekar's Digital Imaging*\n\n` +
      `👤 *Name:* ${formData.firstName.trim()} ${formData.lastName.trim()}\n` +
      `✉️ *Email:* ${formData.email.trim()}\n` +
      `📞 *Phone:* ${formData.phone.trim() || 'Not provided'}\n`;
 
    if (formData.inquiryType) {
      const typeLabel = formData.inquiryType === 'project' ? 'Individual Project' : 'Signature Event';
      textMessage += `🏷️ *Interest:* ${typeLabel}\n`;
      if (formData.selectedItem) {
        textMessage += `🎯 *Item:* ${formData.selectedItem}\n`;
      }
    }
 
    textMessage += `\n💬 *Project Details:*\n${formData.message.trim()}`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');

    setFormStatus('success');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      inquiryType: '',
      selectedItem: '',
      message: ''
    });

    setTimeout(() => setFormStatus('idle'), 5000);
  };

  return (
    <section className={`section-padding ${styles.contactSection}`} id="contact">
      <div className="container">
        <div className={styles.contactGrid}>
          {/* Left Column - Details */}
          <div className={styles.contactInfo}>
            <div>
              <span className={styles.subTitle}>Connect</span>
              <h2 className={styles.mainTitle}>
                Ready to Transform <br />
                <span className={styles.titleGlow}>Your Brand?</span>
              </h2>
            </div>
            
            <p className={styles.infoDesc}>
              Have a custom visual design or site measurement inquiry? Get in touch with our visual experts. We provide free Goan site inspections and dynamic digital layout proofs.
            </p>

            <div className={styles.cardsWrapper}>
              {/* Phone Card */}
              <div className={styles.infoCard}>
                <div className={styles.iconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 className={styles.cardTitle}>Call Us</h4>
                  <a href="tel:+919823289069" className={styles.phoneLink}>+91 98232 89069</a>
                  <a href="tel:+919422438353" className={styles.phoneLink}>+91 94224 38353</a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <a href="https://wa.me/917350452093" target="_blank" rel="noopener noreferrer" className={styles.infoCard} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.iconBox} style={{ borderColor: 'rgba(37, 211, 102, 0.3)', color: '#25D366', background: 'rgba(37, 211, 102, 0.05)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h4 className={styles.cardTitle}>WhatsApp</h4>
                  <p className={styles.cardValue}>+91 73504 52093</p>
                </div>
              </a>

              {/* Email Card */}
              <div className={styles.infoCard}>
                <div className={styles.iconBox} style={{ borderColor: 'rgba(176, 38, 255, 0.3)', color: 'var(--accent-purple)', background: 'rgba(176, 38, 255, 0.05)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 className={styles.cardTitle}>Email Us</h4>
                  <a href="mailto:bandekardigitalimaging@gmail.com" className={styles.emailLink}>bandekardigitalimaging@gmail.com</a>
                  <a href="mailto:Swanika2002@gmail.com" className={styles.emailLink}>Swanika2002@gmail.com</a>
                </div>
              </div>

              {/* Location Card */}
              <div className={styles.infoCard}>
                <div className={styles.iconBox} style={{ borderColor: 'rgba(0, 240, 255, 0.3)', color: 'var(--accent-cyan)', background: 'rgba(0, 240, 255, 0.05)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Visit Us</h4>
                  <p className={styles.cardValue}>Varde Valaulikar Rd, Margao, Goa 403601</p>
                </div>
              </div>

              {/* Google Maps Card */}
              <div 
                className={styles.mapCard}
                onClick={() => window.open("https://maps.app.goo.gl/RxHpRBqN6md47DRq6", "_blank")}
              >
                <iframe
                  title="Google Maps Location"
                  src="https://maps.google.com/maps?q=Bandekar's%20Digital%20Imaging,%20Margao,%20Goa&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={styles.mapIframe}
                ></iframe>
                <div className={styles.mapOverlay}>
                  <div className={styles.mapButton}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <span>Open in Google Maps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className={styles.formCard}>
            {formStatus === 'success' ? (
              <div className={styles.successMessage}>
                Opening WhatsApp... Your inquiry details have been formatted and ready to send directly to our WhatsApp!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.formGrid}>
                {/* First Name */}
                <div className={styles.formGroup}>
                  <label htmlFor="firstName" className={styles.formLabel}>First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={styles.formInput}
                  />
                  {errors.firstName && <span className={styles.errorMessage}>{errors.firstName}</span>}
                </div>

                {/* Last Name */}
                <div className={styles.formGroup}>
                  <label htmlFor="lastName" className={styles.formLabel}>Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={styles.formInput}
                  />
                  {errors.lastName && <span className={styles.errorMessage}>{errors.lastName}</span>}
                </div>

                {/* Email */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={styles.formInput}
                  />
                  {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="phone" className={styles.formLabel}>Phone Number (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={styles.formInput}
                  />
                </div>
 
                {/* Inquiry Type (Dropdown) */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="inquiryType" className={styles.formLabel}>Inquiry Type (Optional)</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  >
                    <option value="">Select Category (Optional)</option>
                    <option value="project">Individual Project</option>
                    <option value="event">Signature Event</option>
                  </select>
                </div>
 
                {/* Selected Item (Dropdown) - conditionally shown once category is chosen */}
                {formData.inquiryType && (
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="selectedItem" className={styles.formLabel}>
                      Select {formData.inquiryType === 'project' ? 'Project' : 'Event'} (Optional)
                    </label>
                    <select
                      id="selectedItem"
                      name="selectedItem"
                      value={formData.selectedItem}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    >
                      <option value="">Select option (Optional)</option>
                      {formData.inquiryType === 'project'
                        ? projectList.map((title) => (
                            <option key={title} value={title}>
                              {title}
                            </option>
                          ))
                        : eventList.map((title) => (
                            <option key={title} value={title}>
                              {title}
                            </option>
                          ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}

                {/* Message */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="message" className={styles.formLabel}>Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your design scale, signage sizing, or materials..."
                    rows={4}
                    className={styles.formInput}
                    style={{ resize: 'vertical' }}
                  ></textarea>
                  {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
                </div>

                {/* Submit */}
                <div className={styles.fullWidth}>
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={formStatus === 'submitting'}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {formStatus === 'submitting' ? 'Opening WhatsApp...' : 'Send Quote Request via WhatsApp'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
