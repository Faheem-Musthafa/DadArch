import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const WORDS = [
  {
    id: '1', letter: 'D', remainder: 'ERIVING',
    title: '01 // THE CONCEPT',
    desc: 'Formulating spatial narratives that respond to environment and human needs. We sculpt ideas into tangible footprints.',
    tags: ['CONCEPTUALIZATION', 'MASTER PLANNING', '3D VISUALIZATION'],
  },
  {
    id: '2', letter: 'A', remainder: 'RCHITECTURAL',
    title: '02 // THE STRUCTURE',
    desc: 'Engineering aesthetics. Bridging materials, light, and gravity to construct timeless monolithic forms.',
    tags: ['STRUCTURAL DESIGN', 'FACADE ENGINEERING', 'SPATIAL DYNAMICS'],
  },
  {
    id: '3', letter: 'D', remainder: 'IMENSIONS',
    title: '03 // THE EXECUTION',
    desc: 'Obsessive precision. Curating raw textures and refining every micro-interaction within the built space.',
    tags: ['INTERIOR CURATION', 'MATERIAL SELECTION', 'FURNITURE DESIGN'],
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
  width: '100vw',
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
  const activeWord = WORDS.find((w) => w.id === active);

  const headingStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(4.5rem, 18vw, 18rem)',
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
    <section style={sectionStyle}>
      <h1 style={headingStyle}>
        {WORDS.map((w) => {
          const isActive = active === w.id;
          const dimmed = active && !isActive;
          return (
            <motion.button
              key={w.id}
              type="button"
              onClick={() => setActive((curr) => (curr === w.id ? null : w.id))}
              onMouseEnter={isMobile ? undefined : () => setActive(w.id)}
              onMouseLeave={isMobile ? undefined : () => setActive(null)}
              aria-expanded={isActive}
              aria-controls={PANEL_ID}
              style={{
                ...BUTTON_RESET,
                display: 'flex',
                alignItems: 'center',
                color: dimmed ? 'var(--text-secondary)' : 'var(--text-primary)',
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
                  fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(3rem, 9vw, 10rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  alignSelf: 'center',
                  textTransform: 'uppercase',
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
        <AnimatePresence mode="wait">
          {activeWord ? (
            <motion.div
              key={activeWord.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr 1fr',
                gap: '2rem',
                width: '100%',
                maxWidth: '1200px',
                borderTop: '1px solid var(--text-primary)',
                paddingTop: '1.5rem',
                textAlign: 'left',
                color: 'var(--text-primary)',
              }}
            >
              <span style={{ fontSize: isMobile ? '0.75rem' : '0.65rem', fontWeight: 700, letterSpacing: '2px', opacity: 0.5 }}>
                {activeWord.title}
              </span>
              <p style={{ margin: 0, fontSize: isMobile ? '1rem' : '0.85rem', fontWeight: 600, lineHeight: 1.6, textTransform: 'uppercase', maxWidth: '400px' }}>
                {activeWord.desc}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {activeWord.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: isMobile ? '0.7rem' : '0.6rem', fontWeight: 700, letterSpacing: '1px', opacity: 0.8 }}>
                    + {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TypographyHero;
