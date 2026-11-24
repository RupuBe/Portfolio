import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';
import { ease, reveal } from '../lib/motion';
import SectionHeading from '../components/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="bg-cream px-gutter pt-10 md:pt-12 pb-12 md:pb-14">
      <SectionHeading index="05" label="Skills" title="WHAT I WORK WITH." accent="WORK" size="sm" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-10">
        {skills.map((group, g) => (
          <motion.div key={group.group} {...reveal(g * 0.06)} className="border-t border-ink/15 pt-4">
            <div className="flex items-baseline justify-between mb-4">
              <h4 className="text-[0.68rem] tracking-[0.22em] uppercase font-semibold text-ink">{group.group}</h4>
              <span className="font-display text-xl leading-none text-warm">0{g + 1}</span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.03 }}
                  className="border border-ink/15 px-3 py-1.5 text-[0.8rem] text-ink/75 transition-colors duration-300 hover:border-ink hover:text-ink"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
