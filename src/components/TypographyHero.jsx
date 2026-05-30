import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ChatCircle } from '@phosphor-icons/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useIsMobile from '../hooks/useIsMobile';

gsap.registerPlugin(useGSAP);

const WORDS = [
  {
    id: '1', letter: 'D', remainder: 'ERIVING',
  },
  {
    id: '2', letter: 'A', remainder: 'RCHITECTURAL',
  },
  {
    id: '3', letter: 'D', remainder: 'IMENSIONS',
  },
];

const PANEL_ID = 'typography-hero-panel';

const BUTTON_RESET = {
  appearance: 'none',
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
};

const sectionStyle = {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'var(--bg-primary)',
  padding: '10vh 5% 0',
  position: 'relative',
  overflow: 'hidden',
};

const TypographyHero = () => {
  const [active, setActive] = useState(null);
  const isMobile = useIsMobile(768);

  const heroRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (active !== null) {
        const clickedLetterButton = event.target.closest('.hero-letter');
        if (!clickedLetterButton) {
          setActive(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [active]);

  useGSAP(() => {
    const letters = gsap.utils.toArray('.hero-letter');
    const meta = gsap.utils.toArray('.hero-meta');
    if (letters.length > 0) {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from(letters, { y: 80, opacity: 0, duration: 1.2, stagger: 0.1 });
      if (meta.length > 0) {
        tl.from(meta, { opacity: 0, y: 12, duration: 0.8 }, '-=0.6');
      }
    }
  }, { scope: heroRef });

  const headingStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(4.5rem, 12vw, 15rem)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    lineHeight: 1.1,
    letterSpacing: '-0.05em',
    textAlign: 'center',
    zIndex: 2,
    alignItems: isMobile ? 'flex-start' : 'center',
    margin: 0,
  };

  return (
    <section ref={heroRef} style={sectionStyle}>
      <h1 style={headingStyle} className="hero-letter-wrap">
        {WORDS.map((w) => {
          const isActive = active === w.id;
          return (
            <motion.button
              key={w.id}
              type="button"
              className="hero-letter"
              onClick={() => setActive((curr) => (curr === w.id ? null : w.id))}
              onMouseEnter={isMobile ? undefined : () => setActive(w.id)}
              onMouseLeave={isMobile ? undefined : () => setActive(null)}
              aria-expanded={isActive}
              aria-controls={PANEL_ID}
              style={{
                ...BUTTON_RESET,
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-primary)',
                transition: 'color 0.4s ease',
              }}
            >
              <span style={{ transform: 'scaleY(1.15)', display: 'inline-block', position: 'relative', zIndex: 3 }}>
                {w.letter}
              </span>

              <motion.span
                initial={false}
                animate={{ width: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(3rem, 6.5vw, 8.5rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}
              >
                <span style={{ paddingLeft: 0, paddingRight: 0, transform: 'scaleY(1.15)', display: 'inline-block' }}>
                  {w.remainder}
                </span>
              </motion.span>
            </motion.button>
          );
        })}
      </h1>

      <div
        id={PANEL_ID}
        className="hero-meta"
        style={{
          position: 'absolute',
          bottom: isMobile ? '5%' : '8%',
          width: '100%',
          padding: '0 5%',
          display: isMobile ? 'none' : 'flex',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <motion.span
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '4px',
            color: 'var(--text-primary)',
            opacity: 0.4,
            textTransform: 'uppercase',
            paddingTop: '1.5rem',
          }}
        >
          {isMobile ? 'Tap each letter to explore' : 'Hover over letters to explore'}
        </motion.span>
      </div>

      {isMobile && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '5%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 10,
          }}
        >
          <a
            href="https://wa.me/916282281828"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              borderRadius: '50%',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <ChatCircle size={22} weight="fill" />
          </a>
          <a
            href="tel:+9196282281828"
            aria-label="Call"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              border: '1.5px solid var(--text-primary)',
              borderRadius: '50%',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <Phone size={22} weight="fill" />
          </a>
        </motion.div>
      )}
    </section>
  );
};

export default TypographyHero;
