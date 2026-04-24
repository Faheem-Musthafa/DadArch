import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import TypographyHero from '../components/TypographyHero';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ArchitectureFirm',
  name: 'DAD Architects',
  image: 'http://dadarchitects.com/wp-content/uploads/2021/06/dad2.jpeg',
  description: 'The urge to deliver design solutions which enhances the quality of life of our clients and society.',
  url: 'https://dadarchitects.com',
  telephone: '+919995881828',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Door No: 1720, 7th Floor, HiLite Business Park, Phase 1',
      addressLocality: 'Calicut',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Door No: 3/101, City Point Mall',
      addressLocality: 'Manjeri',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
  ],
};

const Home = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
  >
    <SEO url="/" schema={schema} />
    <TypographyHero />
  </motion.div>
);

export default Home;
