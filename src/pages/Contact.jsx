import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import useIsMobile from '../hooks/useIsMobile';
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const mailtoUrl = `mailto:info@dadarchitects.com?subject=Project Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const buttonLabel = {
    idle: 'SUBMIT INQUIRY',
    submitting: 'OPENING...',
    success: 'TRANSMITTED',
    error: 'ERROR - RETRY',
  }[status];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ 
        width: '100vw', 
        minHeight: '100vh', 
        overflowX: 'hidden',
        overflowY: isMobile ? 'auto' : 'hidden',
        backgroundColor: '#fff', 
        color: '#000', 
        display: 'flex',
        flexDirection: 'column',
        padding: isMobile ? '12vh 6vw 4vh' : '12vh 5vw 4vh',
      }}
    >
      <SEO
        title="Contact"
        description="Inquire and collaborate with DAD Architects. Get in touch with us at our Calicut or Manjeri offices."
        url="/contact"
      />
      
      <div style={{ 
        display: 'flex', 
        flex: 1, 
        flexDirection: isMobile ? 'column' : 'row', 
        gap: isMobile ? '6vh' : '5vw', 
        width: '100%', 
        maxWidth: '1600px', 
        margin: '0 auto',
      }}>
        
        {/* Left Column: Typography & Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: isMobile ? 'flex-start' : 'center', zIndex: 10 }}
        >
          <div>
            <h1 style={{ 
              fontSize: 'clamp(3.5rem, 8vw, 8rem)', 
              fontWeight: 800, 
              lineHeight: 0.9, 
              letterSpacing: '-0.04em',
              margin: isMobile ? '2vh 0 4vh 0' : '0 0 4vh 0',
            }}>
              Let's build<br />the future.
            </h1>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
              gap: isMobile ? '4vh' : '2vw', 
              marginTop: '4vh' 
            }}>
              <div>
                <h4 style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5, marginBottom: '1rem', color: '#000' }}>Studio</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', opacity: 0.9 }}>
                  <motion.a href="mailto:info@dadarchitects.com" whileHover={{ x: 5, color: '#666' }} style={{ textDecoration: 'none', color: '#000', width: 'max-content' }}>info@dadarchitects.com</motion.a>
                  <motion.a href="tel:+919995881828" whileHover={{ x: 5, color: '#666' }} style={{ textDecoration: 'none', color: '#000', width: 'max-content' }}>+91 99958 81828</motion.a>
                </div>
              </div>
              
              <div>
                <h4 style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5, marginBottom: '1rem', color: '#000' }}>Locations</h4>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? '4vw' : '1.5rem', fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.4 }}>
                  <address style={{ fontStyle: 'normal', color: '#000' }}>
                    1720, 7th Floor<br />
                    HiLite Business Park<br />
                    Calicut, Kerala
                  </address>
                  <address style={{ fontStyle: 'normal', color: '#000' }}>
                    3/101, City Point<br />
                    Manjeri, Kerala
                  </address>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: isMobile ? 'flex-start' : 'center', width: '100%', maxWidth: isMobile ? '100%' : '600px', zIndex: 10, paddingBottom: isMobile ? '10vh' : '0' }}
        >
          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5vh' }} noValidate>
            
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', gap: '0.5rem' }}>
              <label htmlFor="name" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '2px', color: '#111' }}>YOUR NAME</label>
              <input
                id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                style={{
                  width: '100%', background: '#f5f5f5', border: '1px solid transparent',
                  color: '#111', fontSize: '0.85rem', padding: '1rem 1.2rem', outline: 'none', letterSpacing: '1px',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#111'}
                onBlur={(e) => e.target.style.borderColor = 'transparent'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', gap: '0.5rem' }}>
              <label htmlFor="email" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '2px', color: '#111' }}>EMAIL ADDRESS</label>
              <input
                id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                style={{
                  width: '100%', background: '#f5f5f5', border: '1px solid transparent',
                  color: '#111', fontSize: '0.85rem', padding: '1rem 1.2rem', outline: 'none', letterSpacing: '1px',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#111'}
                onBlur={(e) => e.target.style.borderColor = 'transparent'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', gap: '0.5rem' }}>
              <label htmlFor="message" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '2px', color: '#111' }}>PROJECT DETAILS / INQUIRY</label>
              <textarea
                id="message" name="message" required rows={4} value={formData.message} onChange={handleChange}
                style={{
                  width: '100%', background: '#f5f5f5', border: '1px solid transparent',
                  color: '#111', fontSize: '0.85rem', padding: '1rem 1.2rem', outline: 'none', resize: 'none', letterSpacing: '1px',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#111'}
                onBlur={(e) => e.target.style.borderColor = 'transparent'}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'submitting'}
              whileHover={{ backgroundColor: '#333' }}
              whileTap={{ scale: 0.99 }}
              style={{
                width: '100%', padding: '1.4rem 1.5rem', background: '#111', marginTop: '1rem',
                border: 'none', color: '#fff', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px',
                cursor: 'pointer', transition: 'background-color 0.3s'
              }}
            >
              {buttonLabel}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Footer Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ 
          marginTop: isMobile ? '0' : 'auto', 
          display: 'flex', 
          flexDirection: isMobile ? 'column-reverse' : 'row',
          justifyContent: isMobile ? 'center' : 'space-between', 
          alignItems: 'center', 
          gap: isMobile ? '3vh' : '0',
          borderTop: '1px solid rgba(0,0,0,0.1)', 
          paddingTop: '3vh', 
          fontSize: '0.75rem', 
          opacity: 0.5, 
          letterSpacing: '1px', 
          textTransform: 'uppercase', 
          zIndex: 10,
          paddingBottom: isMobile ? '2vh' : '0'
        }}
      >
        <span>© {new Date().getFullYear()} DAD Architects</span>
        <div style={{ display: 'flex', gap: isMobile ? '8vw' : '2rem', alignItems: 'center' }}>
          {SOCIAL_LINKS.map(({ id, icon, href, label }) => (
            <motion.a
              key={id} href={href} target="_blank" rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ color: '#000', opacity: 1, scale: 1.1 }}
              style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
            >
              {icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
