import { useEffect, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { asset, navLinks, profile, site } from '../data/portfolio';
import { ease } from '../lib/motion';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape or when resizing up to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const background = open
    ? 'bg-cream border-ink/10'
    : scrolled
      ? 'bg-cream/95 backdrop-blur-sm border-ink/10'
      : 'bg-transparent border-transparent';

  // Collapsing the menu in the same frame as the hash jump cancels the smooth
  // scroll on mobile browsers, so close first and scroll on the next frame.
  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      history.pushState(null, '', href);
    });
  };

  return (
    <motion.nav
      aria-label="Primary"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className={`fixed top-0 left-0 right-0 z-50 px-gutter transition-[background-color,border-color] duration-300 border-b ${background}`}
    >
      <div className="flex h-14 md:h-16 items-center justify-between">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 text-[0.6875rem] tracking-[0.16em] uppercase font-semibold text-ink hover:text-ink transition-colors">
          <span className="flex h-6 w-6 items-center justify-center bg-ink text-cream font-poster text-[0.55rem] tracking-normal">
            {profile.initials}
          </span>
          <span className="hidden min-[360px]:inline">{profile.name}</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-3 text-[0.6875rem] tracking-[0.16em] uppercase font-medium text-ink/72 hover:text-ink transition-colors"
            >
              <span className="link-underline">{item.label}</span>
            </a>
          ))}
          <a
            href={asset(site.resumeFile)}
            download={site.resumeFile}
            className="group inline-flex items-center gap-2 border border-ink/70 px-3.5 py-2 text-[0.6875rem] tracking-[0.16em] uppercase font-semibold text-ink hover:bg-ink hover:text-cream transition-colors duration-300"
          >
            Résumé
            <Download aria-hidden="true" strokeWidth={1.8} className="h-3 w-3 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col items-end justify-center gap-[5px] w-11 h-11 -mr-2 pr-2"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6.5, width: '1.25rem' } : { rotate: 0, y: 0, width: '1.25rem' }}
            className="block h-[1.5px] bg-ink"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block h-[1.5px] w-4 bg-ink"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6.5, width: '1.25rem' } : { rotate: 0, y: 0, width: '0.85rem' }}
            className="block h-[1.5px] bg-ink"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col border-t border-ink/10 pt-2 pb-6">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => goTo(e, item.href)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease, delay: 0.04 * i }}
                  className="flex items-center justify-between py-3 font-display text-3xl tracking-tight text-ink border-b border-ink/5"
                >
                  {item.label}
                  <span className="font-sans text-[0.6875rem] tracking-[0.16em] text-ink/60">0{i + 1}</span>
                </motion.a>
              ))}
              <a
                href={asset(site.resumeFile)}
                download={site.resumeFile}
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 bg-ink text-cream text-[0.6875rem] tracking-[0.16em] uppercase font-semibold"
              >
                Download Résumé
                <Download aria-hidden="true" strokeWidth={1.8} className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
