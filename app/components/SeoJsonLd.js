import { siteUrl, siteName, siteDescription } from '../../lib/site.js';

const sameAs = [
  'https://www.linkedin.com/in/ramonanjos',
  'https://www.instagram.com/ramonanjos/',
  'https://savee.it/ramonanjos/',
  'https://open.spotify.com/user/ramonanjos',
];

export default function SeoJsonLd() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        description: siteDescription,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: siteName,
        description: siteDescription,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: siteName,
        url: siteUrl,
        jobTitle: 'Product Designer',
        description: siteDescription,
        sameAs,
        worksFor: {
          '@type': 'Organization',
          name: 'Nubank',
          url: 'https://nubank.com.br',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
