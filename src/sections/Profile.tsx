import { motion } from 'framer-motion';
import { asset, degree, profile } from '../data/portfolio';
import { reveal } from '../lib/motion';
import SectionHeading from '../components/SectionHeading';
import ButtonLink from '../components/Button';

const facts = [
  { label: 'Degree', value: degree.title.replace('B.Tech, ', 'B.Tech ') },
  { label: 'Specialisation', value: degree.specialization },
  { label: 'University', value: degree.institution },
  { label: 'Years', value: degree.period },
  { label: 'CGPA', value: degree.score.replace('CGPA ', '') },
];

/** Hanging ID card — the photo swings in gently. */
function IdCard() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -6, y: -20 }}
      whileInView={{ opacity: 1, rotate: -2, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      style={{ transformOrigin: 'top center' }}
      className="flex flex-col items-center"
    >
      <div className="w-[2px] h-14 bg-ink/20" aria-hidden="true" />
      <div className="w-7 h-3 border-2 border-ink/25 rounded-sm" aria-hidden="true" />
      <figure className="bg-white border border-ink/10 p-2.5 shadow-[4px_8px_24px_rgba(0,0,0,0.12)] w-[clamp(11rem,18vw,15rem)] transition-transform duration-500 ease-editorial hover:rotate-2">
        <div className="aspect-[3/4] overflow-hidden bg-ink/5">
          <img
            src={asset('portrait-photo.jpg')}
            alt={`Photo of ${profile.name}`}
            width={570}
            height={760}
            loading="lazy"
            className="w-full h-full object-cover object-top grayscale-[15%] transition-[filter] duration-700 hover:grayscale-0"
          />
        </div>
        <figcaption className="mt-2.5 text-center">
          <span className="block font-display text-lg leading-none tracking-tight text-ink">{profile.name}</span>
          <span className="block mt-1 text-[0.6875rem] text-ink/60">
            B.Tech CSE · {degree.specialization}
          </span>
        </figcaption>
      </figure>
    </motion.div>
  );
}

export default function Profile() {
  return (
    <section id="about" className="bg-cream px-gutter pt-14 md:pt-16 pb-12 md:pb-16">
      <SectionHeading index="04" label="About" title={`HI, I'M ${profile.firstName.toUpperCase()}.`} accent={profile.firstName.toUpperCase()} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
        <div className="lg:col-span-3 flex justify-center lg:justify-start lg:-mt-8">
          <IdCard />
        </div>

        <div className="lg:col-span-9 xl:col-span-8">
          <motion.p
            {...reveal(0.05)}
            className="font-display text-[clamp(2rem,4.6vw,4.25rem)] leading-[0.95] tracking-tight text-ink"
          >
            {profile.positioning}
          </motion.p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {profile.about.map((para, i) => (
              <motion.p
                key={i}
                {...reveal(0.1 + i * 0.05)}
                className={`text-[0.9375rem] leading-relaxed ${i === 2 ? 'md:col-span-2 text-ink font-medium' : 'text-ink/72'}`}
              >
                {para}
              </motion.p>
            ))}
          </div>

          <motion.dl
            {...reveal(0.2)}
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-ink/15"
          >
            {facts.map((f) => (
              <div key={f.label} className="py-4 pr-4 border-b border-ink/10">
                <dt className="meta">{f.label}</dt>
                <dd className="mt-1 text-[0.9375rem] font-medium leading-snug text-ink">{f.value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div {...reveal(0.25)} className="mt-8">
            <ButtonLink href="#contact">Get in touch</ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
