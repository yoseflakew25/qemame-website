'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function PageLoader() {
  const reduce = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const done = () => {
      setTimeout(() => setExiting(true), reduce ? 60 : 420);
      setTimeout(() => setVisible(false), reduce ? 200 : 1500);
    };

    if (reduce) {
      done();
    } else {
      window.addEventListener('load', () => setTimeout(done, 500));
      const timer = setTimeout(done, 3000);
      return () => {
        window.removeEventListener('load', done);
        clearTimeout(timer);
      };
    }
  }, [reduce]);

  if (!visible) return null;

  return (
    <div
      className="page-loader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'grid',
        placeItems: 'center',
        background: 'radial-gradient(ellipse 60% 50% at 50% 45%, #0E1A14, #0B1210)',
        transition: 'opacity .8s ease, visibility .8s',
        opacity: exiting ? 0 : 1,
        visibility: exiting ? 'hidden' : 'visible',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <svg
          viewBox="0 0 80 80"
          width={80}
          height={80}
          style={{ display: 'block', margin: '0 auto 0.4rem' }}
          aria-hidden="true"
        >
          <g transform="translate(40 40) rotate(-24)">
            {/* bean body */}
            <ellipse
              rx="26"
              ry="18"
              className="loader-bean-body"
            />
            {/* center crease */}
            <path
              d="M-18 0C-9.6-7 9.6 7 18 0"
              fill="none"
              className="loader-bean-crease"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <p style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 600,
          fontSize: '1.6rem',
          color: '#D9A441',
          margin: 0,
          letterSpacing: '0.14em',
          opacity: 0,
          animation: 'loaderTextReveal .8s cubic-bezier(.2,.7,.2,1) .15s forwards',
        }}>
          QEMAME TRADING PLC
        </p>
      </div>

      <style>{`
        .loader-bean-body {
          fill: #D9A441;
          transform-origin: center;
          animation: loaderColorShift 3s ease-in-out infinite, loaderPulse 3s ease-in-out infinite;
        }
        .loader-bean-crease {
          stroke: #0B1210;
          stroke-width: 2.5;
          animation: loaderCreaseColor 3s ease-in-out infinite;
        }
        @keyframes loaderColorShift {
          0%, 100% { fill: #D9A441 }
          25%       { fill: #EBC97F }
          50%       { fill: #C9A832 }
          75%       { fill: #B8860B }
        }
        @keyframes loaderCreaseColor {
          0%, 100% { stroke: #0B1210 }
          25%       { stroke: #1A3028 }
          50%       { stroke: #2A4A34 }
          75%       { stroke: #3A6A4A }
        }
        @keyframes loaderPulse {
          0%, 100% { transform: scale(1) }
          50%       { transform: scale(1.06) }
        }
        @keyframes loaderTextReveal {
          from { opacity: 0; transform: translateY(8px); filter: blur(3px) }
          to   { opacity: 1; transform: none; filter: none }
        }
      `}</style>
    </div>
  );
}
