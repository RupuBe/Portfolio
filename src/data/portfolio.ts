// ─────────────────────────────────────────────────────────────────────────────
// Everything you'd want to edit on the site lives in this file.
// Source of truth: Ruprekha_Behera_Resume.pdf (public/).
//
// Optional links are `null` until a real URL exists. A null link is simply
// hidden (socials) or shown as "Link coming soon" (projects) — never faked.
// ─────────────────────────────────────────────────────────────────────────────

/** Files in /public, resolved against Vite's base path so they work in production. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const site = {
  year: 2026,
  resumeFile: 'Ruprekha_Behera_Resume.pdf',
};

/** "'26" — derived from site.year so there's only one place to change it. */
export const shortYear = `'${String(site.year).slice(-2)}`;

export const profile = {
  name: 'Ruprekha Behera',
  firstName: 'Ruprekha',
  initials: 'RB',
  roles: ['Frontend Developer', 'QA Tester', 'Technical Content Writer'],
  positioning: 'I build, test and communicate digital experiences.',
  positioningAccent: 'communicate',

  /** Hero headline. The `accent` word of each line is set in gold. */
  tagline: [
    { text: 'THINKING DEEPLY.' },
    { text: 'BUILDING THOUGHTFULLY.' },
    { text: 'TESTING THOROUGHLY.', accent: 'THOROUGHLY' },
  ] as { text: string; accent?: string }[],

  intro:
    "Computer Science student with hands-on experience in frontend development, software testing and technical content writing. I enjoy turning ideas into working interfaces, finding what doesn't work, and making complex ideas easier to understand.",

  about: [
    "I'm a Computer Science student who enjoys working where technology, problem-solving and communication meet.",
    "From developing frontend interfaces to testing applications and writing technical content, I've explored different sides of building digital products.",
    "I believe good technology isn't just about making something work. It should also be understandable, reliable and useful.",
  ],

  email: 'ruprekha.be09@gmail.com',
  phone: '+91-9958030799',
  location: 'Noida, Uttar Pradesh',
};

export type SocialLink = { label: string; href: string | null; icon: 'linkedin' | 'github' | 'behance' | 'instagram' };

/** Set `href` to a real URL to show an icon; `null` hides it. */
export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ruprekha-behera-31b8682b6/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/RupuBe', icon: 'github' },
  { label: 'Behance', href: null, icon: 'behance' },
  { label: 'Instagram', href: null, icon: 'instagram' },
];

export const activeSocials = socials.filter((s): s is SocialLink & { href: string } => Boolean(s.href));

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

// ── Proof of work ────────────────────────────────────────────────────────────

export const achievements = [
  { value: '670', suffix: '+', label: 'Article views', detail: 'within two days of publishing' },
  { value: '8', suffix: '+', label: 'Published articles', detail: 'for Freelysta Learn' },
  { value: '10', suffix: '', label: 'Cypress E2E flows', detail: 'automated at DestinPQ' },
  { value: '35', suffix: '', label: 'Original test cases', detail: 'written and executed' },
  { value: '10', suffix: '+', label: 'UI components', detail: 'built for Alligo Healthcare' },
];

// ── Experience ───────────────────────────────────────────────────────────────

