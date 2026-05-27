import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SEO from '../components/SEO';
import useIsMobile from '../hooks/useIsMobile';
import projects from '../data/projects';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const getGridSpan = (index, isMobile) => {
  if (isMobile) return { gridColumn: 'span 1', gridRow: 'span 1' };

  const pattern = index % 6;
  switch (pattern) {
    case 0: return { gridColumn: 'span 2', gridRow: 'span 2' }; // 2x2 Large
    case 1: return { gridColumn: 'span 1', gridRow: 'span 2' }; // 1x2 Tall
    case 2: return { gridColumn: 'span 1', gridRow: 'span 1' }; // 1x1 Small
    case 3: return { gridColumn: 'span 2', gridRow: 'span 1' }; // 2x1 Wide
    case 4: return { gridColumn: 'span 1', gridRow: 'span 2' }; // 1x2 Tall
    case 5: return { gridColumn: 'span 2', gridRow: 'span 1' }; // 2x1 Wide
    default: return { gridColumn: 'span 1', gridRow: 'span 1' };
  }
};

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const Work = () => {
  const isMobile = useIsMobile(768);
  const [selectedId, setSelectedId] = useState(null);
  const rootRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.work-card');
    if (cards.length > 0) {
      gsap.set(cards, { opacity: 0 });

      ScrollTrigger.batch(cards, {
        start: 'top bottom-=80',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, duration: 1.1, stagger: 0.08, ease: 'power3.out', overwrite: 'auto' }),
      });
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, { scope: rootRef, dependencies: [isMobile] });

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      gsap.set('.work-card', { opacity: 1 });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedId]);

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <div ref={rootRef} style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <SEO
        title="Works — DAD Architects"
        description="A curated archive of spaces designed with absolute intention."
        url="/work"
      />

      {/* HERO */}
      <section style={{ padding: isMobile ? '35vh 5% 0' : '10vh 5% 10vh' }}>
      </section>

      {/* BENTO GRID PORTFOLIO */}
      <section style={{ padding: '0 5% 35vh' }}>
        <div style={{
          maxWidth: '1600px',
          margin: isMobile ? '0 auto' : '0',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gridAutoRows: isMobile ? '65vw' : '450px',
          gridAutoFlow: 'dense',
          gap: '1px',
          backgroundColor: '#eaeaea',
          border: '1px solid #eaeaea'
        }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="work-card"
              layoutId={`card-container-${p.id}`}
              style={{
                ...getGridSpan(i, isMobile),
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                backgroundColor: '#fff'
              }}
              whileHover="hover"
              onClick={() => setSelectedId(p.id)}
            >
              <motion.img
                layoutId={`image-${p.id}`}
                variants={{ hover: { scale: 1.05, filter: 'grayscale(0%)' } }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={p.img}
                alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
              />

              {/* Gradient Overlay */}
              {!isMobile && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,17,0.55)', opacity: 0.85, transition: 'opacity 0.5s ease' }} />
              )}

              {!isMobile && (
                <motion.div
                  variants={{ hover: { y: -10 } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', right: '2.5rem', color: '#fff' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <motion.div layoutId={`title-container-${p.id}`}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ccc', display: 'block', marginBottom: '0.5rem' }}>
                        {p.id}
                      </span>
                      <motion.h2
                        layoutId={`title-${p.id}`}
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.1 }}
                      >
                        {p.title}
                      </motion.h2>
                    </motion.div>

                    <motion.div
                      variants={{ hover: { x: 5, opacity: 1 } }}
                      initial={{ opacity: 0 }}
                      style={{ border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDITORIAL PROJECT MODAL */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed', inset: 0,
              backgroundColor: '#fff',
              zIndex: 9999,
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
          >
            {/* CLOSE BUTTON */}
            <motion.button
              onClick={() => setSelectedId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed', top: isMobile ? '2rem' : '3rem', right: isMobile ? '5%' : '4rem',
                zIndex: 10000, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', color: '#fff'
              }}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Close</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            {/* FULL SCREEN HERO */}
            <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#111' }}>
              <motion.img
                layoutId={`image-${selectedProject.id}`}
                src={selectedProject.img}
                alt={selectedProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,17,0.55)' }} />

              <div style={{ position: 'absolute', bottom: '10vh', left: '5%', right: '5%', maxWidth: '1400px', margin: '0 auto', color: '#fff' }}>
                <motion.div layoutId={`title-container-${selectedProject.id}`}>
                  <motion.h2
                    layoutId={`title-${selectedProject.id}`}
                    style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.03em', lineHeight: 1, textTransform: 'uppercase' }}
                  >
                    {selectedProject.title}
                  </motion.h2>
                </motion.div>
              </div>
            </div>

            {/* ARTICLE CONTENT */}
            <div style={{ padding: isMobile ? '10vh 5%' : '15vh 5%' }}>
              <div style={{ maxWidth: '1400px', margin: '0 auto' }}>


                {/* BENTO GRID GALLERY */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
                    gridAutoRows: isMobile ? '45vw' : '350px',
                    gridAutoFlow: 'dense',
                    gap: '1rem' 
                  }}
                >
                  {selectedProject.gallery.map((imgRaw, idx) => {
                    const imgUrl = typeof imgRaw === 'string' ? imgRaw : (imgRaw?.image || '');
                    
                    let gridSpan = {};
                    if (!isMobile) {
                      // Perfect 4x3 tight-packed grid pattern
                      const pattern = idx % 6;
                      switch (pattern) {
                        case 0: gridSpan = { gridColumn: 'span 2', gridRow: 'span 2' }; break; // Large 2x2
                        case 1: gridSpan = { gridColumn: 'span 2', gridRow: 'span 1' }; break; // Wide 2x1
                        case 2: gridSpan = { gridColumn: 'span 1', gridRow: 'span 1' }; break; // Small 1x1
                        case 3: gridSpan = { gridColumn: 'span 1', gridRow: 'span 2' }; break; // Tall 1x2
                        case 4: gridSpan = { gridColumn: 'span 1', gridRow: 'span 1' }; break; // Small 1x1
                        case 5: gridSpan = { gridColumn: 'span 2', gridRow: 'span 1' }; break; // Wide 2x1
                        default: gridSpan = { gridColumn: 'span 1', gridRow: 'span 1' }; break;
                      }
                    } else {
                      // Perfect 2x5 tight-packed grid pattern
                      const pattern = idx % 5;
                      switch (pattern) {
                        case 0: gridSpan = { gridColumn: 'span 2', gridRow: 'span 2' }; break; // Large 2x2
                        case 1: gridSpan = { gridColumn: 'span 1', gridRow: 'span 1' }; break; // Small 1x1
                        case 2: gridSpan = { gridColumn: 'span 1', gridRow: 'span 1' }; break; // Small 1x1
                        case 3: gridSpan = { gridColumn: 'span 2', gridRow: 'span 1' }; break; // Wide 2x1
                        case 4: gridSpan = { gridColumn: 'span 2', gridRow: 'span 1' }; break; // Wide 2x1
                        default: gridSpan = { gridColumn: 'span 1', gridRow: 'span 1' }; break;
                      }
                    }
                    
                    return (
                      <div
                        key={`${idx}-${imgUrl}`}
                        style={{
                          ...gridSpan,
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#f5f5f5',
                          overflow: 'hidden'
                        }}
                      >
                        <img 
                          src={imgUrl} 
                          alt={`Gallery ${idx + 1}`} 
                          loading="lazy" 
                          decoding="async" 
                          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} 
                        />
                      </div>
                    );
                  })}
                </motion.div>

                <div style={{ textAlign: 'center', margin: '15vh 0 5vh 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.5rem 3rem',
                      backgroundColor: '#000',
                      color: '#fff',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      fontSize: '1.2rem',
                    }}
                  >
                    Start A Project
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Work;
