import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import useIsMobile from '../hooks/useIsMobile';

const projects = [
  { id: '01', title: 'NIYAS & FAMILY', subtitle: 'MOODADI, CALICUT — AWARD WINNING', img: '/project/dad11.jpeg' },
  { id: '02', title: 'IM HOUSE', subtitle: 'CALICUT — MODERN RESIDENTIAL', img: '/project/dad2.jpeg' },
  { id: '03', title: 'ANAS & FAMILY', subtitle: 'MANJERI — CONTEMPORARY HOME', img: '/project/dad4.jpeg' },
  { id: '04', title: 'SATHAR & FAMILY', subtitle: 'KOYLANDI — FAMILY CENTRIC', img: '/project/dad4.jpeg' }, // Reusing for demo if needed
  { id: '05', title: 'MAFI HOUSE', subtitle: 'PERINGATHUR — SIGNATURE DESIGN', img: '/project/dad12.jpeg' },
  { id: '06', title: 'ASHRAF RESIDENCE', subtitle: 'CALICUT — URBAN NARRATIVE', img: '/project/dad11.jpeg' },
];

const Work = () => {
  const isMobile = useIsMobile(768);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      style={{ 
        backgroundColor: '#ffffff', 
        color: '#000', 
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        padding: isMobile ? '12vh 6% 10vh' : '20vh 10% 15vh',
      }}
    >
      <SEO
        title="Works — DAD Architects"
        description="Selected architecture and interior design projects by DAD Architects."
        url="/work"
      />
      
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '15vh' }}>
          <motion.span 
            variants={item}
            style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.3, display: 'block', marginBottom: '2rem' }}
          >
            Portfolio
          </motion.span>
          <motion.h1 
            variants={item}
            style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 8rem)', 
              fontWeight: 800, 
              lineHeight: 0.9, 
              letterSpacing: '-0.05em',
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            Selected <br />Works
          </motion.h1>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
          gap: isMobile ? '6rem' : '10rem 5vw',
        }}>
          {projects.map((p, i) => (
            <motion.div 
              key={p.id}
              variants={item}
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              whileHover="hover"
            >
              <div style={{ 
                width: '100%', 
                aspectRatio: isMobile ? '4/3' : (i % 3 === 0 ? '16/9' : '4/5'), 
                overflow: 'hidden',
                backgroundColor: '#f5f5f5',
                marginBottom: '2.5rem',
                position: 'relative'
              }}>
                <motion.img
                  variants={{
                    hover: { scale: 1.05 }
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={p.img}
                  alt={p.title}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(100%) contrast(1.1)',
                    mixBlendMode: 'multiply'
                  }}
                />
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '0.7rem', fontWeight: 800, opacity: 0.2 }}>
                  {p.id}
                </div>
              </div>

              <div style={{ paddingRight: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 800, 
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: '0 0 0.5rem 0'
                }}>
                  {p.title}
                </h2>
                <span style={{ 
                  fontSize: '0.75rem', 
                  letterSpacing: '0.1em', 
                  textTransform: 'uppercase',
                  color: '#999',
                  fontWeight: 700
                }}>
                  {p.subtitle}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