export const experience = [
  {
    role: 'QA Tester Intern',
    company: 'DestinPQ',
    mode: 'Remote',
    period: 'Aug 2026 – Present',
    summary: 'Functional and regression testing for a D2C e-commerce platform.',
    points: [
      'Performed functional and regression testing using Cypress.',
      'Executed 35 original test cases, consolidated into 10 core end-to-end flows.',
      'Automated 10 E2E flows covering navigation, product discovery, cart, checkout and API integrations.',
      'Documented test reports with pass/fail status, root-cause notes and reproducible steps.',
      'Flagged defects, missing features or blocked functionality in 7 of 10 flows.',
      'Communicated testing gaps directly to developers.',
    ],
    stack: ['Cypress', 'Regression Testing', 'Bug Reporting'],
  },
  {
    role: 'Frontend Developer',
    company: 'Alligo Healthcare Website',
    mode: 'Freelance',
    period: 'Aug 2026',
    summary: 'Client-facing website and an internal admin panel.',
    points: [
      'Developed 10+ frontend UI components with React, TypeScript, HTML5, CSS3 and Bootstrap.',
      'Built a custom admin panel for inventory and operations management.',
      'Delivered responsive layouts tested across Chrome, Safari, Firefox and Edge.',
      'Translated client requirements into functional web interfaces.',
    ],
    stack: ['React', 'TypeScript', 'Bootstrap', 'Material Design'],
  },
  {
    role: 'Content Writing Intern',
    company: 'Freelysta',
    mode: 'Remote',
    period: 'Jul 2026 – Aug 2026',
    summary: 'Articles for Freelysta Learn, a resource platform for freelancers.',
    points: [
      'Researched, wrote, edited and published 8+ reader-focused articles.',
      'Owned the full content lifecycle: research, outlining, drafting, editing, formatting and publishing.',
      'Authored an article that reached 670+ views within two days of publication.',
      'Turned complex freelancing concepts into clear, actionable guides.',
    ],
    stack: ['Research', 'Editing', 'Long-form Writing'],
  },
];

// ── Selected writing ─────────────────────────────────────────────────────────

export type Tone = 'blue' | 'tan' | 'green' | 'red' | 'sky';

/** Set `url` to null to show a non-clickable "Link coming soon" card. */
export const articles: {
  title: string;
  summary: string;
  category: string;
  url: string | null;
  tone: Tone;
  highlight?: string;
}[] = [
  {
    title: 'Your Portfolio Gets You Noticed, Your Communication Gets You Hired',
    summary: 'Why clear communication and trust, not skills alone, win freelance clients and repeat work.',
    category: 'Freelysta Learn / Article',
    url: 'https://learn.freelysta.com/drops/your-portfolio-gets-you-noticed-your-communication-gets-you-hired',
    tone: 'blue',
  },
  {
    title: 'Before Clients Reject Beginners, Beginners Reject Themselves',
    summary: 'Clients hesitate over uncertainty more than inexperience, and confidence is what earns trust.',
    category: 'Freelysta Learn / Article',
    url: 'https://learn.freelysta.com/drops/before-clients-reject-beginners-beginners-reject-themselves',
    tone: 'tan',
  },
  {
    title: "The Myth That's Quietly Holding You Back",
    summary: 'Unpacking the freelancing myths that breed fear, and why perfection is the wrong goal.',
    category: 'Freelysta Learn / Article',
    url: 'https://learn.freelysta.com/drops/the-myth-thats-quietly-holding-you-back',
    tone: 'green',
  },
  {
    title: 'The Portfolio That Gets You Your First Client',
    summary: 'Understanding the work you show matters more than a pile of certificates.',
    category: 'Freelysta Learn / Article',
    url: 'https://learn.freelysta.com/drops/portfolio-that-gets-you-your-first-client',
    tone: 'red',
  },
  {
    title: 'The Pricing Mistake Almost Every Beginner Makes',
    summary: 'Why new freelancers undercut themselves after feedback, even when their work hasn’t lost value.',
    category: 'Freelysta Learn / Article',
    url: 'https://learn.freelysta.com/drops/the-pricing-mistake-almost-every-beginner-makes',
    tone: 'sky',
    highlight: '670+ views in 2 days',
  },
];

// ── Technical projects ───────────────────────────────────────────────────────

/** Add more entries to show more projects. `url` / `repo` are optional. */
export const technicalProjects: {
  name: string;
  subtitle: string;
  type: string;
  stack: string[];
  points: string[];
  url: string | null;
  repo: string | null;
}[] = [
  {
    name: 'RouteAura',
    subtitle: 'Travel & Tour Management System',
    type: 'Academic Project · Team of 4',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'TanStack Query', 'React Context', 'Zod', 'Vitest'],
    points: [
      'Co-developed a travel and tour management platform.',
      'Implemented a responsive frontend architecture built on reusable components.',
      'Worked on client and administrator workflows for package discovery, booking, route management and administration.',
      'Collaborated with a four-member team through GitHub.',
    ],
    url: null,
    repo: null,
  },
];

// ── Skills ───────────────────────────────────────────────────────────────────

