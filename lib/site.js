/** URLs e copy base para SEO — usar também NEXT_PUBLIC_SITE_URL em produção. */
function normalizeBase(url) {
  return (url || 'https://www.ramonanjos.com').replace(/\/$/, '');
}

export const siteUrl = normalizeBase(
  typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SITE_URL : undefined
);

export const siteName = 'Ramon Anjos';

export const siteTagline = 'Ramon Anjos — Product and Design Language System';

export const siteDescription =
  'Ramon Anjos — Product and Design Language System. 15+ years of experience on UX and craft.';
