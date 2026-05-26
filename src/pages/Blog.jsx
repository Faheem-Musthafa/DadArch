import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SEO from '../components/SEO';
import useIsMobile from '../hooks/useIsMobile';
import posts from '../data/posts';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

const MotionLink = motion.create(Link);

const Blog = () => {
  const isMobile = useIsMobile(768);
  const rootRef = useRef(null);

  useGSAP(() => {
    const heroHeading = gsap.utils.toArray('.blog-hero h1');
    const heroSection = gsap.utils.toArray('.blog-hero');
    if (!isMobile && heroHeading.length > 0 && heroSection.length > 0) {
      gsap.fromTo(
        heroHeading,
        { letterSpacing: '-0.04em', opacity: 0.6 },
        {
          letterSpacing: '0em',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }

    const cards = gsap.utils.toArray('.blog-card');
    if (cards.length > 0) {
      gsap.set(cards, { opacity: 0, y: 30 });
      ScrollTrigger.batch(cards, {
        start: 'top bottom-=80',
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', overwrite: 'auto' }),
      });
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, { scope: rootRef, dependencies: [isMobile] });

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', overflowX: 'hidden' }}
    >
      <SEO
        title="Journal — DAD Architects"
        description="Notes on architecture, climate-responsive design, and the practice of building in Kerala."
        url="/blog"
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '38vh 5% 10vh' : '25vh 5% 15vh' }}>
        <section className="blog-hero" style={{ marginBottom: isMobile ? '10vh' : '15vh' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '2rem' }}>
            Journal
          </span>
          <h1 style={{
            fontSize: 'clamp(3rem, 9vw, 8rem)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: 0,
            textTransform: 'uppercase',
          }}>
            Notes from<br />
            <span style={{ fontWeight: 700 }}>the Studio.</span>
          </h1>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
          {posts.map((post) => (
            <MotionLink
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="blog-card"
              whileHover="hover"
              initial="rest"
              animate="rest"
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '180px 1fr 220px',
                gap: isMobile ? '1.5rem' : '4rem',
                padding: isMobile ? '3rem 0' : '4rem 0',
                borderBottom: '1px solid var(--border)',
                alignItems: 'start',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
                  {formatDate(post.date)}
                </span>
                <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {post.tags.map((t) => (
                    <span key={t} style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '0.25rem 0.6rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 style={{
                  fontSize: isMobile ? 'clamp(1.6rem, 5vw, 2.2rem)' : 'clamp(1.8rem, 3.5vw, 3rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  textTransform: 'uppercase',
                  margin: 0,
                }}>
                  {post.title}
                </h2>
                <p style={{ marginTop: '1.5rem', fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: '50ch' }}>
                  {post.excerpt}
                </p>
              </div>

              <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
                  {post.readTime}
                </span>
                <motion.div
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 10 }
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ marginTop: '1rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  Read →
                </motion.div>
              </div>
            </MotionLink>
          ))}
        </section>
      </div>
    </motion.div>
  );
};

export default Blog;
