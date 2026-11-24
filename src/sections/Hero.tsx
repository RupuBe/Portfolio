import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { activeSocials, asset, profile, shortYear } from '../data/portfolio';
import { ease, pop, reveal } from '../lib/motion';
import ButtonLink from '../components/Button';
import { SocialIcon } from '../components/Icons';
import Accent from '../components/Accent';

// PORTFOLIO reads as ONE wavy word across the vertical middle.
// The figure stands centered, fully IN FRONT of every letter.
// P o R T  ·(figure)·  F O L I o.
type L = { ch: string; left: string; top: number; size: string; dot?: boolean };
// All three O's share ONE size + uppercase glyph so they read evenly.
// Spacing is tuned so the final "O." (with its gold full stop) stays inside the viewport.
//
// `top` is in --u units (1vw, capped where the letter sizes cap), so the word
// keeps its shape at any window height and never slides into the text below.
const O_SIZE = 'clamp(6rem,19vw,20rem)';
const LETTERS: L[] = [
  { ch: 'P', left: '6vw',    top: 10,     size: 'clamp(7rem,24vw,25rem)' },
  { ch: 'O', left: '17.5vw', top: 20.625, size: O_SIZE },
  { ch: 'R', left: '28vw',   top: 11.25,  size: 'clamp(6rem,21vw,22rem)' },
  { ch: 'T', left: '37.7vw', top: 8.75,   size: 'clamp(6rem,21vw,22rem)' },
  { ch: 'F', left: '46.3vw', top: 13.75,  size: 'clamp(6rem,20vw,21rem)' },
  { ch: 'O', left: '55.9vw', top: 11.875, size: O_SIZE },
  { ch: 'L', left: '66.5vw', top: 20.625, size: 'clamp(5rem,20vw,21rem)' },
  { ch: 'I', left: '76.1vw', top: 12.5,   size: 'clamp(4rem,17vw,18rem)' },
  { ch: 'O', left: '79vw',   top: 20.625, size: O_SIZE, dot: true },
];
/** Where the lowest letter's ink ends, plus a little air — the text row starts below this. */
const LETTERS_BOTTOM = 'calc(36.2 * var(--u) + 1.5rem)';

const MOBILE_WORD_SIZE = 'clamp(2.4rem,14vw,8rem)';
const MOBILE_FIGURE_W = 'min(92vw, 30rem, 48svh)';
/** Where the PORTFOLIO word's centre line sits: just under the name block. */
const MOBILE_WORD_Y = `calc(var(--id-bottom, 16rem) + 0.62 * ${MOBILE_WORD_SIZE} + 1rem)`;

const contactLinks = [
  ...activeSocials.map((s) => ({ label: s.label, href: s.href, icon: s.icon, external: true })),
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' as const, external: false },
];

function Portrait({ className = '' }: { className?: string }) {
  return (
    <picture>
      <source srcSet={asset('portrait-cutout.webp')} type="image/webp" />
      <img
        src={asset('portrait-cutout.png')}
        alt={`Illustrated portrait of ${profile.name}`}
        width={1122}
        height={1402}
        fetchPriority="high"
        className={`w-full h-auto object-contain block ${className}`}
        draggable={false}
      />
    </picture>
  );
}

function Tagline({ className = '' }: { className?: string }) {
  return (
    <p className={`font-semibold text-ink tracking-[-0.01em] ${className}`}>
      {profile.tagline.map((line) => (
        <span key={line.text} className="block">
          <Accent text={line.text} accent={line.accent} />
        </span>
      ))}
    </p>
  );
}

/** Designations — one per line (desktop) or inline with wrap points between roles (mobile). */
function Roles({ className = '', stacked = false }: { className?: string; stacked?: boolean }) {
  return (
    <p className={`text-[0.8125rem] font-medium text-ink/72 ${className}`}>
      {profile.roles.map((r, i) =>
        stacked ? (
          <span key={r} className="block">{r}</span>
        ) : (
          <span key={r}>
            {i > 0 && <> <span className="text-ink/30" aria-hidden="true">/</span> </>}
            <span className="whitespace-nowrap">{r}</span>
          </span>
        ),
      )}
    </p>
  );
}

