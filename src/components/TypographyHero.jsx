import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const TypographyHero = () => {
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile(768);

  const words = [
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
    }
  ];

  const activeWord = words.find(w => w.id === hovered);

  return (
    <section 
      style={{
        width: '100vw', minHeight: '100vh', 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
        backgroundColor: 'var(--bg-primary)', padding: '10vh 5% 0', position: 'relative', overflow: 'hidden' 
      }}
    >

      {/* Main Typography Container */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column' : 'row', fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(4.5rem, 18vw, 18rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.05em', textAlign: 'center', zIndex: 2, alignItems: isMobile ? 'flex-start' : 'center' }}>
        {words.map((w) => (
          <motion.div 
            key={w.id}
            onMouseEnter={() => setHovered(w.id)}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => setHovered(w.id)}
            style={{ 
              display: 'flex', 
              cursor: 'pointer', 
              alignItems: 'center',
              color: hovered === w.id ? 'var(--text-primary)' : (hovered ? 'var(--text-secondary)' : 'var(--text-primary)'), 
              transition: 'color 0.4s ease' 
            }}
          >
            <motion.span 
              animate={{ color: hovered && hovered !== w.id ? 'var(--text-secondary)' : 'var(--text-primary)' }}
              transition={{ duration: 0.4 }}
              style={{ transform: 'scaleY(1.15)', display: 'inline-block', position: 'relative', zIndex: 3 }}
            >
              {w.letter}
            </motion.span>
            
            <motion.div
              initial={false}
              animate={{ width: hovered === w.id ? 'auto' : 0, opacity: hovered === w.id ? 1 : 0 }}
              transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', flexDirection: 'row', fontSize: isMobile ? 'clamp(1.2rem, 5.5vw, 2rem)' : 'clamp(1.5rem, 4vw, 5rem)', fontWeight: 800, fontStyle: 'normal', letterSpacing: '-0.02em', alignSelf: 'center', textTransform: 'uppercase' }}
            >
              <div style={{ paddingLeft: '1vw', paddingRight: '2vw', transform: 'scaleY(1.15)' }}>{w.remainder}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Structural Elaborative Data Block */}
      <div style={{ position: 'absolute', bottom: isMobile ? '5%' : '8%', width: '100%', padding: '0 5%', display: 'flex', justifyContent: 'center', zIndex: 2 }}>
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div 
              key={activeWord.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr 1fr', gap: '2rem', width: '100%', maxWidth: '1200px', borderTop: '1px solid #000', paddingTop: '1.5rem', textAlign: 'left' }}
            >
              <div>
                <span style={{ fontSize: isMobile ? '0.75rem' : '0.65rem', fontWeight: 700, letterSpacing: '2px', color: '#000', opacity: 0.5 }}>{activeWord.title}</span>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: isMobile ? '1rem' : '0.85rem', fontWeight: 600, lineHeight: 1.6, textTransform: 'uppercase', color: '#000', maxWidth: '400px' }}>
                  {activeWord.desc}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {activeWord.tags.map((tag, i) => (
                  <span key={i} style={{ fontSize: isMobile ? '0.7rem' : '0.6rem', fontWeight: 700, letterSpacing: '1px', color: '#000', opacity: 0.8 }}>+ {tag}</span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', justifyContent: 'center', width: '100%', borderTop: '1px solid transparent', paddingTop: '1.5rem' }}
            >
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '4px', color: '#000', opacity: 0.4, textTransform: 'uppercase' }}>
                {isMobile ? 'Tap each letter to explore' : 'Hover over letters to explore'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};

export default TypographyHero;
