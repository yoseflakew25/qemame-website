'use client';

import { useEffect } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Runs client-side initialization:
 * - Adds the .js class for CSS hooks (reveals, etc.)
 * - Sets up reveal animations and smooth scrolling
 *
 * This is a separate client component so the root layout
 * can remain a Server Component.
 */
export default function ClientInit() {
  const reduce = usePrefersReducedMotion();
  useReveal();
  useSmoothScroll(reduce);

  useEffect(() => {
    document.documentElement.classList.add('js');
  }, []);

  return null;
}
