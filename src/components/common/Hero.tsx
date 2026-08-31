'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Hero() {
  const reduce = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce) return;
    const hero = heroRef.current;
    if (!hero) return;

    const layers = hero.querySelectorAll<HTMLElement>('[data-depth]');
    if (!layers.length) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, rafId = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const pl = () => {
      rafId = 0;
      cx = lerp(cx, tx, 0.06);
      cy = lerp(cy, ty, 0.06);
      if (Math.abs(cx - tx) < 0.001 && Math.abs(cy - ty) < 0.001) return;
      layers.forEach((l) => {
        const d = parseFloat(l.getAttribute('data-depth') || '0.1');
        l.style.transform = 'translate3d(' + (-cx * d * 46) + 'px,' + (-cy * d * 22) + 'px,0)';
      });
      rafId = requestAnimationFrame(pl);
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!rafId) rafId = requestAnimationFrame(pl);
    };

    hero.addEventListener('mousemove', onMouseMove);
    return () => {
      hero.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduce]);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__sky" aria-hidden="true">
        <div className="hero__sun" />

        <svg className="hero__ink" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <g className="hink__halo" transform="translate(1108 196)" fill="none">
            <circle r="196" stroke="#D9A441" strokeWidth="1" opacity=".16" />
            <circle r="232" stroke="#D9A441" strokeWidth="1" strokeDasharray="3 12" opacity=".2" />
            <circle r="268" stroke="#8AAE4A" strokeWidth="1" strokeDasharray="16 12" opacity=".16" />
            <path d="M-300 0 h84 M216 0 h84 M0 -300 v70 M0 230 v70" stroke="#D9A441" strokeWidth="1" opacity=".22" />
          </g>
          <g className="hink__topo" fill="none" stroke="#D9A441">
            <path d="M-40 470 C170 424 320 486 480 452 C640 418 790 480 950 450 C1110 420 1270 476 1480 440" strokeWidth="1" opacity=".10" />
            <path d="M-40 496 C170 450 320 512 480 478 C640 444 790 506 950 476 C1110 446 1270 502 1480 466" strokeWidth="1" opacity=".095" />
            <path d="M-40 522 C170 476 320 538 480 504 C640 470 790 532 950 502 C1110 472 1270 528 1480 492" strokeWidth="1" opacity=".09" />
            <path d="M-40 548 C170 502 320 564 480 530 C640 496 790 558 950 528 C1110 498 1270 554 1480 518" strokeWidth="1" opacity=".08" />
            <path d="M-40 574 C170 528 320 590 480 556 C640 522 790 584 950 554 C1110 524 1270 580 1480 544" strokeWidth="1" opacity=".07" />
          </g>
        </svg>

        <svg className="hero__range" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <g>
            <path className="r r5" d="M0 400 L150 300 L260 360 L400 250 L560 350 L700 270 L860 360 L1000 280 L1160 370 L1300 300 L1440 380 L1440 620 L0 620Z" />
            <path className="ridge ridge--5" d="M0 400 L150 300 L260 360 L400 250 L560 350 L700 270 L860 360 L1000 280 L1160 370 L1300 300 L1440 380" />
          </g>
          <g>
            <path className="r r4" d="M0 460 L120 380 L250 440 L380 340 L520 430 L660 360 L800 450 L960 370 L1100 450 L1260 380 L1440 460 L1440 620 L0 620Z" />
            <path className="ridge ridge--4" d="M0 460 L120 380 L250 440 L380 340 L520 430 L660 360 L800 450 L960 370 L1100 450 L1260 380 L1440 460" />
          </g>
          <g>
            <path className="r r3" d="M0 520 L160 440 L300 510 L440 420 L600 500 L760 430 L920 520 L1080 440 L1240 520 L1440 450 L1440 620 L0 620Z" />
            <path className="ridge ridge--3" d="M0 520 L160 440 L300 510 L440 420 L600 500 L760 430 L920 520 L1080 440 L1240 520 L1440 450" />
          </g>
          <g>
            <path className="r r2" d="M0 570 L180 500 L340 560 L500 490 L660 560 L820 500 L980 570 L1140 500 L1300 570 L1440 520 L1440 620 L0 620Z" />
            <path className="ridge ridge--2" d="M0 570 L180 500 L340 560 L500 490 L660 560 L820 500 L980 570 L1140 500 L1300 570 L1440 520" />
          </g>
        </svg>
        <svg className="hero__foreground" viewBox="0 0 1440 340" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path className="r r1" d="M0 150 C120 110 200 170 300 140 C420 105 500 165 620 138 C740 112 820 168 940 140 C1060 112 1150 168 1280 140 C1350 126 1400 140 1440 132 L1440 340 L0 340Z" />
          <path className="ridge ridge--1" d="M0 150 C120 110 200 170 300 140 C420 105 500 165 620 138 C740 112 820 168 940 140 C1060 112 1150 168 1280 140 C1350 126 1400 140 1440 132" />
        </svg>
      </div>

      <div className="hero__body">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow"><span className="tick" /> Addis Ababa, Ethiopia &middot; green coffee exporter</p>
            <h1 className="hero__title">
              <span className="line"><span className="w hollow">Exceptional</span></span>
              <span className="line"><span className="w">Ethiopian Specialty Coffee,</span></span>
              <span className="line line--sub"><span className="w it">Directly from South West Ethiopia.</span></span>
            </h1>
            <p className="hero__lede">Every cup on earth traces back to a forest in south west Ethiopia. <strong>QEMAME TRADING PLC</strong> carries specialty and commercial arabica to roasters and importers who want to know exactly where their coffee began.</p>
            <div className="hero__actions">
              <a className="btn btn--gold" data-target="#about"><span>Meet the company</span><i className="btn__ico">&#8595;</i></a>
              <a className="btn btn--ghost" data-target="#contact"><span>Request samples</span></a>
            </div>
          </div>
          <div className="hero__figure" data-depth="0.16">
            <div className="hfig">
              <svg className="hfig__clip" width="0" height="0" aria-hidden="true">
                <defs>
                  <clipPath id="beanClip" clipPathUnits="objectBoundingBox">
                    <path d="M0.15,0.02 C0.35,-0.02 0.7,0.01 0.88,0.06 C0.98,0.1 1.02,0.22 0.98,0.4 C0.95,0.55 1.01,0.72 0.94,0.86 C0.86,0.98 0.68,1.02 0.5,0.98 C0.32,0.94 0.15,1.01 0.06,0.92 C-0.02,0.82 -0.01,0.62 0.04,0.46 C0.08,0.32 0.02,0.16 0.08,0.08 C0.1,0.04 0.12,0.03 0.15,0.02 Z" />
                  </clipPath>
                </defs>
              </svg>
              <figure className="hsq">
                <span className="hsq__corner hsq__corner--tl" aria-hidden="true" />
                <span className="hsq__corner hsq__corner--br" aria-hidden="true" />
                <div className="hsq__img">
                  <img src="assets/img/cherries-in-hands.jpg" width={1000} height={667} fetchPriority="high"
                    alt="Two hands cupping a heap of freshly picked red coffee cherries above a basket of cherries" />
                </div>
              </figure>
              <div className="hfig__seal" aria-hidden="true">
                <svg viewBox="0 0 140 140">
                  <defs><path id="sealpath" d="M70 70 m-52 0 a52 52 0 1 1 104 0 a52 52 0 1 1 -104 0" /></defs>
                  <text><textPath href="#sealpath" startOffset="1%">QEMAME TRADING PLC &#183; TASTE THE WORLD &#183; </textPath></text>
                </svg>
                <span className="hfig__bean">
                  <svg viewBox="0 0 40 30"><g transform="translate(20 15) rotate(-24)"><ellipse rx="17" ry="11.6" fill="#D9A441" /><path d="M-12 0C-6.4-4.6 6.4 4.6 12 0" stroke="#0B1210" strokeWidth="3.2" fill="none" strokeLinecap="round" /></g></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a className="hero__cue" data-target="#origin" aria-label="Scroll to the story"><span className="hero__cue-line" />scroll</a>
    </section>
  );
}
