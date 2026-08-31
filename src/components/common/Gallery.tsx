'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const GRID_IMAGES = [
  { src: 'assets/img/gallery/g1.jpg', alt: 'Ethiopian coffee plant in the highlands', w: 800, h: 800, num: '01', caption: 'The highlands' },
  { src: 'assets/img/gallery/g2.jpg', alt: 'Coffee processing at the station', w: 480, h: 960, num: '02', caption: 'The station' },
  { src: 'assets/img/gallery/g3.jpg', alt: 'Coffee cherries ready for harvest', w: 480, h: 480, num: '03', caption: 'Ripe cherry' },
  { src: 'assets/img/gallery/g4.jpg', alt: 'Natural processed Ethiopian coffee', w: 480, h: 480, num: '04', caption: 'Natural process' },
  { src: 'assets/img/gallery/g5.jpg', alt: 'Coffee export operations', w: 1440, h: 480, num: '05', caption: 'Export operations' },
  { src: 'assets/img/gallery/g6.jpg', alt: 'Ethiopia coffee export insights', w: 480, h: 480, num: '06', caption: 'Export insights' },
];

const CAROUSEL_IMAGES = [
  { src: 'assets/img/gallery/c1.jpg', alt: 'Coffee processing station', num: '07', caption: 'Processing' },
  { src: 'assets/img/gallery/c2.jpg', alt: 'Hand sorting coffee beans', num: '08', caption: 'Sorting' },
  { src: 'assets/img/gallery/c3.jpg', alt: 'Coffee drying process', num: '09', caption: 'Drying' },
  { src: 'assets/img/gallery/c4.jpg', alt: 'Coffee quality inspection', num: '10', caption: 'Quality check' },
  { src: 'assets/img/gallery/c5.jpg', alt: 'Coffee packaging and preparation', num: '11', caption: 'Packaging' },
  { src: 'assets/img/gallery/c6.jpg', alt: 'Coffee ready for export', num: '12', caption: 'Ready to ship' },
];

const AREA_CLASSES = ['gtile--a', 'gtile--b', 'gtile--c', 'gtile--d', 'gtile--e', 'gtile--f'];

function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }

export default function Gallery() {
  const reduce = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const userTookRef = useRef(false);
  const stepRef = useRef(0);

  const slides = CAROUSEL_IMAGES;

  const recalcStep = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    stepRef.current = track.firstElementChild.getBoundingClientRect().width + gap;
  }, []);

  const maxScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    return track.scrollWidth - track.clientWidth;
  }, []);

  const index = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    return Math.round(track.scrollLeft / stepRef.current);
  }, []);

  const go = useCallback((i: number, smooth: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    const last = slides.length - 1;
    let target = clamp(i, 0, last) * stepRef.current;
    if (target > maxScroll()) target = maxScroll();
    track.scrollTo({ left: target, behavior: smooth && !reduce ? 'smooth' : 'auto' });
  }, [slides.length, maxScroll, reduce]);

  const sync = useCallback(() => {
    const i = index();
    setActiveDot(i);
    const track = trackRef.current;
    if (!track) return;
    setPrevDisabled(track.scrollLeft <= 2);
    setNextDisabled(track.scrollLeft >= maxScroll() - 2);
  }, [index, maxScroll]);

  const stopAuto = useCallback(() => {
    userTookRef.current = true;
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; }
  }, []);

  const startAuto = useCallback(() => {
    if (reduce || userTookRef.current || autoRef.current) return;
    autoRef.current = setInterval(() => {
      if (document.hidden) return;
      const track = trackRef.current;
      if (!track) return;
      const i = track.scrollLeft >= maxScroll() - 2 ? 0 : index() + 1;
      go(i, true);
    }, 5200);
  }, [reduce, maxScroll, index, go]);

  // Scroll sync
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf: number | null = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = null; sync(); });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [sync]);

  // Resize
  useEffect(() => {
    recalcStep();
    sync();
    window.addEventListener('resize', () => { recalcStep(); sync(); });
    return () => window.removeEventListener('resize', recalcStep);
  }, [recalcStep, sync]);

  // User interaction stops auto
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const events = ['pointerdown', 'wheel', 'keydown', 'touchstart'] as const;
    events.forEach((ev) => track.addEventListener(ev, stopAuto, { passive: true }));
    return () => events.forEach((ev) => track.removeEventListener(ev, stopAuto));
  }, [stopAuto]);

  // Auto-advance via IntersectionObserver
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) startAuto();
        else { if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; } }
      },
      { threshold: 0.35 },
    );
    io.observe(track);
    return () => io.disconnect();
  }, [startAuto]);

  // Pause on hover
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onEnter = () => { if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; } };
    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', startAuto);
    return () => {
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', startAuto);
    };
  }, [startAuto]);

  return (
    <section className="gal" id="gallery">
      <div className="wrap">
        <header className="shead shead--center" data-reveal>
          <p className="shead__eyebrow"><span className="tick" /> Gallery</p>
          <h2 className="shead__title"><span className="hollow">From the farm,</span><br />to the container.</h2>
        </header>

        <div className="gal__grid" data-reveal>
          {GRID_IMAGES.map((img, i) => (
            <figure key={img.num} className={`gtile ${AREA_CLASSES[i]}`}>
              <div className="gtile__img">
                <img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" decoding="async" />
              </div>
              <figcaption><span className="gtile__n">{img.num}</span> {img.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="gcar" data-reveal>
          <div className="gcar__head">
            <p className="gcar__label"><span className="tick" /> More from the chain</p>
            <div className="gcar__nav">
              <button className="gcar__btn" id="galPrev" aria-label="Previous photographs" disabled={prevDisabled} onClick={() => { stopAuto(); go(index() - 1, true); }}>&#8592;</button>
              <button className="gcar__btn" id="galNext" aria-label="Next photographs" disabled={nextDisabled} onClick={() => { stopAuto(); go(index() + 1, true); }}>&#8594;</button>
            </div>
          </div>
          <div className="gcar__track" id="galTrack" ref={trackRef} tabIndex={0} role="group" aria-label="More photographs, scroll sideways">
            {CAROUSEL_IMAGES.map((img) => (
              <figure key={img.num} className="gslide">
                <div className="gslide__img">
                  <img src={img.src} alt={img.alt} width={760} height={520} loading="lazy" decoding="async" />
                </div>
                <figcaption><span className="gtile__n">{img.num}</span> {img.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="gcar__dots" id="galDots" aria-hidden="true">
            {slides.map((_, n) => (
              <button
                key={n}
                className={`gcar__dot${activeDot === n ? ' is-on' : ''}`}
                aria-label={`Photograph ${n + 1}`}
                onClick={() => { stopAuto(); go(n, true); }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
