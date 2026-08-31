const MEMBERS = [
  { name: 'Eyuel Takele Woldyohannes', role: 'Chief Executive Officer', note: 'Direction of the company and its grower partnerships.', img: 'assets/img/team/Eyuel Takele Woldyohannes.jpg', w: 400, h: 500 },
  { name: 'Biruktawit Tefera Moges', role: 'Human Resources', note: 'The team, and the people we work with along the chain.', img: 'assets/img/team/Biruktawit.jpg', w: 400, h: 500 },
  { name: 'Mahider Tefera Moges', role: 'Accountant', note: 'Contracts, invoices and the numbers behind a shipment.', img: 'assets/img/team/Mahider.jpg', w: 400, h: 500 },
  { name: 'Yemisrach Getachew Mamo', role: 'Export Manager', note: 'Export documentation and shipments, start to arrival.', img: 'assets/img/team/misir.jpg', w: 400, h: 500 },
];

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="wrap">
        <header className="shead shead--center" data-reveal>
          <p className="shead__eyebrow"><span className="tick" /> Our team</p>
          <h2 className="shead__title"><span className="hollow">Meet</span><br />Our Team.</h2>
        </header>

        <div className="tgrid">
          {MEMBERS.map(m => (
            <article key={m.name} className="tcard" data-reveal>
              <div className="tcard__photo"><img src={m.img} alt={m.name} width={m.w} height={m.h} loading="lazy" decoding="async" /></div>
              <h3>{m.name}</h3>
              <p className="tcard__role">{m.role}</p>
              <p className="tcard__note">{m.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
