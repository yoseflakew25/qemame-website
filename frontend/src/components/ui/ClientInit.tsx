'use client';

import { useEffect, useRef } from 'react';

/**
 * Runs client-side initialization:
 * - Adds the .js class for CSS hooks (loader, reveals, etc.)
 * - Imports the vanilla JS interactions
 *
 * This is a separate client component so the root layout
 * can remain a Server Component.
 */
export default function ClientInit() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Add the .js class for CSS hooks (loader, reveals, etc.)
    document.documentElement.classList.add('js');

    // Import the vanilla JS interactions
    // @ts-expect-error - vanilla JS file, no types needed
    import('../../../public/assets/js/site.js');
  }, []);

  return null;
}