export const skills = [
  {
    group: 'Frontend Development',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'jQuery', 'Bootstrap', 'Material Design', 'Responsive Web Design'],
  },
  {
    group: 'Testing & QA',
    items: ['Manual Testing', 'Test Case Design', 'Test Case Execution', 'Cypress Automation', 'Regression Testing', 'Bug Reporting', 'Unit Testing'],
  },
  {
    group: 'Programming',
    items: ['JavaScript', 'Java', 'Python', 'C', 'SQL'],
  },
  {
    group: 'Tools',
    items: ['Cypress', 'VS Code', 'GitHub', 'Claude Code', 'MS Word', 'Canva'],
  },
];

// ── Education & certifications ───────────────────────────────────────────────

export const degree = {
  title: 'B.Tech, Computer Science & Engineering',
  specialization: 'Cybersecurity',
  institution: 'IILM University, Greater Noida',
  period: '2023 – 2027',
  score: 'CGPA 9.00 / 10',
};

export const education = [
  { title: `${degree.title} (${degree.specialization})`, institution: degree.institution, period: degree.period, score: degree.score },
  { title: 'Class XII', institution: 'B.D. Saraswati Vidya Mandir, Noida', period: '2022 – 2023', score: '81.5%' },
  { title: 'Class X', institution: 'Mahamaya Balika Inter College, Noida', period: '2020 – 2021', score: '92%' },
];

export const certifications = [
  { title: 'Fundamentals of Information Security', issuer: 'Infosys', date: 'May 2025' },
  { title: 'Fundamentals of Database and SQL', issuer: 'Infosys', date: 'November 2024' },
  { title: 'Python Fundamentals', issuer: 'Infosys', date: 'May 2024' },
];

// ── FAQ ──────────────────────────────────────────────────────────────────────
// Short, factual answers. Shown on the page (FAQ section) and published as
// FAQPage structured data + llms.txt, which is what search and AI answer
// engines (Google, ChatGPT, Perplexity, Claude) quote from. Keep them true.

const [currentRole] = experience;
const listOf = (items: string[]) => `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

export const faqs: { q: string; a: string }[] = [
  {
    q: `Who is ${profile.name}?`,
    a: `${profile.name} is a ${degree.title} (${degree.specialization}) student at ${degree.institution}, based in ${profile.location}, India. ${profile.firstName} works across frontend development, software QA testing and technical content writing.`,
  },
  {
    q: `What does ${profile.firstName} specialise in?`,
    a: `Three things: building frontend interfaces with React, TypeScript, HTML5, CSS3 and Bootstrap; testing software with manual test cases and Cypress end-to-end automation; and writing clear technical and career content.`,
  },
  {
    q: `What QA testing experience does ${profile.firstName} have?`,
    a: `As ${currentRole.role} at ${currentRole.company} (${currentRole.period}), ${profile.firstName} wrote and executed 35 original test cases for a D2C e-commerce platform, automated 10 end-to-end flows in Cypress covering navigation, product discovery, cart, checkout and API integrations, and flagged defects in 7 of those 10 flows.`,
  },
  {
    q: `What frontend projects has ${profile.firstName} built?`,
    a: `${profile.firstName} built 10+ React and TypeScript UI components and a custom inventory admin panel for the Alligo Healthcare website as a freelancer, and co-developed ${technicalProjects.map((p) => `${p.name}, a ${p.subtitle.toLowerCase()}`).join('; ')}, in a team of four.`,
  },
  {
    q: `What has ${profile.firstName} written?`,
    a: `${profile.firstName} has published 8+ articles for Freelysta Learn on freelancing, portfolios, pricing and client communication. "${articles.find((a) => a.highlight)?.title ?? articles[0].title}" reached 670+ views within two days.`,
  },
  {
    q: `What tools and languages does ${profile.firstName} use?`,
    a: `Languages: ${listOf(skills.find((s) => s.group === 'Programming')?.items ?? [])}. Tools: ${listOf(skills.find((s) => s.group === 'Tools')?.items ?? [])}.`,
  },
  {
    q: `How can I contact ${profile.name}?`,
    a: `Email ${profile.email} or connect on LinkedIn. ${profile.firstName} is open to roles and projects in frontend development, QA testing and technical writing.`,
  },
];
