export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact__grid">
        <div className="contact__copy" data-reveal>
          <p className="shead__eyebrow"><span className="tick" /> Get in touch</p>
          <h2 className="shead__title"><span className="hollow">Tell us what you</span><br />want to taste.</h2>
          <p className="shead__lede">Tell us the coffee you are looking for: origin, process, grade and volume. If you are not sure yet, describe the cup you want and we will come back with options and samples. We answer from Addis Ababa, in English or Amharic.</p>

          <ul className="contact__list">
            <li><span>Company</span><b>QEMAME TRADING PLC</b></li>
            <li><span>Email</span><b><a href="mailto:qemame009@gmail.com">qemame009@gmail.com</a></b></li>
            <li><span>Phone</span><b><a href="tel:+251903250000">+251 903 250 000</a></b></li>
            <li><span>Phone</span><b><a href="tel:+251911292819">+251 911 292 819</a></b></li>
            <li><span>Located</span><b>Addis Ababa, Ethiopia</b></li>
          </ul>
          <p className="contact__ps">Buyers, roasters, importers and cafes are all welcome, and so are Ethiopian growers and cooperatives looking for a route to market.</p>
        </div>

        <form className="form" id="form" noValidate data-reveal>
          <div className="form__row">
            <label className="field"><span>Your name</span><input type="text" name="name" required autoComplete="name" placeholder="Sara Bekele" /><i className="field__err">Please tell us your name</i></label>
            <label className="field"><span>Company</span><input type="text" name="company" autoComplete="organization" placeholder="Roastery or importer" /></label>
          </div>
          <div className="form__row">
            <label className="field"><span>Email</span><input type="email" name="email" required autoComplete="email" placeholder="you@roastery.com" /><i className="field__err">We need a valid email to reply</i></label>
            <label className="field"><span>Destination country</span><input type="text" name="country" autoComplete="country-name" placeholder="Germany" /></label>
          </div>
          <div className="form__row">
            <label className="field"><span>Annual volume</span>
              <select name="volume" defaultValue="1 to 5 tonnes">
                <option value="Under 1 tonne">Under 1 tonne</option>
                <option value="1 to 5 tonnes">1 to 5 tonnes</option>
                <option value="5 to 20 tonnes">5 to 20 tonnes</option>
                <option value="A full container or more">A full container or more</option>
                <option value="Still deciding">Still deciding</option>
              </select>
            </label>
            <label className="field"><span>Grade</span>
              <select name="grade" defaultValue="Specialty grade"><option value="Specialty grade">Specialty grade</option><option value="Commercial grade">Commercial grade</option><option value="Both">Both</option><option value="Not sure yet">Not sure yet</option></select>
            </label>
          </div>
          <label className="field"><span>What are you looking for?</span><textarea name="message" rows={5} id="formMsg" required placeholder="Washed Yirgacheffe for a filter programme, and something from Bench Maji for a limited release." /><i className="field__err">A sentence is enough</i></label>
          <label className="check"><input type="checkbox" name="samples" defaultChecked={true} /><span>Send samples with the reply</span></label>
          <button className="btn btn--gold btn--wide" type="submit"><span>Send the request</span><i className="btn__ico">&#8594;</i></button>
          <p className="form__note">No newsletter, no list. One person reads this and answers it.</p>

          <div className="form__done" id="formDone" hidden>
            <svg className="form__seal" viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#D9A441" strokeWidth="3" className="seal-ring" />
              <path className="seal-check" d="M38 62 l14 15 l31 -35" fill="none" stroke="#D9A441" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3>Message received.</h3>
            <p id="formDoneMsg">We have your request and will come back to you from Addis Ababa with options, samples and pricing.</p>
            <a className="btn btn--ghost btn--sm" id="formMail" href="#"><span>Also send it as an email</span></a>
          </div>
        </form>
      </div>
    </section>
  );
}
