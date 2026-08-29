export default function Loader() {
  return (
    <div className="loader" id="loader" aria-hidden="true">
      {/* Background glow */}
      <div className="loader__glow" />

      <div className="loader__inner">
        {/* Coffee bean SVG */}
        <svg className="loader__bean" viewBox="0 0 80 80" aria-hidden="true">
          <defs>
            <radialGradient id="beanGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5E8A64" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#5E8A64" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Glow behind bean */}
          {/* <circle cx="40" cy="40" r="36" fill="url(#beanGlow)" className="loader__bean-glow" /> */}
          {/* Bean outline */}
          <g transform="translate(40 40) rotate(-24)">
            <ellipse
              className="loader__bean-outline"
              rx="26"
              ry="18"
              fill="none"
              stroke="#5E8A64"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Center crease */}
            {/* <path
              className="loader__bean-crease"
              d="M-18 0C-10-6 10 6 18 0"
              fill="none"
              stroke="#5E8A64"
              strokeWidth="2"
              strokeLinecap="round"
            /> */}
          </g>
        </svg>

        {/* Brand name */}
        <div className="loader__text">
          <p className="loader__word">QEMAME TRADING PLC</p>
        </div>

       
      </div>

      {/* Split panels */}
      <div className="loader__panel loader__panel--l" />
      <div className="loader__panel loader__panel--r" />
    </div>
  );
}
