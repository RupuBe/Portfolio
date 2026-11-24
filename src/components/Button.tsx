import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { ArrowRight, Download } from 'lucide-react';

type Variant = 'solid' | 'outline' | 'outline-light';

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-cream border-ink hover:bg-warm hover:border-warm hover:text-ink',
  outline: 'border-ink/70 text-ink hover:bg-ink hover:text-cream',
  'outline-light': 'border-cream/40 text-cream hover:bg-cream hover:text-ink',
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: 'arrow' | 'download';
  children: ReactNode;
};

export default function ButtonLink({ variant = 'outline', icon = 'arrow', className = '', children, ...rest }: Props) {
  const Icon = icon === 'download' ? Download : ArrowRight;
  return (
    <a
      {...rest}
      className={`group inline-flex min-h-11 items-center justify-center gap-3 border px-5 sm:px-6 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
      <Icon
        aria-hidden="true"
        strokeWidth={1.8}
        className={`h-3.5 w-3.5 flex-shrink-0 transition-transform duration-300 ease-editorial ${
          icon === 'download' ? 'group-hover:translate-y-0.5' : 'group-hover:translate-x-1'
        }`}
      />
    </a>
  );
}
