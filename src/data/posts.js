import { parseFrontmatter } from '../utils/frontmatter';

const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });

const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const fallbackSlug = path.split('/').pop().replace(/\.md$/, '');
    return {
      slug: data.slug || fallbackSlug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      date: data.date || '',
      author: data.author || 'DAD Studio',
      readTime: data.readTime || '',
      cover: data.cover || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      body: content.trim(),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export default posts;
