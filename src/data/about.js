import { parseFrontmatter } from '../utils/frontmatter';
import raw from '../content/about.md?raw';

const { data } = parseFrontmatter(raw);

const about = {
  heroTitle: data.heroTitle || 'DAD Architects',
  heroSubtitle: data.heroSubtitle || 'Space, Light & Material.',
  studioParagraph: data.studioParagraph || '',
  studioImage: data.studioImage || '',
  groupPhoto: data.groupPhoto || '',
};

export default about;
