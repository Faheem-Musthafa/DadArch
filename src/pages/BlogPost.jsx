import { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SEO from '../components/SEO';
import useIsMobile from '../hooks/useIsMobile';
import posts from '../data/posts';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

const BlogPost = () => {
  const { slug } = useParams();
  const isMobile = useIsMobile(768);
  const rootRef = useRef(null);
  const post = posts.find((p) => p.slug === slug);

  useGSAP(() => {
    if (!post) return;

    gsap.from('.post-header > *', {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out'
    });

    gsap.from('.post-image', {
      scale: 1.05,
      opacity: 0,
      duration: 1.5,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.utils.toArray('.post-body p').forEach((p) => {
      gsap.from(p, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: p,
          start: 'top 85%',
        }
      });
    });
  }, { scope: rootRef, dependencies: [post] });

  if (!post) return <Navigate to="/blog" replace />;

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
        title={`${post.title} — Journal`}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        type="article"
        image={`https://dadarchitects.com${post.cover}`}
      />

      <article style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '18vh 5% 15vh' : '22vh 5% 18vh' }}>
        <header className="post-header" style={{ marginBottom: isMobile ? '6vh' : '10vh' }}>
          <Link
            to="/blog"
            style={{
              display: 'inline-block',
              marginBottom: '3rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              textDecoration: 'none'
            }}
          >
            ← Back to Journal
          </Link>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {post.tags.map((t) => (
              <span key={t} style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '0.25rem 0.6rem' }}>
                {t}
              </span>
            ))}
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: 0,
            textTransform: 'uppercase',
          }}>
            {post.title}
          </h1>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            <span>{post.author}</span>
            <span>{formatDate(post.date)}</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="post-image" style={{ width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', marginBottom: isMobile ? '6vh' : '10vh', border: '1px solid var(--border)' }}>
          <img src={post.cover} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        </div>

        <div className="post-body" style={{ maxWidth: '60ch' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: (props) => (
                <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', lineHeight: 1.7, color: 'var(--text-primary)', margin: '0 0 2rem 0' }} {...props} />
              ),
              h2: (props) => (
                <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 600, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }} {...props} />
              ),
              h3: (props) => (
                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '3rem 0 1rem 0' }} {...props} />
              ),
              blockquote: (props) => (
                <blockquote style={{ borderLeft: '2px solid var(--text-primary)', paddingLeft: '1.5rem', margin: '3rem 0', fontStyle: 'italic', color: 'var(--text-secondary)' }} {...props} />
              ),
              ul: (props) => <ul style={{ margin: '0 0 2rem 1.5rem', lineHeight: 1.7, color: 'var(--text-primary)' }} {...props} />,
              ol: (props) => <ol style={{ margin: '0 0 2rem 1.5rem', lineHeight: 1.7, color: 'var(--text-primary)' }} {...props} />,
              code: ({ inline, ...props }) =>
                inline ? (
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95em', background: 'var(--bg-secondary)', padding: '0.1rem 0.4rem', border: '1px solid var(--border)' }} {...props} />
                ) : (
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', display: 'block', background: 'var(--bg-secondary)', padding: '1.5rem', border: '1px solid var(--border)', overflowX: 'auto', margin: '0 0 2rem 0' }} {...props} />
                ),
              a: (props) => (
                <a style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '0.2em' }} {...props} />
              ),
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </article>
    </motion.div>
  );
};

export default BlogPost;
