import { useEffect, useRef, useState } from 'react';

/** Custom ring cursor for mouse users. Grows over anything marked `data-cursor="grow"`. */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [grow, setGrow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener('change', update);
    return () => fine.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
      setVisible(true);
    };
    // Hide when the pointer leaves the window instead of parking at the edge
    const onLeave = () => setVisible(false);
    // Delegated, so cards rendered later are picked up too
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setGrow(Boolean(target?.closest?.('[data-cursor="grow"]')));
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className={`transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 bg-ink rounded-full pointer-events-none z-[9999] transition-transform duration-[30ms]"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-transform duration-200 ease-out"
      >
        <div
          className={`w-10 h-10 border border-ink rounded-full transition-[transform,opacity] duration-300 ease-editorial ${
            grow ? 'scale-[2.2] opacity-40' : 'scale-100 opacity-30'
          }`}
        />
      </div>
    </div>
  );
}
