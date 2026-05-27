import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SEO from '../components/SEO';
import useIsMobile from '../hooks/useIsMobile';
import posts from '../data/posts';
import founders from '../data/founders';
import about from '../data/about';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const rootRef = useRef(null);

  useGSAP(() => {
    if (isMobile) return;

    const heroHeading = gsap.utils.toArray('.about-hero h1');
    const heroSection = gsap.utils.toArray('.about-hero');
    if (heroHeading.length > 0 && heroSection.length > 0) {
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

    gsap.utils.toArray('.about-reveal').forEach((el) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: rootRef, dependencies: [isMobile] });

  return (
    <div ref={rootRef} style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      <SEO
        title="About — DAD Architects"
        description="A premium architecture and design studio based in Calicut and Manjeri."
        url="/about"
      />

      <div style={{ maxWidth: '1600px', margin: isMobile ? '0 auto' : '0', padding: '0 5%' }}>

        {/* HERO SECTION */}
        <section className="about-hero" style={{ height: '85vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '10vh' }}>
          <FadeIn>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              fontWeight: 300,
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              margin: 0,
              textTransform: 'uppercase'
            }}>
              {about.heroTitle}<br />
              <span style={{ fontWeight: 600 }}>{about.heroSubtitle}</span>
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
                  fontSize: 'clamp(1.5rem, 1vw, 2.5rem)',
                  fontWeight: 400,
                  lineHeight: 1.3,
                  margin: '0 0 4rem 0',
                  letterSpacing: '-0.01em'
                }}>
                  {about.studioParagraph}
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div style={{ width: '100%', overflow: 'hidden' }}>
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={about.studioImage}
                    alt="Studio Interior"
                    style={{ width: '100%', aspectRatio: isMobile ? '4/3' : '16/9', objectFit: 'cover', filter: 'grayscale(100%)' }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* LEADERSHIP / FOUNDERS */}
        <section style={{ paddingBottom: '15vh' }}>
          <LineReveal />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ gridColumn: isMobile ? '1' : '1 / 4' }}>
              <FadeIn>
                <span style={{ fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                  Founders
                </span>
              </FadeIn>
            </div>

            <div style={{ gridColumn: isMobile ? '1' : '5 / 13' }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '2rem' }}>
                {founders.map((f, i) => (
                  <FadeIn key={`${f.order}-${f.name || i}`} delay={0.1 * (i + 1)}>
                    <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
                      <motion.img
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        src={f.image}
                        alt={f.name}
                        style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', filter: 'grayscale(100%)' }}
                      />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 500, margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>{f.name}</h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{f.role}</p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* JOURNAL PREVIEW */}


        {/* TEAM GROUP PHOTO */}
        <section style={{ paddingBottom: '15vh' }}>
          <LineReveal />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ gridColumn: isMobile ? '1' : '1 / 4' }}>
              <FadeIn>
                <span style={{ fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                  Our Team
                </span>
              </FadeIn>
            </div>

            <div style={{ gridColumn: isMobile ? '1' : '5 / 13' }}>
              <FadeIn delay={0.1}>
                <div style={{ width: '100%', overflow: 'hidden' }}>
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={about.groupPhoto}
                    alt="Team group photo"
                    style={{ width: '100%', aspectRatio: isMobile ? '4/3' : '21/9', objectFit: 'cover', filter: 'grayscale(100%)' }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: '15vh' }}>
          <LineReveal />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ gridColumn: isMobile ? '1' : '1 / 4' }}>
              <FadeIn>
                <span style={{ fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                  From the Journal
                </span>
              </FadeIn>
            </div>

            <div style={{ gridColumn: isMobile ? '1' : '5 / 13' }}>
              <FadeIn delay={0.1}>
                <p style={{ fontSize: 'clamp(1.1rem, 1.4vw, 1.4rem)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: '0 0 3rem 0', maxWidth: '52ch' }}>
                  Field notes, material studies, and observations on the practice of building in Kerala.
                </p>
              </FadeIn>

              <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
                {posts.slice(0, 3).map((post, idx) => (
                  <FadeIn key={post.slug} delay={0.15 + idx * 0.08}>
                    <Link
                      to={`/blog/${post.slug}`}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '120px 1fr auto',
                        gap: isMobile ? '0.75rem' : '3rem',
                        padding: '2rem 0',
                        borderBottom: '1px solid var(--border)',
                        textDecoration: 'none',
                        color: 'inherit',
                        alignItems: 'baseline',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                        {new Date(post.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()}
                      </span>
                      <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 600, margin: 0, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
                        {post.title}
                      </h3>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                        Read →
                      </span>
                    </Link>
                  </FadeIn>
                ))}
              </div>

              <FadeIn delay={0.4}>
                <Link
                  to="/blog"
                  style={{
                    display: 'inline-block',
                    marginTop: '3rem',
                    padding: '1rem 1.5rem',
                    border: '1px solid var(--text-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  All Entries →
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

      </div>
      <section style={{ borderTop: '1px solid #000', backgroundColor: '#fff', color: '#000', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1600px', margin: isMobile ? '0 auto' : '0', padding: '0 5%' }}>
          <motion.a
            href="/contact"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '10vh 0' }}
            whileHover="hover"
          >
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between' }}>
            <motion.h2
              variants={{ hover: { x: 30 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: 'clamp(4rem, 12vw, 14rem)', fontWeight: 800, textTransform: 'uppercase', margin: 0, lineHeight: 0.85, letterSpacing: '-0.03em' }}
            >
              Start A<br />Project
            </motion.h2>

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
        </div>
      </section>
    </div>
  );
};

export default About;
