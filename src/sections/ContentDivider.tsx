import { motion } from 'framer-motion';
import { articles } from '../data/portfolio';
import { ease } from '../lib/motion';

/** Oversized ghost word with one number per article — the editorial break before the work. */
export default function ContentDivider({ word = 'CONTENT' }: { word?: string }) {
  const numbers = articles.map((_, i) => String(i + 1).padStart(2, '0'));

  return (
    <div aria-hidden="true" className="relative w-full bg-cream overflow-hidden select-none py-2 md:py-4">
      <div className="relative flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease }}
          // 0.78 line-height trims the empty band Bebas leaves above and below its capitals
          className="font-display leading-[0.78] tracking-tighter pointer-events-none text-ghost"
          style={{ fontSize: 'clamp(4.5rem, 15vw, 14rem)' }}
        >
          {word}
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center gap-[clamp(0.75rem,2.8vw,3.25rem)]">
          {numbers.map((n, i) => (
            <motion.span
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: i * 0.06 }}
              className="font-display text-ink/70 leading-none"
              style={{ fontSize: 'clamp(1.25rem,3.4vw,3.25rem)' }}
            >
              {n}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
