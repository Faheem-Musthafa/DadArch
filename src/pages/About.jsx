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

const About = () => {
  const isMobile = useIsMobile(768);

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000', overflowX: 'hidden' }}>
      <SEO
        title="About — DAD Architects"
        description="A premium architecture and design studio based in Calicut and Manjeri."
        url="/about"
      />

      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 5%' }}>
        
        {/* HERO SECTION */}
        <section style={{ height: '85vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '10vh' }}>
          <FadeIn>
            <h1 style={{ 
              fontSize: 'clamp(3.5rem, 10vw, 9rem)', 
              fontWeight: 300, 
              lineHeight: 0.85, 
              letterSpacing: '-0.02em',
              margin: 0, 
              textTransform: 'uppercase' 
            }}>
              DAD Architects<br/>
              <span style={{ fontWeight: 600 }}>Space, Light & Material.</span>
            </h1>
          </FadeIn>
        </section>

        {/* THE STUDIO SECTION */}
        <section style={{ paddingTop: '10vh', paddingBottom: '15vh' }}>
          <LineReveal />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ gridColumn: isMobile ? '1' : '1 / 4' }}>
              <FadeIn>
                <span style={{ fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                  The Studio
                </span>
              </FadeIn>
            </div>
            
            <div style={{ gridColumn: isMobile ? '1' : '5 / 11' }}>
              <FadeIn delay={0.1}>
                <p style={{ 
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
                  fontWeight: 400, 
                  lineHeight: 1.3, 
                  margin: '0 0 4rem 0',
                  letterSpacing: '-0.01em'
                }}>
                  Based in Calicut and Manjeri, our practice is rooted in a profound respect for context, climate, and the people who inhabit our spaces. We believe architecture should not be loud or intrusive; rather, it should gently accommodate life.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <div style={{ width: '100%', overflow: 'hidden' }}>
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600" 
                    alt="Studio Interior" 
                    style={{ width: '100%', aspectRatio: isMobile ? '4/3' : '16/9', objectFit: 'cover', filter: 'grayscale(100%)' }} 
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* EXPERTISE SECTION */}
        <section style={{ paddingTop: '10vh', paddingBottom: '15vh' }}>
          <LineReveal />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ gridColumn: isMobile ? '1' : '1 / 4' }}>
              <FadeIn>
                <span style={{ fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                  Expertise
                </span>
              </FadeIn>
            </div>
            
            <div style={{ gridColumn: isMobile ? '1' : '5 / 13' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}>
                {['Architecture', 'Interior Design', 'Master Planning', 'Landscaping', 'Product Design'].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
                      fontWeight: 600, 
                      textTransform: 'uppercase', 
                      borderBottom: i !== 4 ? '1px solid #eaeaea' : 'none', 
                      padding: '2rem 0',
                      letterSpacing: '-0.02em',
                      lineHeight: 1
                    }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* THE COLLECTIVE SECTION */}
        <section style={{ paddingTop: '10vh', paddingBottom: '20vh' }}>
          <LineReveal />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ gridColumn: isMobile ? '1' : '1 / 4' }}>
              <FadeIn>
                <span style={{ fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                  The Team
                </span>
              </FadeIn>
            </div>
            
            <div style={{ gridColumn: isMobile ? '1' : '5 / 13' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  { name: 'Niyas', position: 'Principal Architect' },
                  { name: 'Anas', position: 'Lead Designer' },
                  { name: 'Sathar', position: 'Senior Engineer' },
                  { name: 'Mafi', position: 'Interior Architect' },
                  { name: 'Ashraf', position: 'Project Manager' },
                ].map((member, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'baseline', 
                      borderBottom: '1px solid #eaeaea', 
                      padding: '1.5rem 0' 
                    }}
                  >
                    <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#000' }}>
                      {member.name}
                    </span>
                    <span style={{ fontSize: 'clamp(0.85rem, 2vw, 1.1rem)', fontWeight: 500, textTransform: 'uppercase', color: '#888', letterSpacing: '0.05em', textAlign: 'right' }}>
                      {member.position}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
      {/* MASSIVE FOOTER / CTA */}
      <section style={{ borderTop: '1px solid #000', backgroundColor: '#fff', color: '#000', overflow: 'hidden' }}>
        <motion.a 
          href="/contact" 
          style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '10vh 5%' }}
          whileHover="hover"
        >
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between' }}>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2 
                variants={{ hover: { x: 30 } }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontSize: 'clamp(4rem, 12vw, 14rem)', fontWeight: 800, textTransform: 'uppercase', margin: 0, lineHeight: 0.85, letterSpacing: '-0.03em' }}
              >
                Start A<br/>Project
              </motion.h2>
            </div>
            
            <motion.div 
              variants={{ hover: { x: 30, scale: 1.1 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: isMobile ? '3rem' : 0, paddingRight: isMobile ? 0 : '5%' }}
            >
              {/* Huge thin arrow */}
              <svg width={isMobile ? "80" : "160"} height={isMobile ? "80" : "160"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <polyline points="15 5 22 12 15 19"></polyline>
              </svg>
            </motion.div>
          </div>
        </motion.a>
      </section>
    </div>
  );
};

export default About;
