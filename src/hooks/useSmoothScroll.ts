'use client';

import { useEffect } from 'react';

/**
 * Attaches click handlers to all [data-target] elements for smooth scrolling.
 */
export function useSmoothScroll(reduce = false) {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLElement>('[data-target]');
    const handler = (e: Event) => {
      e.preventDefault();
      const target = (e.currentTarget as HTMLElement).getAttribute('data-target');
      if (!target) return;
      const el = document.querySelector<HTMLElement>(target);
      if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    };

    links.forEach((a) => a.addEventListener('click', handler));
    return () => links.forEach((a) => a.removeEventListener('click', handler));
  }, [reduce]);
}
