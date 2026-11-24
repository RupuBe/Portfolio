import { motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight, MapPin } from 'lucide-react';
import { activeSocials, profile, site } from '../data/portfolio';
import { reveal } from '../lib/motion';
import { SocialIcon } from '../components/Icons';

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-ink text-cream px-gutter pt-16 md:pt-20 pb-10">
      <div className="flex items-center gap-4 mb-8 md:mb-10">
        <span className="text-[0.62rem] tracking-[0.28em] uppercase font-medium text-cream/45">(08) — Contact</span>
        <span className="h-px flex-1 bg-cream/15" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8 min-w-0">
          <motion.p {...reveal(0)} className="font-display text-[clamp(2.4rem,7vw,6rem)] leading-[0.9] tracking-tight">
            Have a role or project in mind? <span className="text-warm">Let&apos;s talk.</span>
          </motion.p>
          <motion.a
            {...reveal(0.08)}
            href={`mailto:${profile.email}`}
            className="group mt-6 py-2 inline-flex items-center gap-3 max-w-full font-display text-[clamp(1.45rem,5.2vw,4rem)] leading-none tracking-tight text-cream/90 hover:text-warm transition-colors duration-300 [overflow-wrap:anywhere]"
          >
            <span className="link-underline">{profile.email}</span>
            <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-[0.8em] w-[0.8em] flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </div>

        <motion.div {...reveal(0.15)} className="lg:col-span-4 flex flex-col gap-1 lg:items-end lg:text-right">
          {activeSocials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-3 text-[0.7rem] tracking-[0.2em] uppercase text-cream/60 hover:text-cream transition-colors"
            >
              <SocialIcon icon={s.icon} className="h-4 w-4" />
              <span className="link-underline">{s.label}</span>
            </a>
          ))}
          <a
            href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
            className="inline-flex min-h-11 items-center text-[0.7rem] tracking-[0.2em] uppercase text-cream/60 hover:text-cream transition-colors"
          >
            <span className="link-underline">{profile.phone}</span>
          </a>
          <p className="inline-flex min-h-11 items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase text-cream/40">
            <MapPin aria-hidden="true" strokeWidth={1.6} className="h-3.5 w-3.5" />
            {profile.location}
          </p>
        </motion.div>
      </div>

      <div className="mt-12 md:mt-16 flex flex-col-reverse sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-cream/10 pt-8">
        <div className="flex flex-col gap-3">
          <a
            href="#top"
            className="group inline-flex min-h-11 items-center gap-2 text-[0.6rem] tracking-[0.22em] uppercase text-cream/45 hover:text-cream transition-colors"
          >
            <ArrowUp aria-hidden="true" strokeWidth={1.6} className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Back to top
          </a>
          <p className="text-[0.58rem] tracking-[0.2em] uppercase text-cream/30">
            © {site.year} {profile.name}
          </p>
        </div>
        <div
          aria-hidden="true"
          className="font-display leading-none tracking-tighter select-none text-ghost-gold text-[clamp(3.5rem,13vw,10rem)]"
        >
          PORTFOLIO
        </div>
      </div>
    </footer>
  );
}
