import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { achievements } from '../data/portfolio';
import { reveal } from '../lib/motion';

/** Counts up to `to` the first time it scrolls into view. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref} className="tabular-nums">{value}</span>;
}

function Stat({ item }: { item: (typeof achievements)[number] }) {
  return (
    <div className="group h-full bg-cream px-4 sm:px-6 py-5 md:py-6">
      <p
        className="font-display leading-[0.85] tracking-tight text-ink text-[clamp(2.75rem,4.4vw,4.25rem)]"
      >
        <CountUp to={Number(item.value)} />
        {item.suffix && <span className="text-warm">{item.suffix}</span>}
      </p>
      <p className="eyebrow text-ink/55 mt-3 tracking-[0.16em] xl:tracking-[0.28em]">{item.label}</p>
      <p className="text-ink/55 mt-1 text-[0.78rem] leading-snug">{item.detail}</p>
    </div>
  );
}

/** A compact strip of proof points, directly under the hero. */
export default function Proof() {
  return (
    <section id="proof" aria-label="A little proof of work" className="relative bg-cream px-gutter pt-12 md:pt-16 pb-10 md:pb-14">
      <motion.header {...reveal(0)} className="flex items-baseline gap-4 mb-5 md:mb-6">
        <h2 className="font-display leading-none tracking-tight text-ink text-[clamp(1.75rem,2.8vw,2.6rem)] whitespace-nowrap">
          NUMBERS THAT <span className="text-warm">SPEAK.</span>
        </h2>
        <span className="h-px flex-1 bg-ink/15 self-center" aria-hidden="true" />
        <span className="hidden sm:inline eyebrow whitespace-nowrap">(01) — A little proof of work</span>
      </motion.header>

      {/* Hairline grid: the 1px gaps show the border colour between cells */}
      {/* Phone: 670+ on its own row, then 2 × 2. Tablet: 2 + 3 on a 6-column grid. Desktop: one row of 5. */}
      <ul className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-5 gap-px bg-ink/15 border-y border-ink/15">
        {achievements.map((item, i) => (
          <motion.li
            key={item.label}
            {...reveal(0.06 * i)}
            className={`${i === 0 ? 'col-span-2' : 'col-span-1'} ${i < 2 ? 'sm:col-span-3' : 'sm:col-span-2'} lg:col-span-1`}
          >
            <Stat item={item} />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
