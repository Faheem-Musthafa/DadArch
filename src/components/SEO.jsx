import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://dadarchitects.com';
const DEFAULT_IMAGE = `${SITE_URL}/hero_architecture.png`;

const calicut = {
  '@type': 'ArchitectureFirm',
  '@id': `${SITE_URL}/#calicut`,
  name: 'DAD Architects — Calicut',
  image: DEFAULT_IMAGE,
  url: SITE_URL,
  telephone: '+919995881828',
  priceRange: '$$$',
  areaServed: 'Kerala, India',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Door No: 1720, 7th Floor, HiLite Business Park, Phase 1',
    addressLocality: 'Calicut',
    addressRegion: 'Kerala',
    postalCode: '673014',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/thedadarchitects/',
    'https://www.linkedin.com/company/dadarchitechts',
    'https://www.facebook.com/dadarchitectsofficial/',
  ],
};

const manjeri = {
  '@type': 'ArchitectureFirm',
  '@id': `${SITE_URL}/#manjeri`,
  name: 'DAD Architects — Manjeri',
  image: DEFAULT_IMAGE,
  url: SITE_URL,
  telephone: '+919995881828',
  priceRange: '$$$',
  areaServed: 'Kerala, India',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Door No: 3/101, City Point Mall',
    addressLocality: 'Manjeri',
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/thedadarchitects/',
    'https://www.linkedin.com/company/dadarchitechts',
    'https://www.facebook.com/dadarchitectsofficial/',
  ],
};

const defaultSchema = {
  '@context': 'https://schema.org',
  '@graph': [calicut, manjeri],
};

const SEO = ({
  title,
  description,
  url,
  type = 'website',
  image = DEFAULT_IMAGE,
  schema,
}) => {
  const fullTitle = title ? `${title} | DAD Architects` : 'DAD Architects | Architecture & Design in Kerala';
  const fullDesc = description || 'A premium architecture and design studio based in Calicut and Manjeri, Kerala. Specializing in architecture, interior design, master planning, and landscaping.';
  const canonicalUrl = `${SITE_URL}${url || ''}`;

  const jsonLdData = schema || defaultSchema;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="author" content="DAD Architects" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="theme-color" content="#ffffff" />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="DAD Architects" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="DAD Architects" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="DAD Architects" />
      <meta name="twitter:domain" content="dadarchitects.com" />
      <meta name="twitter:url" content={canonicalUrl} />

      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
    </Helmet>
  );
};

export default SEO;
