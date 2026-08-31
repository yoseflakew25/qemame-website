'use client';

import { useEffect } from 'react';

/**
 * Observes all [data-reveal] elements and adds class "in" when they enter the viewport.
 * Elements are unobserved after reveal (one-shot).
 */
export function useReveal(rootMargin = '0px 0px -12% 0px', threshold = 0.08) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin, threshold },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootMargin, threshold]);
}
