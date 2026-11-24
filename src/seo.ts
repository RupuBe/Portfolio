// Build-time only (imported by entry-server.tsx, never shipped to the browser).
// Everything search engines and AI answer engines read about the site is
// generated here from src/data/portfolio.ts, so it can't drift from the page.

import {
  articles,
  activeSocials,
  certifications,
  degree,
  education,
  experience,
  faqs,
  profile,
  site,
  skills,
  technicalProjects,
} from './data/portfolio';

export const seoTitle = `${profile.name} | Frontend Developer & QA Tester`;
export const seoDescription = `${profile.name} — ${degree.title} (${degree.specialization}) student at ${degree.institution.split(',')[0]}. Frontend developer (React, TypeScript), QA tester (Cypress) and technical content writer in ${profile.location.split(',')[0]}, India.`;

const [givenName, ...rest] = profile.name.split(' ');
const familyName = rest.join(' ');
const unique = (xs: string[]) => [...new Set(xs)];

/** schema.org graph: WebSite + ProfilePage + Person + Articles + FAQPage. */
export function jsonLd(base: string, today: string) {
  const url = `${base}/`;
  const id = (frag: string) => `${url}#${frag}`;
  const current = experience.find((e) => /present/i.test(e.period));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': id('website'),
        url,
        name: `${profile.name} — Portfolio`,
        inLanguage: 'en',
        publisher: { '@id': id('person') },
      },
      {
        '@type': 'ProfilePage',
        '@id': id('profilepage'),
        url,
        name: seoTitle,
        description: seoDescription,
        inLanguage: 'en',
        isPartOf: { '@id': id('website') },
        mainEntity: { '@id': id('person') },
        dateModified: today,
      },
      {
        '@type': 'Person',
        '@id': id('person'),
        name: profile.name,
        givenName,
        familyName,
        url,
        image: `${base}/portrait-photo.jpg`,
        email: `mailto:${profile.email}`,
        jobTitle: profile.roles.join(', '),
        description: profile.intro,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Noida',
          addressRegion: 'Uttar Pradesh',
          addressCountry: 'IN',
        },
        ...(current && { worksFor: { '@type': 'Organization', name: current.company } }),
        affiliation: { '@type': 'CollegeOrUniversity', name: 'IILM University', address: 'Greater Noida, Uttar Pradesh, India' },
        alumniOf: education
          .filter((e) => !e.title.startsWith('B.Tech'))
          .map((e) => ({ '@type': 'EducationalOrganization', name: e.institution.split(',')[0] })),
        hasOccupation: profile.roles.map((name) => ({ '@type': 'Occupation', name })),
        knowsAbout: unique(skills.flatMap((s) => s.items).concat(degree.specialization, 'Software Testing', 'Technical Writing')),
        hasCredential: certifications.map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          name: c.title,
          credentialCategory: 'certificate',
          recognizedBy: { '@type': 'Organization', name: c.issuer },
        })),
        sameAs: activeSocials.map((s) => s.href),
      },
      ...articles
        .filter((a) => a.url)
        .map((a) => ({
          '@type': 'Article',
          headline: a.title,
          description: a.summary,
          url: a.url,
          author: { '@id': id('person') },
          publisher: { '@type': 'Organization', name: 'Freelysta' },
        })),
      {
        '@type': 'FAQPage',
        '@id': id('faq'),
        url: id('faq'),
        isPartOf: { '@id': id('website') },
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

/** /llms.txt — a plain-Markdown brief for AI assistants (llmstxt.org). */
export function llmsTxt(base: string) {
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.roles.join(' · ')}. ${degree.title} (${degree.specialization}) student at ${degree.institution}, ${degree.score}. Based in ${profile.location}, India. ${profile.positioning}`,
    '',
    profile.intro,
    '',
    '## Contact',
    '',
    `- Portfolio: ${base}/`,
    `- Email: ${profile.email}`,
    ...activeSocials.map((s) => `- ${s.label}: ${s.href}`),
    `- Résumé (PDF): ${base}/${site.resumeFile}`,
    '',
    '## Experience',
    '',
    ...experience.flatMap((e) => [
      `### ${e.role} — ${e.company} (${e.mode}, ${e.period})`,
      '',
      ...e.points.map((p) => `- ${p}`),
      '',
    ]),
    '## Projects',
    '',
    ...technicalProjects.flatMap((p) => [
      `### ${p.name} — ${p.subtitle} (${p.type})`,
      '',
      `Stack: ${p.stack.join(', ')}`,
      '',
      ...p.points.map((pt) => `- ${pt}`),
      '',
    ]),
    '## Published writing',
    '',
    ...articles.map((a) => `- [${a.title}](${a.url ?? `${base}/`}): ${a.summary}`),
    '',
    '## Skills',
    '',
    ...skills.map((s) => `- ${s.group}: ${s.items.join(', ')}`),
    '',
    '## Education',
    '',
    ...education.map((e) => `- ${e.title}, ${e.institution} (${e.period}) — ${e.score}`),
    '',
    '## Certifications',
    '',
    ...certifications.map((c) => `- ${c.title} — ${c.issuer}, ${c.date}`),
    '',
    '## FAQ',
    '',
    ...faqs.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
  ];
  return lines.join('\n');
}

export function sitemapXml(base: string, today: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`;
}

/** Everyone — search engines and AI crawlers alike — is welcome. */
export function robotsTxt(base: string) {
  return `User-agent: *
Allow: /
${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`;
}
