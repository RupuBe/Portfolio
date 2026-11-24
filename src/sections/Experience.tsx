import { motion } from 'framer-motion';
import { experience } from '../data/portfolio';
import { reveal } from '../lib/motion';
import SectionHeading from '../components/SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="bg-cream px-gutter pt-10 md:pt-12 pb-16 md:pb-20">
      <SectionHeading index="02" label="Professional experience" title="BUILD. TEST. WRITE." accent="WRITE." />

      <ol className="border-b border-ink/15">
        {experience.map((job, i) => (
          <motion.li
            key={job.role + job.company}
            {...reveal(0.05 * i)}
            className="group relative grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-5 border-t border-ink/15 py-7 md:py-9"
          >
            {/* Rule that darkens on hover */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-700 ease-editorial group-hover:scale-x-100"
            />

            {/* Meta */}
            <div className="md:col-span-3 flex md:flex-col items-baseline md:items-start justify-between md:justify-start gap-2">
              <span className="font-display text-[2rem] md:text-[2.75rem] leading-none text-ink/20 transition-colors duration-500 group-hover:text-warm">
                0{i + 1}
              </span>
              <div className="text-right md:text-left md:mt-4">
                <p className="text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-ink/70">{job.period}</p>
                <p className="text-[0.62rem] tracking-[0.22em] uppercase text-ink/40 mt-1">{job.mode}</p>
              </div>
            </div>

            {/* Role */}
            <div className="md:col-span-4">
              <h3 className="font-display text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[0.92] tracking-tight text-ink">
                {job.role}
              </h3>
              <p className="mt-2 text-[0.95rem] font-medium text-ink/75">{job.company}</p>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-ink/50 max-w-sm">{job.summary}</p>
              <p className="mt-5 text-[0.6rem] tracking-[0.2em] uppercase text-ink/45">
                {job.stack.map((s, k) => (
                  <span key={s}>
                    {k > 0 && <span className="text-warm mx-1.5" aria-hidden="true">/</span>}
                    {s}
                  </span>
                ))}
              </p>
            </div>

            {/* Outcomes */}
            <ul className="md:col-span-5 flex flex-col gap-2.5">
              {job.points.map((p) => (
                <li key={p} className="flex gap-3 text-[0.88rem] leading-relaxed text-ink/70">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 flex-shrink-0 bg-warm" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
