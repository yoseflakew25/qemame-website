export default function Navigation() {
  return (
    <header className="nav" id="nav">
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
      <button className="nav__burger" id="burger" aria-label="Open menu" aria-expanded="false">
        <span /><span /><span />
      </button>
    </header>
  );
}
