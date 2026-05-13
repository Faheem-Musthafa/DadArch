import { parseFrontmatter } from '../utils/frontmatter';

const modules = import.meta.glob('../content/founders/*.md', { query: '?raw', import: 'default', eager: true });

const founders = Object.values(modules)
  .map((raw) => parseFrontmatter(raw).data)
  .map((d) => ({
    name: d.name || '',
    role: d.role || '',
    image: d.image || '',
    order: Number(d.order) || 0,
  }))
  .sort((a, b) => a.order - b.order);

export default founders;
