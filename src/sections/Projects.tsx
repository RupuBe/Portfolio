import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { articles, profile, technicalProjects, type Tone } from '../data/portfolio';
import { ease, reveal } from '../lib/motion';
import SectionHeading from '../components/SectionHeading';

const toneBg = (tone: Tone) => ({ backgroundColor: `rgb(var(--proj-${tone}))` });

// Grid placement: 2-up on tablet (last card full width), 3 + 2 on laptop, 5-up on wide screens.
const span = (i: number, total: number) =>
  [
    i === total - 1 && total % 2 === 1 ? 'md:col-span-2' : '',
    i < 3 ? 'lg:col-span-2' : 'lg:col-span-3',
    'xl:col-span-1',
  ].join(' ');

/** Link when there's a URL, otherwise a non-interactive card. */
function CardShell({ url, className, children }: { url: string | null; className: string; children: ReactNode }) {
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" data-cursor="grow" className={className}>
      {children}
    </a>
  ) : (
    <div aria-disabled="true" className={className}>{children}</div>
  );
}

function ArticleCard({ article, index }: { article: (typeof articles)[number]; index: number }) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <CardShell
      url={article.url}
      className="group relative flex h-full min-h-[24rem] flex-col overflow-hidden text-white transition-transform duration-500 ease-editorial hover:-translate-y-1 focus-visible:-translate-y-1"
    >
      <div className="absolute inset-0 transition-[filter] duration-500 group-hover:brightness-[0.93]" style={toneBg(article.tone)} />

      {/* ── Typographic cover ── */}
      <div className="relative flex-1 p-5 pb-0">
        <div className="flex items-center justify-between text-[0.8125rem] text-white/80">
          <span>Freelysta Learn</span>
          <span>No. {number}</span>
        </div>
        <div className="mt-3 h-px bg-white/25" />

        <span
          aria-hidden="true"
          className="block font-poster text-[4.5rem] leading-[0.8] h-12 mt-5 text-white/25 transition-transform duration-500 ease-editorial group-hover:-translate-y-1 group-hover:text-white/40"
        >
          &ldquo;
        </span>
        <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.35rem)] xl:text-[clamp(1.5rem,1.75vw,2.1rem)] leading-[0.95] tracking-tight transition-transform duration-500 ease-editorial group-hover:translate-x-1">
          {article.title}
        </h3>
        {/* Byline, with the view count as quiet metadata beside it */}
        <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[0.8125rem] text-white/80">
          <span>By {profile.name}</span>
          {article.highlight && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-white">{article.highlight}</span>
            </>
          )}
        </p>
      </div>

      {/* ── Details ── */}
      <div className="relative p-5 pt-6">
        <p className="text-[0.8125rem] font-medium text-white/80">{article.category}</p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/90 max-w-[22rem]">{article.summary}</p>

        <p className="relative mt-5 flex items-center gap-2 text-[0.875rem] font-medium">
          {article.url ? (
            <>
              <span className="link-underline">Read article</span>
              <ArrowUpRight aria-hidden="true" strokeWidth={1.8} className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </>
          ) : (
            <>
              <Clock aria-hidden="true" strokeWidth={1.8} className="h-3.5 w-3.5 text-white/80" />
              <span className="text-white/80">Link coming soon</span>
            </>
          )}
        </p>
      </div>
    </CardShell>
  );
}

/** Minimal route line — a nod to RouteAura without pretending to be a screenshot. */
function RouteGraphic() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto" aria-hidden="true">
      <motion.path
        d="M20 160 C 80 160, 90 60, 160 80 S 250 150, 300 40"
        fill="none"
        stroke="rgb(var(--gold))"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
      />
      {[[20, 160], [160, 80], [300, 40]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="none" stroke="rgb(var(--cream) / 0.35)" />
          <circle cx={x} cy={y} r="3.5" fill="rgb(var(--cream))" />
        </g>
      ))}
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="work" className="bg-cream pb-10 md:pb-12">
      <div className="px-gutter">
        <SectionHeading index="03" label="Selected work" title="SELECTED WRITING." />
        <motion.p {...reveal(0.1)} className="-mt-4 md:-mt-8 mb-8 md:mb-10 max-w-xl text-[0.9375rem] leading-relaxed text-ink/72">
          Published articles for Freelysta Learn, written for beginner freelancers on portfolios, client communication and pricing.
        </motion.p>
      </div>

      {/* Swipeable on phones, grid from tablet up */}
      <div className="no-scrollbar flex md:grid md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-5 gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none px-gutter pb-2 md:pb-0 scroll-px-[var(--gutter)]">
        {articles.map((article, i) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease, delay: i * 0.07 }}
            className={`flex-shrink-0 w-[min(82vw,22rem)] md:w-auto snap-start ${span(i, articles.length)}`}
          >
            <ArticleCard article={article} index={i} />
          </motion.div>
        ))}
      </div>
      <p className="md:hidden px-gutter mt-3 meta" aria-hidden="true">
        Swipe for more →
      </p>

      {/* ── Technical projects ── */}
      <div className="px-gutter mt-14 md:mt-16">
        <SectionHeading index="03.1" label="Technical projects" title="BUILT WITH CODE." size="sm" />

        <div className="flex flex-col gap-6">
          {technicalProjects.map((p, i) => (
            <motion.article
              key={p.name}
              {...reveal(0.05)}
              className="group grid grid-cols-1 lg:grid-cols-12 border border-ink/15 transition-colors duration-500 hover:border-ink/40"
            >
              <div className="lg:col-span-5 bg-ink text-cream p-6 md:p-10 flex flex-col justify-between gap-8 min-h-[16rem]">
                <div className="flex items-center justify-between text-[0.8125rem] text-cream/72">
                  <span>Project No. {String(i + 1).padStart(2, '0')}</span>
                  <span>{p.stack.slice(0, 2).join(' · ')}</span>
                </div>
                <div className="px-2">
                  <RouteGraphic />
                </div>
                <p className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.85] tracking-tight">
                  {p.name}
                </p>
              </div>

              <div className="lg:col-span-7 p-6 md:p-10">
                <p className="meta">{p.type}</p>
                <h4 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.92] tracking-tight text-ink">
                  {p.name} <span className="text-ink/60">— {p.subtitle}</span>
                </h4>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink/72">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 flex-shrink-0 bg-ink/30" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
                  {p.stack.map((s) => (
                    <li key={s} className="border border-ink/15 px-2.5 py-1 text-[0.8125rem] text-ink/72">{s}</li>
                  ))}
                </ul>
                {(p.url || p.repo) && (
                  <div className="mt-7 flex flex-wrap gap-6 text-[0.875rem] font-medium">
                    {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="link-underline">Live site ↗</a>}
                    {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer" className="link-underline">Source code ↗</a>}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
