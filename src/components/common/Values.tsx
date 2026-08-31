const VALUES = [
  { n: '01', title: 'Integrity', desc: 'We would rather lose an order than misdescribe a coffee. What is on the offer sheet is what goes in the bag.' },
  { n: '02', title: 'Empowerment', desc: 'Coffee should pay the people who grow it. We work with farmers so the value of a good harvest reaches the farm.' },
  { n: '03', title: 'Accountability', desc: 'If something goes wrong on a shipment, you hear it from us first, with what we are doing about it.' },
  { n: '04', title: 'Traceability', desc: 'Every coffee we sell can be followed back to where it grew. That is the whole point of buying Ethiopian.' },
  { n: '05', title: 'Collaboration', desc: 'Growers, cooperatives, buyers and us in the same conversation, rather than a chain of strangers.' },
  { n: '06', title: 'Excellence', desc: 'Quality control before the coffee leaves, not after it lands. Specialty means specialty.' },
  { n: '07', title: 'Diversity and inclusion', desc: 'Our team and our supply base are stronger for being made of different people, and we build them that way on purpose.' },
  { n: '08', title: 'Sustainability', desc: 'Methods that leave the soil, the forest and the household better able to produce next year than they were this year.' },
];

export default function Values() {
  return (
    <section className="values" id="values" aria-label="Our core values">
      <div className="wrap">
        <header className="shead shead--center" data-reveal>
          <p className="shead__eyebrow"><span className="tick" /> What we hold to</p>
          <h2 className="shead__title shead__title--sm"><span className="hollow">Eight core values,</span><br />and no small print.</h2>
        </header>
        <div className="vgrid" id="vgrid" data-reveal>
          {VALUES.map((v, i) => (
            <button key={v.n} className={`value${i === 0 ? ' is-on' : ''}`} data-value={i}>
              <span className="value__n">{v.n}</span>
              <b>{v.title}</b>
              <i>{v.desc}</i>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
