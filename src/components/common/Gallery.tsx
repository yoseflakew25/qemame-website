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

export default function Gallery() {
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
                <img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" />
              </div>
              <figcaption><span className="gtile__n">{img.num}</span> {img.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="gcar" data-reveal>
          <div className="gcar__head">
            <p className="gcar__label"><span className="tick" /> More from the chain</p>
            <div className="gcar__nav">
              <button className="gcar__btn" id="galPrev" aria-label="Previous photographs">&#8592;</button>
              <button className="gcar__btn" id="galNext" aria-label="Next photographs">&#8594;</button>
            </div>
          </div>
          <div className="gcar__track" id="galTrack" tabIndex={0} role="group" aria-label="More photographs, scroll sideways">
            {CAROUSEL_IMAGES.map(img => (
              <figure key={img.num} className="gslide">
                <div className="gslide__img">
                  <img src={img.src} alt={img.alt} width={760} height={520} loading="lazy" />
                </div>
                <figcaption><span className="gtile__n">{img.num}</span> {img.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="gcar__dots" id="galDots" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