function ContactIcons({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex items-center ${className}`}>
      {contactLinks.map((s, i) => (
        <li key={s.label} className="flex items-center">
          {i > 0 && <span className="w-px h-4 bg-ink/20" aria-hidden="true" />}
          <a
            href={s.href}
            aria-label={s.label}
            title={s.label}
            {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="w-11 h-11 flex items-center justify-center text-ink/72 hover:text-ink transition-[color,transform] duration-300 hover:-translate-y-0.5"
          >
            <SocialIcon icon={s.icon} className="w-[18px] h-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Hero() {
  // Mobile: keep the PORTFOLIO word below the name block, however short the screen is.
  const stageRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const identity = identityRef.current;
    if (!stage || !identity) return;
    const update = () => stage.style.setProperty('--id-bottom', `${identity.offsetTop + identity.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(stage);
    ro.observe(identity);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="top" aria-label="Introduction" className="relative w-full bg-cream">
      {/* ══════════ DESKTOP ══════════ */}
      <div
        className="hidden lg:flex flex-col relative w-full overflow-hidden"
        // Fills the screen; on short windows it grows instead of letting the text slide under the letters
        style={{ minHeight: 'max(100vh, 720px)', '--u': 'min(1vw, 16.8px)' } as CSSProperties}
      >
        {/* + accent, far left */}
        <motion.span
          {...pop(0.02)}
          aria-hidden="true"
          className="absolute font-display select-none text-warm z-[12]"
          style={{ left: '2.2vw', top: 'calc(23.75 * var(--u))', fontSize: 'clamp(1.5rem,3vw,3rem)' }}
        >+</motion.span>

        {/* '26 */}
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          aria-hidden="true"
          className="absolute font-display leading-none select-none text-warm z-30"
          style={{ top: 'calc(6.875 * var(--u))', right: '4vw', fontSize: 'clamp(2rem,3.4vw,3.6rem)' }}
        >
          {shortYear}
        </motion.span>

        {/* ── PORTFOLIO letters (backdrop) ── */}
        <div aria-hidden="true">
          {LETTERS.map((l, i) => (
            <motion.div
              key={i}
              {...pop(0.04)}
              className="absolute font-poster text-ink leading-none select-none pointer-events-none"
              style={{
                left: l.left, top: `calc(${l.top} * var(--u))`, fontSize: l.size,
                lineHeight: 0.82, letterSpacing: '-0.02em',
              }}
            >
              {l.ch}
              {l.dot && (
                <span
                  className="inline-block rounded-full bg-warm align-baseline"
                  style={{ width: '0.1em', height: '0.1em', marginLeft: '0.03em' }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Portrait — centered, above every letter (transparent cutout) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
          className="absolute pointer-events-none select-none z-20"
          style={{ left: 'calc(50vw - 15vw)', bottom: 0, width: '30vw' }}
        >
          <Portrait />
        </motion.div>

        {/* ── Text row: bottom-anchored as before, but never higher than the letters' bottom ── */}
        <div
          className="relative z-30 mt-auto flex items-end justify-between gap-10 pointer-events-none"
          style={{ paddingTop: LETTERS_BOTTOM, paddingLeft: '6vw', paddingRight: '4vw', paddingBottom: '7vh' }}
        >
          {/* LEFT: tagline, intro, action */}
          <motion.div
            {...pop(0.35, 16)}
            className="pointer-events-auto"
            style={{ width: 'min(24rem, 27vw)' }}
          >
            <Tagline className="leading-[1.08] mb-4 text-[clamp(1rem,1.55vw,1.6rem)]" />
            <div className="flex gap-3 mb-6">
              <div className="w-px bg-ink/20 flex-shrink-0" />
              <p className="text-ink/72 leading-relaxed text-[clamp(0.8125rem,0.9vw,0.9375rem)]">{profile.intro}</p>
            </div>
            <ButtonLink href="#work">Explore my work</ButtonLink>
          </motion.div>

          {/* RIGHT: identity + connect */}
          <motion.div
            {...pop(0.42, 16)}
            className="pointer-events-auto flex flex-col items-end text-right"
            style={{ width: 'min(22rem, 26vw)' }}
          >
            <h1 className="font-display text-ink leading-[0.9] tracking-tight text-[clamp(2rem,3.2vw,3.6rem)]">
              {profile.name}
            </h1>
            <Roles stacked className="mt-3 leading-[1.7]" />
            <span className="my-5 h-px w-12 bg-ink/20" aria-hidden="true" />
            <p className="meta mb-1">Let&apos;s connect</p>
            <ContactIcons className="-mr-3" />
          </motion.div>
        </div>

        {/* SCROLL — on the left edge, clear of the portrait */}
        <motion.a
          href="#proof"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="absolute z-30 bottom-[4vh] flex flex-col items-center gap-3 text-[0.6875rem] tracking-[0.16em] uppercase text-ink/60 hover:text-ink transition-colors"
          style={{ left: '2.2vw' }}
        >
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <span aria-hidden="true" className="block w-px h-8 bg-ink/30" />
        </motion.a>
      </div>

      {/* ══════════ MOBILE / TABLET ══════════ */}
      <div className="lg:hidden">
        <div ref={stageRef} className="relative w-full overflow-hidden" // Sized to its content so there's no empty band: the figure's head (~9% down the image) lands just under the word's centre line
          style={{ height: `calc(${MOBILE_WORD_Y} + 1rem + 0.91 * 1.25 * ${MOBILE_FIGURE_W})`, minHeight: '560px', maxHeight: '1100px' }}>
          {/* '26 */}
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            aria-hidden="true"
            className="absolute font-display select-none text-warm z-30 leading-none"
            style={{ bottom: '4%', right: 'var(--gutter)', fontSize: 'clamp(1.6rem,6vw,2.6rem)' }}
          >{shortYear}</motion.span>

          {/* ── Identity, overlaid near the top ── */}
          <motion.div
            ref={identityRef}
            {...pop(0.25, 12)}
            className="absolute inset-x-0 z-30 flex flex-col items-center px-gutter text-center"
            style={{ top: 'calc(3.5rem + 5svh)' }}
          >
            <Roles className="max-w-[19rem] sm:max-w-none leading-[1.6]" />
            <h1 className="mt-2 font-display text-ink leading-[0.9] tracking-tight text-[clamp(2.4rem,11vw,4.5rem)]">
              {profile.name}
            </h1>
            <Tagline className="mt-3 leading-[1.3] text-[clamp(0.72rem,3.3vw,1.05rem)]" />
          </motion.div>

          {/* ── PORTFOLIO — single row, backdrop ── */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 flex justify-center pointer-events-none select-none z-10"
            // Centre line of the word sits just under the name block; the figure overlaps its lower half
            style={{ top: MOBILE_WORD_Y }}
          >
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.05 }}
              className="font-poster text-ink leading-none text-center"
              style={{
                // ≈ 6.3em wide, so 14vw keeps the whole word (and its gold O) on screen
                fontSize: MOBILE_WORD_SIZE,
                letterSpacing: '-0.03em',
                transform: 'translateY(-50%) scaleY(1.28)',
              }}
            >
              PORTFOLI<span className="text-warm">O</span>
            </motion.div>
          </div>

          {/* ── Portrait — anchored to bottom, in front of the word ── */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none z-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease, delay: 0.15 }}
              style={{ width: MOBILE_FIGURE_W }}
            >
              <Portrait />
            </motion.div>
          </div>
        </div>

        {/* ── Intro + actions, below the portrait ── */}
        <div className="px-gutter pt-10 pb-4 border-t border-ink/10">
          <motion.div {...reveal(0, 16)} className="mx-auto max-w-xl">
            <p className="meta mb-4">Hello — I&apos;m {profile.firstName}</p>
            <p className="text-ink/72 leading-relaxed text-[0.9375rem]">{profile.intro}</p>
            <ButtonLink href="#work" className="mt-7 w-full min-[420px]:w-auto">Explore my work</ButtonLink>
            <div className="mt-6 flex items-center justify-between">
              <p className="meta">Let&apos;s connect</p>
              <ContactIcons className="-mr-3" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
