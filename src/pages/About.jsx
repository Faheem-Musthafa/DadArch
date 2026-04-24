import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SEO from '../components/SEO';
import useIsMobile from '../hooks/useIsMobile';

const TextReveal = ({ children, delay = 0, fontSize, fontWeight, lineHeight, letterSpacing, textTransform, style }) => (
  <div style={{ overflow: 'hidden', ...style }}>
    <motion.div
      initial={{ y: '100%' }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ fontSize, fontWeight, lineHeight, letterSpacing, textTransform }}
    >
      {children}
    </motion.div>
  </div>
);

const About = () => {
  const isMobile = useIsMobile(768);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const disciplines = ['Architecture', 'Interior Design', 'Landscaping', 'Product Design', '3D Animation'];

  return (
    <div ref={containerRef} style={{ backgroundColor: '#ffffff', color: '#000', overflowX: 'hidden' }}>
      <SEO
        title="About — DAD Architects"
        description="Deriving Architectural Dimensions. Professional architects based in Calicut and Manjeri."
        url="/about"
      />

      {/* 01. HERO SECTION - PURE WHITE MINIMALISM */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 5%' }}>
          <TextReveal 
            fontSize="0.75rem" 
            fontWeight={800} 
            letterSpacing="0.6em" 
            textTransform="uppercase" 
            style={{ opacity: 0.3, marginBottom: '2.5rem' }}
          >
            DERIVING ARCHITECTURAL DIMENSIONS
          </TextReveal>
          <TextReveal 
            fontSize="clamp(3.5rem, 15vw, 12rem)" 
            fontWeight={800} 
            lineHeight={0.8} 
            letterSpacing="-0.06em" 
            textTransform="uppercase"
            delay={0.1}
          >
            THE STUDIO
          </TextReveal>
        </div>
      </section>

      {/* 02. REDESIGNED VISION BENTO GRID */}
      <section style={{ padding: isMobile ? '10vh 5%' : '15vh 10%', backgroundColor: '#ffffff' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gridAutoRows: isMobile ? 'auto' : '350px',
          gap: '1.5rem',
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          {/* Main Philosophy - Large Span */}
          <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2', gridRow: isMobile ? 'span 1' : 'span 2', backgroundColor: '#fcfcfc', border: '1px solid #f0f0f0', padding: isMobile ? '2.5rem' : '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <TextReveal fontSize="0.65rem" fontWeight={800} letterSpacing="0.4em" textTransform="uppercase" style={{ opacity: 0.3 }}>
              01 // The Philosophy
            </TextReveal>
            <div>
              <div style={{ marginBottom: '2.5rem' }}>
                {["Defining the silence", "between spaces."].map((line, i) => (
                  <TextReveal key={i} fontSize="clamp(2.5rem, 6vw, 4.5rem)" fontWeight={800} lineHeight={0.95} letterSpacing="-0.05em">
                    {line}
                  </TextReveal>
                ))}
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.5, maxWidth: '600px', fontWeight: 500 }}
              >
                DAD Architects is committed to sustainable, responsive design. We listen, research, and synthesise complex needs into simple, elegant spatial narratives.
              </motion.p>
            </div>
          </div>

          {/* Discipline Box - Tall Vertical */}
          <div style={{ gridRow: isMobile ? 'span 1' : 'span 2', backgroundColor: '#000', color: '#fff', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <TextReveal fontSize="0.65rem" fontWeight={800} letterSpacing="0.3em" textTransform="uppercase" style={{ opacity: 0.4, marginBottom: '3rem' }}>
              Core Expertise
            </TextReveal>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {disciplines.map((d, i) => (
                <li key={i} style={{ overflow: 'hidden' }}>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem', opacity: 0.8 }}
                  >
                    {d}
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* The Vision Box */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #f0f0f0', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 800, opacity: 0.2, marginBottom: '1.5rem', display: 'block' }}>02 // THE VISION</span>
            <p style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.5, opacity: 0.6 }}>
              Design is not just what it looks like and feels like. Design is how it works.
            </p>
          </div>

          {/* Studio Stats Box */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #f0f0f0', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 800, opacity: 0.2, marginBottom: '1.5rem', display: 'block' }}>03 // THE IMPACT</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.05em' }}>15</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, opacity: 0.4 }}>YEARS OF LEGACY</span>
            </div>
          </div>
        </div>
      </section>

      {/* 03. TEAM INTRODUCTION - THE COLLECTIVE */}
      <section style={{ padding: '15vh 10% 20vh', backgroundColor: '#ffffff' }}>
        <div style={{ marginBottom: '10vh' }}>
          <TextReveal fontSize="0.65rem" fontWeight={800} letterSpacing="0.4em" textTransform="uppercase" style={{ opacity: 0.2, marginBottom: '2rem' }}>
            THE VISIONARIES
          </TextReveal>
          <div style={{ marginBottom: '4rem' }}>
            {["THE", "COLLECTIVE"].map((line, i) => (
              <TextReveal key={i} fontSize="clamp(3rem, 10vw, 8rem)" fontWeight={800} letterSpacing="-0.05em" lineHeight={0.9} textTransform="uppercase">
                {line}
              </TextReveal>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '2.5rem'
        }}>
          {[
            { name: 'Ar. Shibili P.', role: 'Principal Architect', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800' },
            { name: 'Ar. Niyas M.', role: 'Principal Architect', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800' },
            { name: 'Anjali S.', role: 'Senior Designer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800' },
            { name: 'Mohammed R.', role: 'Project Engineer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800' }
          ].map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column' }}
              whileHover="hover"
            >
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                backgroundColor: '#f5f5f5',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                position: 'relative'
              }}>
                <motion.img
                  variants={{
                    hover: { scale: 1.05, filter: 'grayscale(0%)' }
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%) contrast(1.1)',
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.4rem 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{member.name}</h3>
              <span style={{ fontSize: '0.7rem', color: '#999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{member.role}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 04. RECOGNITION CTA */}
      <section style={{ padding: '15vh 10%', backgroundColor: '#ffffff', color: '#000', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          <div style={{ marginBottom: '4rem' }}>
            {["Driven by a shared vision.", "Fostering collaboration across", "every dimension."].map((line, i) => (
              <TextReveal key={i} fontSize="clamp(2rem, 5vw, 4rem)" fontWeight={800} letterSpacing="-0.04em" lineHeight={1}>
                {line}
              </TextReveal>
            ))}
          </div>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02, backgroundColor: '#333' }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-block',
              padding: '1.8rem 5rem',
              backgroundColor: '#000',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              borderRadius: '100px'
            }}
          >
            Work with us
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
