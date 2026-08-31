'use client';

import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastY = 0;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        nav.classList.toggle('stuck', y > 40);
        if (!nav.classList.contains('open')) {
          nav.classList.toggle('hide', y > lastY && y > 380);
        }
        lastY = y;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active section tracking
    const links = Array.from(nav.querySelectorAll<HTMLElement>('[data-nav]'));
    const sections = links
      .map((a) => document.querySelector<HTMLElement>(a.getAttribute('data-target') || ''))
      .filter(Boolean) as HTMLElement[];

    let io: IntersectionObserver | null = null;
    if (sections.length && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            links.forEach((a) => {
              a.classList.toggle('active', a.getAttribute('data-target') === '#' + en.target.id);
            });
          });
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      sections.forEach((s) => io!.observe(s));
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);

  // Burger toggle
  const toggleMenu = () => {
    const nav = navRef.current;
    if (!nav) return;
    const next = !menuOpen;
    setMenuOpen(next);
    nav.classList.toggle('open', next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const closeMenu = () => {
    const nav = navRef.current;
    if (!nav) return;
    setMenuOpen(false);
    nav.classList.remove('open');
    document.body.style.overflow = '';
  };

  return (
    <header className="nav" id="nav" ref={navRef}>
      <a className="nav__brand" data-target="#top">
        <svg className="nav__mark" viewBox="0 0 48 48" aria-hidden="true">
          <g transform="translate(24 22) rotate(-24)" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <ellipse rx="19" ry="13" />
            <path d="M-13.4 0C-7 -5.8 7 5.8 13.4 0" />
          </g>
          <path d="M13 43h22" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity="0.55" />
        </svg>
        <span className="nav__name">QEMAME<em>Trading PLC</em></span>
      </a>
      <nav className="nav__links" id="navlinks" aria-label="Main">
        <a data-nav data-target="#about">About us</a>
        <a data-nav data-target="#terroir">Origins</a>
        <a data-nav data-target="#offer">What we offer</a>
        <a data-nav data-target="#gallery">Gallery</a>
        <a data-nav data-target="#export">Export</a>
        <a data-nav data-target="#values">Values</a>
        <a data-nav data-target="#team">Our team</a>
        <a className="nav__cta" data-target="#contact">Request samples</a>
      </nav>
      <button
        className="nav__burger"
        id="burger"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <span /><span /><span />
      </button>
    </header>
  );
}
