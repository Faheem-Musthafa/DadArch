import { Helmet } from 'react-helmet-async';

const defaultSchema = {
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
  sameAs: [
    'https://www.instagram.com/thedadarchitects/',
    'https://www.linkedin.com/company/dadarchitechts',
    'https://www.facebook.com/dadarchitectsofficial/'
  ]
};

const SEO = ({
  title,
  description,
  url,
  type = 'website',
  image = 'http://dadarchitects.com/wp-content/uploads/2021/06/dad2.jpeg',
  schema,
}) => {
  const fullTitle = title ? `${title} | DAD Architects` : 'DAD Architects | Architecture & Design in Kerala';
  const fullDesc = description || 'A premium architecture and design studio based in Calicut and Manjeri, Kerala. Specializing in architecture, interior design, master planning, and landscaping.';
  const canonicalUrl = `https://dadarchitects.com${url || ''}`;

  // Use passed schema if provided, otherwise default to organization schema
  const jsonLdData = schema || defaultSchema;

  return (
    <Helmet>
      {/* Standard HTML Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="author" content="DAD Architects" />
      
      {/* Search Engine & AEO Guidelines */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="DAD Architects" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:domain" content="dadarchitects.com" />
      <meta name="twitter:url" content={canonicalUrl} />

      {/* Structured Data / JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
    </Helmet>
  );
};

export default SEO;
