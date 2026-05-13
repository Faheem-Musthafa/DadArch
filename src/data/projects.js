import { parseFrontmatter } from '../utils/frontmatter';

const modules = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default', eager: true });

const projects = Object.values(modules)
  .map((raw) => {
    const { data, content } = parseFrontmatter(raw);
    return {
      id: String(data.id || ''),
      title: data.title || '',
      subtitle: data.subtitle || '',
      img: data.img || '',
      desc: content.trim(),
      details: {
        area: data.area || '',
        year: String(data.year || ''),
        role: data.role || '',
      },
      gallery: Array.isArray(data.gallery)
        ? data.gallery.map((g) => (typeof g === 'string' ? g : g?.image || '')).filter(Boolean)
        : [],
      order: Number(data.order) || 0,
    };
  })
  .sort((a, b) => a.order - b.order);

export default projects;
