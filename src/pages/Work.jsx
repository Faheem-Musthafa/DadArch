import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import useIsMobile from '../hooks/useIsMobile';

const projects = [
  {
    id: '01', title: 'Niyas & Family', subtitle: 'Moodadi, Calicut — Residential', img: '/project/dad11.jpeg',
    desc: 'A serene residential space designed to balance natural light with robust materials. The home integrates into the lush landscape, offering sweeping views while maintaining profound privacy.',
    details: { area: '4,200 sqft', year: '2025', role: 'Architecture & Interiors' },
    gallery: ['/project/dad2.jpeg', '/project/dad4.jpeg', '/project/dad12.jpeg']
  },
  {
    id: '02', title: 'IM House', subtitle: 'Calicut — Residential', img: '/project/dad2.jpeg',
    desc: 'An exploration of monolithic forms. The IM House utilizes exposed concrete and brutalist elements softened by warm timber accents and expansive interior courtyards.',
    details: { area: '3,800 sqft', year: '2024', role: 'Architecture & Landscape' },
    gallery: ['/project/dad11.jpeg', '/project/dad4.jpeg', '/project/dad12.jpeg']
  },
  {
    id: '03', title: 'Anas & Family', subtitle: 'Manjeri — Residential', img: '/project/dad4.jpeg',
    desc: 'Rooted in tropical modernism, this residence features deep overhangs and cross-ventilation strategies to combat the local climate, creating a cool, breathable sanctuary.',
    details: { area: '5,100 sqft', year: '2023', role: 'Complete Design' },
    gallery: ['/project/dad11.jpeg', '/project/dad2.jpeg', '/project/dad12.jpeg']
  },
  {
    id: '04', title: 'Sathar & Family', subtitle: 'Koylandi — Residential', img: '/project/dad4.jpeg',
    desc: 'A minimalist retreat that prioritizes family interaction. The open-plan layout eliminates unnecessary walls, allowing life to flow seamlessly from indoor living to the outdoor deck.',
    details: { area: '2,900 sqft', year: '2024', role: 'Interior Architecture' },
    gallery: ['/project/dad11.jpeg', '/project/dad2.jpeg', '/project/dad12.jpeg']
  },
  {
    id: '05', title: 'Mafi House', subtitle: 'Peringathur — Residential', img: '/project/dad12.jpeg',
    desc: 'Characterized by its floating roof plane, Mafi House is a study in lightness. Glass walls completely dissolve the boundary between the living spaces and the central reflection pool.',
    details: { area: '6,000 sqft', year: '2025', role: 'Architecture' },
    gallery: ['/project/dad2.jpeg', '/project/dad4.jpeg', '/project/dad11.jpeg']
  },
  {
    id: '06', title: 'Ashraf Residence', subtitle: 'Calicut — Residential', img: '/project/dad11.jpeg',
    desc: 'An urban infill project that maximizes natural light on a tight plot. Skylights and vertical voids draw sunlight down through three stories of carefully curated interior spaces.',
    details: { area: '2,400 sqft', year: '2023', role: 'Architecture & Interiors' },
    gallery: ['/project/dad12.jpeg', '/project/dad2.jpeg', '/project/dad4.jpeg']
  },
];

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

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedId]);

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#050505', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <SEO
        title="Works — DAD Architects"
        description="A curated archive of spaces designed with absolute intention."
        url="/work"
      />

      {/* HERO */}
      <section style={{ padding: isMobile ? '20vh 5% 10vh' : '25vh 5% 10vh' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <FadeIn>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '1.5rem' }}>
              Archive
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#555', marginTop: '3rem', maxWidth: '600px', fontWeight: 400 }}>
              An exploration of form, light, and material. Every project is a unique response to its context and its inhabitants, stripped of the unnecessary to reveal pure architectural truth.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* BENTO GRID PORTFOLIO */}
      <section style={{ padding: '0 5% 35vh' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gridAutoRows: isMobile ? '65vw' : '450px',
          gap: '1rem'
        }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              layoutId={`card-container-${p.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...getGridSpan(i, isMobile),
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '1rem',
                backgroundColor: '#f5f5f5'
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
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)', opacity: 0.8 }} />
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
                        {p.id} — {p.details.year}
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
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)' }} />

              <div style={{ position: 'absolute', bottom: '10vh', left: '5%', right: '5%', maxWidth: '1400px', margin: '0 auto', color: '#fff' }}>
                <motion.div layoutId={`title-container-${selectedProject.id}`}>
                  <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', display: 'block', marginBottom: '1rem' }}>
                    {selectedProject.id} — {selectedProject.subtitle}
                  </span>
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
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? '4rem' : '8rem', marginBottom: '15vh' }}>

                  {/* Stats Sidebar */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: '3rem', backgroundColor: '#f9f9f9', borderRadius: '1rem' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '0.5rem' }}>Area</span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111', textTransform: 'uppercase' }}>{selectedProject.details.area}</span>
                      </div>
                      <div style={{ height: '1px', backgroundColor: '#eaeaea' }} />
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '0.5rem' }}>Year</span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111', textTransform: 'uppercase' }}>{selectedProject.details.year}</span>
                      </div>
                      <div style={{ height: '1px', backgroundColor: '#eaeaea' }} />
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '0.5rem' }}>Role</span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111', textTransform: 'uppercase' }}>{selectedProject.details.role}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.4, color: '#111', margin: 0, fontWeight: 500, letterSpacing: '-0.02em' }}>
                      {selectedProject.desc}
                    </p>
                  </motion.div>
                </div>

                {/* ASYMMETRICAL GALLERY */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: '1rem' }}
                >
                  {selectedProject.gallery.map((imgUrl, idx) => {
                    // Create an asymmetrical layout for gallery images
                    let gridColumn = 'span 12';
                    if (!isMobile) {
                      if (idx === 0) gridColumn = '1 / 9'; // Large left
                      else if (idx === 1) gridColumn = '9 / -1'; // Tall right
                      else if (idx === 2) gridColumn = '3 / 11'; // Centered wide
                    }

                    return (
                      <div
                        key={idx}
                        style={{
                          gridColumn,
                          aspectRatio: isMobile ? '4/3' : (idx === 1 ? '3/4' : '16/9'),
                          borderRadius: '1rem',
                          overflow: 'hidden',
                          backgroundColor: '#f5f5f5'
                        }}
                      >
                        <img src={imgUrl} alt={`Gallery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    );
                  })}
                </motion.div>

                <div style={{ textAlign: 'center', margin: '15vh 0 5vh 0' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ccc' }}>
                    End of Project
                  </span>
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
