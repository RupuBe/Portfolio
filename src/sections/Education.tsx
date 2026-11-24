import { motion } from 'framer-motion';
import { certifications, education } from '../data/portfolio';
import { reveal } from '../lib/motion';
import SectionHeading from '../components/SectionHeading';

function Row({ title, sub, meta, aside }: { title: string; sub: string; meta: string; aside?: string }) {
  return (
    <li className="group grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-4 border-b border-ink/10 transition-colors duration-300 hover:border-ink/40">
      <p className="text-[0.9375rem] font-medium leading-snug text-ink">{title}</p>
      <p className="meta tabular-nums text-right whitespace-nowrap pt-0.5">{meta}</p>
      <p className="meta">{sub}</p>
      {aside && <p className="font-display text-xl leading-none text-ink text-right">{aside}</p>}
    </li>
  );
}

export default function Education() {
  return (
    <section id="education" aria-label="Education and certifications" className="bg-cream px-gutter pt-6 md:pt-10 pb-14 md:pb-16">
      <SectionHeading index="06" label="Education & certifications" title="ALWAYS LEARNING." size="sm" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-12">
        <motion.div {...reveal(0)}>
          <h4 className="pb-3 border-b border-ink/15 text-[0.9375rem] font-medium text-ink">Education</h4>
          <ul>
            {education.map((e) => (
              <Row key={e.title} title={e.title} sub={e.institution} meta={e.period} aside={e.score} />
            ))}
          </ul>
        </motion.div>

        <motion.div {...reveal(0.08)}>
          <h4 className="pb-3 border-b border-ink/15 text-[0.9375rem] font-medium text-ink">Certifications</h4>
          <ul>
            {certifications.map((c) => (
              <Row key={c.title} title={c.title} sub={c.issuer} meta={c.date} />
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
