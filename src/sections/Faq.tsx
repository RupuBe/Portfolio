import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../data/portfolio';
import { reveal } from '../lib/motion';
import SectionHeading from '../components/SectionHeading';

/** Plain-language answers, also published as FAQPage structured data. */
export default function Faq() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="bg-cream px-gutter pt-6 md:pt-10 pb-16 md:pb-20">
      <SectionHeading index="07" label="Quick answers" title="GOOD QUESTIONS." size="sm" />

      <motion.div {...reveal(0)} className="max-w-4xl border-t border-ink/15">
        {faqs.map((f, i) => (
          <details key={f.q} open={i === 0} className="group border-b border-ink/10 transition-colors duration-300 hover:border-ink/40">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <h4 className="text-[1.0625rem] font-medium leading-snug text-ink">{f.q}</h4>
              <Plus
                aria-hidden="true"
                strokeWidth={1.6}
                className="mt-1 h-4 w-4 flex-shrink-0 text-ink/60 transition-transform duration-300 group-open:rotate-45 group-open:text-ink"
              />
            </summary>
            <p className="pb-6 pr-10 max-w-3xl text-[0.9375rem] leading-relaxed text-ink/72">{f.a}</p>
          </details>
        ))}
      </motion.div>
    </section>
  );
}
