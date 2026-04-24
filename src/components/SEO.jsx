import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  url,
  type = 'website',
  image = 'http://dadarchitects.com/wp-content/uploads/2021/06/dad2.jpeg',
  schema,
}) => {
  const fullTitle = title ? `${title} | DAD Architects` : 'DAD Architects | Architecture & Design in Kerala';
  const fullDesc = description || 'The urge to deliver design solutions which enhances the quality of life of our clients and society. Based in Calicut and Manjeri, Kerala.';
  const canonicalUrl = `https://dadarchitects.com${url || '/'}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={image} />

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
