export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__art" aria-hidden="true"><span lang="am">ቡና</span></div>
      <div className="wrap">
        <header className="shead" data-reveal>
          <p className="shead__eyebrow"><span className="tick" /> About us</p>
          <h2 className="shead__title"><span className="hollow">Our Origin </span><br /> &amp; Heritage,</h2>
        </header>

        <article className="feature feature--intro" data-reveal>
          <div className="feature__copy">
            <p className="feature__kicker">Who we are</p>
            <h3>A coffee export company<br />out of Addis Ababa.</h3>
            <p>QEMAME TRADING PLC is a new and ambitious coffee export company based in Ethiopia, prepared to supply high quality green coffee beans, both specialty and commercial, from Ethiopia&apos;s highlands to the international market.</p>
          </div>
          <div className="feature__art" aria-hidden="true">
            <svg viewBox="0 0 160 160" fill="none">
              <g className="feature__ring">
                <circle cx="80" cy="80" r="72" stroke="#D9A441" strokeWidth="1" strokeDasharray="3 9" opacity="0.4" />
              </g>
              <circle cx="80" cy="80" r="54" stroke="#D9A441" strokeWidth="1.4" opacity="0.75" />
              <ellipse cx="80" cy="80" rx="20" ry="54" stroke="#D9A441" strokeWidth="1" opacity="0.42" />
              <ellipse cx="80" cy="80" rx="40" ry="54" stroke="#D9A441" strokeWidth="1" opacity="0.26" />
              <path d="M26 80h108" stroke="#D9A441" strokeWidth="1" opacity="0.42" />
              <path d="M34 54h92M34 106h92" stroke="#D9A441" strokeWidth="1" opacity="0.22" />
              <g transform="translate(80 80) rotate(-24)">
                <ellipse rx="27" ry="18" stroke="#8AAE4A" strokeWidth="2" fill="rgba(138,174,74,.14)" />
                <path d="M-19 0C-10-7.4 10 7.4 19 0" stroke="#8AAE4A" strokeWidth="2.2" strokeLinecap="round" />
              </g>
              <path d="M80 2v12M80 146v12M2 80h12M146 80h12" stroke="#D9A441" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
            </svg>
          </div>
        </article>

        <div className="about__grid">
          <div className="about__copy" data-reveal>
            <p>We take pride in providing exceptional quality and flavour by sourcing our beans from Ethiopia&apos;s well known highlands, particularly the resource rich <b>Bench Maji</b> region in the south west, home to the world famous <b>Geisha</b> coffee.</p>
            <p>The company was founded in <b>2025</b> and works out of Addis Ababa, the city where Ethiopia&apos;s coffee trade meets the road to the port. Being new means we have no old habits to defend: every relationship we build, with a grower or with a buyer, is one we intend to keep.</p>
            <ul className="about__quick">
              <li><span>Company</span><b>QEMAME TRADING PLC</b></li>
              <li><span>Founded</span><b>2025</b></li>
              <li><span>Headquarters</span><b>Addis Ababa, Ethiopia</b></li>
              <li><span>Business</span><b>Green coffee export, specialty and commercial</b></li>
            </ul>
          </div>

          <div className="mv">
            <article className="mv__card" data-reveal>
              <p className="mv__label"><span className="tick" /> Our mission</p>
              <p>At QEMAME, we strive to bridge the gap between Ethiopia&apos;s best coffee growers and the worldwide market by providing high quality, ethically sourced coffee with integrity and excellence. We are committed to empowering local farmers, promoting sustainable methods and highlighting Ethiopia&apos;s rich coffee legacy to the world, one cup at a time.</p>
            </article>
            <article className="mv__card mv__card--alt" data-reveal>
              <p className="mv__label"><span className="tick" /> Our vision</p>
              <p>To empower Ethiopian farmers, provide high quality coffee worldwide, and promote sustainable commerce that benefits communities and preserves our rich heritage.</p>
            </article>
          </div>
        </div>

        <article className="feature feature--geisha" data-reveal>
          <div className="feature__art" aria-hidden="true">
            <svg viewBox="0 0 160 160" fill="none">
              <g className="feature__ring">
                <circle cx="80" cy="80" r="72" stroke="#D9A441" strokeWidth="1" strokeDasharray="3 9" opacity="0.4" />
                <circle cx="80" cy="80" r="60" stroke="#8AAE4A" strokeWidth="1" strokeDasharray="12 9" opacity="0.5" />
              </g>
              <circle cx="80" cy="80" r="48" stroke="#D9A441" strokeWidth="1.4" opacity="0.6" />
              <g transform="translate(80 80) rotate(-24)">
                <ellipse rx="31" ry="21" stroke="#D9A441" strokeWidth="2.2" fill="rgba(217,164,65,.12)" />
                <path d="M-22 0C-12-8.4 12 8.4 22 0" stroke="#D9A441" strokeWidth="2.4" strokeLinecap="round" />
              </g>
              <path d="M80 2v12M80 146v12M2 80h12M146 80h12" stroke="#D9A441" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
              <path d="M26 26l8 8M134 26l-8 8M26 134l8-8M134 134l-8-8" stroke="#8AAE4A" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
            </svg>
          </div>
          <div className="feature__copy">
            <p className="feature__kicker">Bench Maji, south west Ethiopia</p>
            <h3>Where Geisha comes from.</h3>
            <p>The variety the world now calls Geisha was collected from a forest in south west Ethiopia in the 1930s. It travelled to Kenya, to Tanzania, to Costa Rica, and became the most talked about coffee on earth once it was replanted in Panama. Its home never moved. It is still here, in the forests of Bench Maji, and it is one of the reasons we source where we source.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
