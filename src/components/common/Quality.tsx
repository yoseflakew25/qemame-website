export default function Quality() {
  return (
    <section className="quality" id="offer">
      <div className="wrap">
        <header className="shead" data-reveal>
          <p className="shead__eyebrow"><span className="tick" /> Products and services</p>
          <h2 className="shead__title"><span className="hollow">Green coffee,</span><br />and the work around it.</h2>
        </header>

        <div className="specs" data-reveal>
          <div className="specs__tabs" role="tablist" aria-label="What we offer">
            <button className="stab is-on" data-tab="products" role="tab" aria-selected="true">Products</button>
            <button className="stab" data-tab="services" role="tab" aria-selected="false">Services</button>
            <button className="stab" data-tab="market" role="tab" aria-selected="false">Who we work with</button>
            <button className="stab" data-tab="start" role="tab" aria-selected="false">How to start</button>
          </div>
          <div className="specs__body">
            <div className="spane is-on" data-pane="products">
              <dl>
                <div><dt>Washed arabica</dt><dd>Wet processed Ethiopian arabica: the clean, bright, tea like profile the country is known for.</dd></div>
                <div><dt>Natural arabica</dt><dd>Unwashed, dried whole on the cherry, for buyers who want the fruit forward Ethiopian cup.</dd></div>
                <div><dt>Specialty grade</dt><dd>Sourced from renowned Ethiopian regions: Yirgacheffe, Sidama, Guji, Geisha from Bench Maji, and Limmu.</dd></div>
                <div><dt>Commercial grade</dt><dd>Dependable Ethiopian arabica for bulk export programmes and blends.</dd></div>
                <div><dt>Special preparation</dt><dd>Screen size, sorting and preparation to your specification. Tell us the cup and the paperwork you need and we will prepare it that way.</dd></div>
              </dl>
            </div>
            <div className="spane" data-pane="services">
              <dl>
                <div><dt>Export and logistics</dt><dd>We handle the export side so a first time buyer of Ethiopian coffee does not have to learn it alone.</dd></div>
                <div><dt>Quality control and traceability</dt><dd>Coffee checked before it ships, and a record of where it came from that travels with it.</dd></div>
                <div><dt>Farmer partnerships and training</dt><dd>Long term relationships with growers, and training that improves what arrives at the washing station.</dd></div>
                <div><dt>Market access for farmers</dt><dd>Connecting Ethiopian producers to buyers they would not otherwise reach. This is half the reason the company exists.</dd></div>
              </dl>
            </div>
            <div className="spane" data-pane="market">
              <dl>
                <div><dt>Roasters and importers</dt><dd>International coffee roasters and importers looking for Ethiopian coffee with a name and a place attached to it.</dd></div>
                <div><dt>Specialty cafes</dt><dd>Cafes that want a single origin they can talk about honestly across the counter.</dd></div>
                <div><dt>Premium retail brands</dt><dd>Brands that need consistency, full traceability and ethical sourcing they can put on a pack.</dd></div>
                <div><dt>What they get</dt><dd>Green beans, private labelling and export logistics support, for buyers who value authenticity, consistency and direct relationships with producers.</dd></div>
              </dl>
            </div>
            <div className="spane" data-pane="start">
              <dl>
                <div><dt>1. Tell us the cup</dt><dd>Origin, process, grade and roughly what volume you are planning. If you are not sure, describe the cup you want and we will suggest options.</dd></div>
                <div><dt>2. Samples</dt><dd>We send samples of what we can source against your brief, so you cup before you commit.</dd></div>
                <div><dt>3. Agree the lot</dt><dd>You choose, we confirm preparation, packaging and paperwork.</dd></div>
                <div><dt>4. We export</dt><dd>Quality control, documentation and logistics out of Addis Ababa, with the file kept so you can order the same thing again.</dd></div>
              </dl>
            </div>
          </div>
        </div>

        <div className="badges" data-reveal>
          <span className="badge">Washed</span><span className="badge">Natural</span>
          <span className="badge">Specialty grade</span><span className="badge">Commercial grade</span>
          <span className="badge">Private labelling</span><span className="badge">Export logistics</span>
          <span className="badge">Traceability</span>
        </div>
      </div>
    </section>
  );
}
