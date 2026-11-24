import { motion } from 'framer-motion';
import { ease, reveal } from '../lib/motion';
import Accent from './Accent';

type Props = {
  index: string;
  label: string;
  title: string;
  /** Word in the title to set in gold */
  accent?: string;
  light?: boolean;
  size?: 'lg' | 'sm';
};

const sizes = {
  lg: 'text-[clamp(2.6rem,8vw,7.5rem)]',
  sm: 'text-[clamp(2.2rem,5vw,4.25rem)]',
};

/** "(02) — Experience" label, an oversized title, and a rule that draws in. */
export default function SectionHeading({ index, label, title, accent, light = false, size = 'lg' }: Props) {
  const Title = size === 'lg' ? motion.h2 : motion.h3;

  return (
    <header className={size === 'lg' ? 'mb-8 md:mb-12' : 'mb-8 md:mb-10'}>
      <div className="flex items-center gap-4 mb-5">
        <span className={`text-[0.62rem] tracking-[0.28em] uppercase font-medium ${light ? 'text-cream/45' : 'text-ink/45'}`}>
          ({index}) — {label}
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
          className={`h-px flex-1 origin-left ${light ? 'bg-cream/15' : 'bg-ink/15'}`}
        />
      </div>
      <Title
        {...reveal(0.05)}
        className={`font-display leading-[0.9] tracking-tight ${sizes[size]} ${light ? 'text-cream' : 'text-ink'}`}
      >
        <Accent text={title} accent={accent} />
      </Title>
    </header>
  );
}
