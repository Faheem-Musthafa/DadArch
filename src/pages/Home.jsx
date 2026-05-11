import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import TypographyHero from '../components/TypographyHero';

const Home = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
  >
    <SEO url="/" />
    <TypographyHero />
  </motion.div>
);

export default Home;
