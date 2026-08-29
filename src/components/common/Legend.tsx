export default function Legend() {
  return (
    <section className="legend" id="origin" style={{ '--p': '0' } as React.CSSProperties}>
      <div className="legend__stage">
        <div className="legend__sky" aria-hidden="true">
          <div className="sky sky--night" />
          <div className="sky sky--dawn" />
          <div className="sky sky--day" />
          <svg className="legend__stars" viewBox="0 0 1000 400" aria-hidden="true">
            <g fill="#E4EDE6">
              <circle cx="80" cy="60" r="1.8" /><circle cx="180" cy="120" r="1.2" /><circle cx="260" cy="40" r="2.1" />
              <circle cx="340" cy="150" r="1.4" /><circle cx="430" cy="70" r="1.7" /><circle cx="520" cy="130" r="1.1" />
              <circle cx="610" cy="50" r="2" /><circle cx="700" cy="140" r="1.5" /><circle cx="790" cy="80" r="1.3" />
              <circle cx="880" cy="120" r="1.9" /><circle cx="950" cy="46" r="1.4" /><circle cx="140" cy="200" r="1.1" />
              <circle cx="620" cy="210" r="1.2" /><circle cx="410" cy="230" r="1" /><circle cx="860" cy="220" r="1.5" />
            </g>
          </svg>
          <div className="legend__moon" />
          <div className="legend__sun" />
        </div>

        <svg className="legend__scene" viewBox="0 0 1000 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <g className="sc-far">
            <path d="M0 380 C90 330 130 360 200 336 C280 308 330 358 420 336 C510 314 560 360 650 338 C740 316 800 358 880 338 C930 326 970 342 1000 334 L1000 560 L0 560Z" fill="#2C3126" />
          </g>
          <path className="sc-hill" d="M0 430 C160 384 300 440 460 414 C620 388 760 440 900 416 C950 408 980 418 1000 412 L1000 560 L0 560Z" fill="#3A4231" />

          <g className="sc-tree" transform="translate(700 432)">
            <path className="trunk" d="M0 0 C-4 -40 -8 -70 -2 -104 C2 -128 6 -140 0 -160" fill="none" stroke="#2A4A34" strokeWidth="11" strokeLinecap="round" />
            <path className="branch" d="M-1 -70 C-40 -86 -60 -104 -78 -128 M-1 -96 C34 -110 58 -128 74 -152 M-1 -122 C-30 -134 -46 -150 -58 -170" fill="none" stroke="#2A4A34" strokeWidth="6" strokeLinecap="round" />
            <g className="canopy">
              <ellipse cx="0" cy="-168" rx="96" ry="62" fill="#4C5A3E" />
              <ellipse cx="-56" cy="-136" rx="62" ry="42" fill="#434E38" />
              <ellipse cx="60" cy="-140" rx="60" ry="40" fill="#526343" />
              <ellipse cx="0" cy="-196" rx="58" ry="36" fill="#5E7048" />
            </g>
            <g className="fruit">
              <circle cx="-70" cy="-124" r="7" /><circle cx="-40" cy="-160" r="6" /><circle cx="-12" cy="-196" r="7" />
              <circle cx="26" cy="-172" r="6" /><circle cx="58" cy="-132" r="7" /><circle cx="80" cy="-160" r="6" />
              <circle cx="6" cy="-140" r="6" /><circle cx="-88" cy="-166" r="6" /><circle cx="40" cy="-206" r="6" />
            </g>
          </g>

          <g className="sc-kaldi" transform="translate(250 470)">
            <path d="M0 0 L0 -46" stroke="#1A3028" strokeWidth="9" strokeLinecap="round" />
            <path className="kaldi-arm" d="M0 -38 L26 -58" stroke="#1A3028" strokeWidth="7" strokeLinecap="round" />
            <path d="M0 -38 L-20 -56" stroke="#1A3028" strokeWidth="7" strokeLinecap="round" />
            <path d="M0 0 L-12 22 M0 0 L14 22" stroke="#1A3028" strokeWidth="8" strokeLinecap="round" />
            <circle cx="0" cy="-58" r="13" fill="#1A3028" />
            <path d="M-16 -46 L16 -46 L8 -8 L-8 -8Z" fill="#D9A441" opacity="0.92" />
            <path className="kaldi-staff" d="M28 -62 L34 26" stroke="#3A6A4A" strokeWidth="4" strokeLinecap="round" />
          </g>

          <g className="sc-goats">
            <g transform="translate(360 496)"><g className="goat goat--1"><use href="#goat" /></g></g>
            <g transform="translate(440 502)"><g className="goat goat--2"><use href="#goat" /></g></g>
            <g transform="translate(512 492)"><g className="goat goat--3"><use href="#goat" /></g></g>
          </g>

          <g className="sc-monk" transform="translate(892 486)">
            <path d="M0 0 C-22 0 -26 -34 -18 -52 C-12 -66 12 -66 18 -52 C26 -34 22 0 0 0Z" fill="#E4EDE6" />
            <circle cx="0" cy="-62" r="12" fill="#1E3428" />
            <path d="M-18 -52 C-6 -44 6 -44 18 -52" fill="none" stroke="#8AAE4A" strokeWidth="4" />
            <g className="monk-pot" transform="translate(-40 -16)">
              <path d="M0 0c9 0 14 9 14 20s-6 18-14 18-14-7-14-18S-9 0 0 0z" fill="#1E3428" />
              <path d="M-5 -10h10l-2 12h-6z" fill="#1E3428" />
            </g>
            <g className="monk-flame" transform="translate(-40 26)">
              <path d="M0 -14 C8 -6 10 0 6 6 C3 10 -3 10 -6 6 C-10 0 -8 -6 0 -14Z" fill="#9AB844" />
              <path d="M0 -6 C4 -1 5 2 3 5 C1 8 -1 8 -3 5 C-5 2 -4 -1 0 -6Z" fill="#F2C14E" />
            </g>
          </g>

          <path className="sc-grass" d="M0 520 C120 500 200 528 320 512 C440 496 520 528 640 514 C760 500 840 528 960 512 C980 509 992 512 1000 510 L1000 560 L0 560Z" fill="#262B21" />

          <defs>
            <g id="goat">
              <path d="M-22 0 L-22 -18 C-22 -28 -10 -32 0 -32 C12 -32 22 -28 22 -18 L22 0" fill="#E4EDE6" />
              <path d="M-18 0 L-18 12 M-6 0 L-6 12 M6 0 L6 12 M18 0 L18 12" stroke="#E4EDE6" strokeWidth="5" strokeLinecap="round" />
              <circle cx="26" cy="-34" r="10" fill="#E4EDE6" />
              <path d="M30 -42 C38 -50 42 -46 40 -40 M22 -42 C16 -50 12 -46 14 -40" fill="none" stroke="#C8B79C" strokeWidth="3" strokeLinecap="round" />
              <path d="M-22 -12 C-32 -14 -34 -4 -28 2" fill="none" stroke="#E4EDE6" strokeWidth="4" strokeLinecap="round" />
              <circle cx="30" cy="-34" r="1.8" fill="#1A3028" />
            </g>
          </defs>
        </svg>

        <div className="legend__copy">
          <p className="legend__kicker">The legend of Kaldi &middot; Kaffa forest, around the ninth century</p>
          <div className="legend__beats">
            <blockquote className="beat is-on" data-beat="0">
              <span className="beat__n">01</span>
              <p>In the wild forest of <b>Kaffa</b>, where coffee still grows unplanted under the canopy, a young goat herder called <b>Kaldi</b> walked his flock home at dusk.</p>
            </blockquote>
            <blockquote className="beat" data-beat="1">
              <span className="beat__n">02</span>
              <p>One evening the goats refused to sleep. They had eaten the crimson cherries of a low, glossy tree, and they <b>danced until the stars turned</b>.</p>
            </blockquote>
            <blockquote className="beat" data-beat="2">
              <span className="beat__n">03</span>
              <p>Kaldi carried the cherries to a monastery. A monk cast them into the fire, then rescued the fragrant beans, ground them, and steeped them in water. <b>The prayers ran all night.</b></p>
            </blockquote>
            <blockquote className="beat" data-beat="3">
              <span className="beat__n">04</span>
              <p>From that fire the drink crossed to Yemen, Cairo, Venice, Vienna, and every city with a window and a chair. <b>It began here. It still begins here.</b></p>
            </blockquote>
          </div>
          <div className="legend__dots" role="tablist" aria-label="Story chapters">
            <button className="ldot is-on" data-goto="0" aria-label="Chapter 1" />
            <button className="ldot" data-goto="1" aria-label="Chapter 2" />
            <button className="ldot" data-goto="2" aria-label="Chapter 3" />
            <button className="ldot" data-goto="3" aria-label="Chapter 4" />
          </div>
        </div>
      </div>
    </section>
  );
}
