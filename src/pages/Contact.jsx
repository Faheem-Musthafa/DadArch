import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import useIsMobile from '../hooks/useIsMobile';

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const LineReveal = () => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    style={{ height: '1px', backgroundColor: '#000', width: '100%', transformOrigin: 'left' }}
  />
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const SOCIAL_LINKS = [
  { id: 'instagram', icon: <InstagramIcon />, label: 'Instagram', href: 'https://www.instagram.com/thedadarchitects/' },
  { id: 'linkedin', icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/company/dadarchitechts' },
  { id: 'facebook', icon: <FacebookIcon />, label: 'Facebook', href: 'https://www.facebook.com/dadarchitectsofficial/' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const isMobile = useIsMobile(768);
  const resetTimerRef = useRef(null);

  useEffect(() => () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/admin@dadarchitects.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Project Inquiry from ${formData.name}`,
          _template: 'box'
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const buttonLabel = {
    idle: 'SUBMIT INQUIRY',
    submitting: 'SENDING...',
    success: 'TRANSMITTED',
    error: 'ERROR - RETRY',
  }[status];

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #ccc',
    color: '#000',
    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
    padding: '1rem 0',
    outline: 'none',
    letterSpacing: '-0.02em',
    transition: 'border-color 0.4s ease',
    borderRadius: 0
  };

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SEO
        title="Contact — DAD Architects"
        description="Inquire and collaborate with DAD Architects. Get in touch with us at our Calicut or Manjeri offices."
        url="/contact"
      />

      <div style={{ maxWidth: '1600px', margin: isMobile ? '0 auto' : '0', padding: '0 5%', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* HERO SECTION */}
        <section style={{ height: '70vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '10vh' }}>
          <FadeIn>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 12vw, 11rem)',
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              margin: 0,
              textTransform: 'uppercase'
            }}>
              Let's Build<br />
              <span style={{ fontWeight: 300 }}>The Future.</span>
            </h1>
          </FadeIn>
        </section>

        {/* GRID SECTION */}
        <section style={{ paddingBottom: '15vh' }}>
          <LineReveal />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: '4rem', marginTop: '4rem' }}>

            {/* INFO COLUMN */}
            <div style={{ gridColumn: isMobile ? '1' : '1 / 6' }}>
              <FadeIn delay={0.1}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                  <div>
                    <span style={{ fontSize: '1rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '1.5rem' }}>
                      Studio
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 400 }}>
                      <motion.a href="mailto:admin@dadarchitects.com" whileHover={{ x: 10, color: '#666' }} style={{ textDecoration: 'none', color: '#000', width: 'max-content', transition: 'color 0.3s ease' }}>
                        admin@dadarchitects.com
                      </motion.a>
                      <motion.a href="tel:+916282281828" whileHover={{ x: 10, color: '#666' }} style={{ textDecoration: 'none', color: '#000', width: 'max-content', transition: 'color 0.3s ease' }}>
                        +91 6282 281 828
                      </motion.a>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '1rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '1.5rem' }}>
                      Locations
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                        <address style={{ fontStyle: 'normal', color: '#000', fontSize: '1.1rem', lineHeight: 1.5, opacity: 0.8, margin: 0 }}>
                          Calicut, Kerala
                        </address>
                        <motion.a
                          href="https://www.google.com/maps/place/DAD+ARCHITECTS/@11.3043372,75.772696,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba65f0067c96d35:0x9259c0f8fea93738!8m2!3d11.3043372!4d75.772696!16s%2Fg%2F11nc0wvrdq?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank" rel="noopener noreferrer"
                          whileHover={{ x: 5, color: '#666' }}
                          style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#000', textDecoration: 'underline', textUnderlineOffset: '4px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s ease' }}
                        >
                          View on Map ↗
                        </motion.a>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                        <address style={{ fontStyle: 'normal', color: '#000', fontSize: '1.1rem', lineHeight: 1.5, opacity: 0.8, margin: 0 }}>
                          City Point Mall, Karuvambram<br />
                          Manjeri, Kerala
                        </address>
                        <motion.a
                          href="https://www.google.com/maps?vet=10CAAQoqAOahcKEwiw1Oyav7GUAxUAAAAAHQAAAAAQFA..i&pvq=Cg0vZy8xMXZsN2tybG1zIhQKDmRhZCBhcmNoaXRlY3RzEAIYAw&lqi=ChhkYWQgYXJjaGl0ZWN0cyBsb2NhdGlvbnNI-JTv-Mi6gIAIWiQQABABGAAYARgCIhhkYWQgYXJjaGl0ZWN0cyBsb2NhdGlvbnOSARBjb3Jwb3JhdGVfb2ZmaWNl&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3ba6372590ba9ec3:0xce8c468489e39055"
                          target="_blank" rel="noopener noreferrer"
                          whileHover={{ x: 5, color: '#666' }}
                          style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#000', textDecoration: 'underline', textUnderlineOffset: '4px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s ease' }}
                        >
                          View on Map ↗
                        </motion.a>
                      </div>
                    </div>
                  </div>

                </div>
              </FadeIn>
            </div>

            {/* FORM COLUMN */}
            <div style={{ gridColumn: isMobile ? '1' : '7 / 13' }}>
              <FadeIn delay={0.2}>
                <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '3rem' }} noValidate>

                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', color: '#000', textTransform: 'uppercase' }}>Your Name</label>
                    <input
                      id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderBottomColor = '#000'}
                      onBlur={(e) => e.target.style.borderBottomColor = '#ccc'}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', color: '#000', textTransform: 'uppercase' }}>Email Address</label>
                    <input
                      id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderBottomColor = '#000'}
                      onBlur={(e) => e.target.style.borderBottomColor = '#ccc'}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <label htmlFor="message" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', color: '#000', textTransform: 'uppercase' }}>Project Details / Inquiry</label>
                    <textarea
                      id="message" name="message" required rows={1} value={formData.message} onChange={handleChange}
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={(e) => e.target.style.borderBottomColor = '#000'}
                      onBlur={(e) => e.target.style.borderBottomColor = '#ccc'}
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = (e.target.scrollHeight) + 'px';
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={{ backgroundColor: '#fff', color: '#000' }}
                    style={{
                      alignSelf: 'flex-start',
                      padding: '1.2rem 4rem',
                      background: '#000',
                      border: '1px solid #000',
                      color: '#fff',
                      fontSize: '1rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'background-color 0.4s ease, color 0.4s ease',
                      marginTop: '1rem'
                    }}
                  >
                    {buttonLabel}
                  </motion.button>
                </form>
              </FadeIn>
            </div>

          </div>
        </section>

      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: '1600px', margin: isMobile ? '0 auto' : '0', padding: '0 5%', width: '100%' }}>
        <LineReveal />
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          padding: '2rem 0 3rem 0',
          gap: '2rem'
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#666' }}>
            © {new Date().getFullYear()} DAD Architects
          </span>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {SOCIAL_LINKS.map(({ id, icon, href, label }) => (
              <motion.a
                key={id} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ color: '#000', y: -2 }}
                style={{ color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.3s ease' }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
