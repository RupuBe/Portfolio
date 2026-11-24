import { Mail } from 'lucide-react';
import type { SocialLink } from '../data/portfolio';

type P = { className?: string };

// Brand marks aren't shipped by lucide v1, so these are drawn inline.
export function LinkedInIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v5.43h-4v-4.82c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.9h-4v-11Z" />
    </svg>
  );
}

export function GitHubIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function BehanceIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8.2 11.3c.9-.4 1.5-1.2 1.5-2.4C9.7 6.6 8 6 6 6H1v12h5.2c2 0 3.9-1 3.9-3.3 0-1.4-.7-2.5-1.9-2.9ZM3.4 8h2.2c.8 0 1.6.2 1.6 1.2 0 .9-.6 1.2-1.4 1.2H3.4V8Zm2.4 8H3.4v-3.3h2.4c1 0 1.7.4 1.7 1.6 0 1.3-.8 1.7-1.7 1.7ZM16.9 9.4c-2.6 0-4.4 2-4.4 4.6 0 2.7 1.7 4.6 4.4 4.6 2 0 3.4-.9 4-2.9h-2c-.2.7-1.1 1.1-1.9 1.1-1.5 0-2.3-.9-2.3-2.4h6.4c.1-3-1.6-5-4.2-5Zm-2.2 3.7c.1-1.2.9-2 2.1-2 1.2 0 1.8.7 1.9 2h-4ZM14.5 6.9h4.8v1.2h-4.8z" />
    </svg>
  );
}

function InstagramIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function SocialIcon({ icon, className }: { icon: SocialLink['icon'] | 'mail'; className?: string }) {
  switch (icon) {
    case 'linkedin': return <LinkedInIcon className={className} />;
    case 'github': return <GitHubIcon className={className} />;
    case 'behance': return <BehanceIcon className={className} />;
    case 'instagram': return <InstagramIcon className={className} />;
    case 'mail': return <Mail className={className} strokeWidth={1.8} aria-hidden="true" />;
  }
}
