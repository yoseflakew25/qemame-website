export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'grid',
      placeItems: 'center',
      background: 'radial-gradient(ellipse 60% 50% at 50% 45%, #0E1A14, #0B1210)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <svg
          viewBox="0 0 80 80"
          width={80}
          height={80}
          style={{ display: 'block', margin: '0 auto 1rem' }}
          aria-hidden="true"
        >
          <g transform="translate(40 40) rotate(-24)">
            <ellipse
              rx="26"
              ry="18"
              fill="none"
              stroke="#5E8A64"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                strokeDasharray: 140,
                strokeDashoffset: 140,
                animation: 'loaderBeanDraw 2s cubic-bezier(.4,0,.2,1) infinite',
              }}
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
        @keyframes loaderBeanDraw {
          0%   { stroke-dashoffset: 140 }
          50%  { stroke-dashoffset: 0 }
          100% { stroke-dashoffset: -140 }
        }
        @keyframes loaderTextReveal {
          from { opacity: 0; transform: translateY(8px); filter: blur(3px) }
          to   { opacity: 1; transform: none; filter: none }
        }
      `}</style>
    </div>
  );
}