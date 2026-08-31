'use client';

import { useCallback, useRef, useState } from 'react';
import { REGIONS, REGION_ORDER, PROCESSES, GRADES, ROASTS } from '@/lib/coffee-data';

function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }

export default function CuppingBench() {
  const [region, setRegion] = useState('yirgacheffe');
  const [process, setProcess] = useState('washed');
  const [grade, setGrade] = useState('specialty');
  const [roastIdx, setRoastIdx] = useState(1);

  const r = REGIONS[region];
  const p = PROCESSES[process];
  const g = GRADES[grade];
  const ro = ROASTS[roastIdx];

  // Compute meters
  const base: Record<string, number> = { Acidity: r.bars.Acidity, Body: r.bars.Body, Sweetness: r.bars.Sweetness, Florality: r.bars.Floral };
  const meters: Record<string, number> = {};
  for (const k of Object.keys(base)) {
    meters[k] = clamp((base[k] + (p.d[k] || 0) + (ro.d[k] || 0)) * (g.mul[k] || 1), 4, 100);
  }

  // Compute notes
  let notes = r.notes.slice(0, 3);
  if (roastIdx >= 3) {
    notes = notes.filter((n) => !['jasmine', 'rose water', 'lemon blossom', 'bergamot', 'soft citrus', 'lemon zest'].includes(n));
  }
  notes = [...notes, ...p.notes, ...g.notes, ...ro.notes];
  if (grade === 'commercial') notes = notes.slice(2);
  notes = [...new Set(notes)];
  if (!notes.length) notes = ['roast', 'body'];
  notes = notes.slice(0, 6);

  const prefill = useCallback((text: string) => {
    const msg = document.querySelector<HTMLTextAreaElement>('#formMsg');
    const contact = document.querySelector<HTMLElement>('#contact');
    if (!msg || !contact) return;
    const cur = msg.value.trim();
    msg.value = cur && cur.indexOf(text) === -1 ? cur + '\n' + text : text;
    contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      msg.focus({ preventScroll: true });
      msg.setSelectionRange(msg.value.length, msg.value.length);
    }, 700);
  }, []);

  const handleSend = useCallback(() => {
    prefill('From the cupping bench: ' + r.name + ', ' + p.label.toLowerCase() + ', ' + g.label.toLowerCase() + ', roasted to ' + ro.name.toLowerCase() + '.');
  }, [r.name, p.label, g.label, ro.name, prefill]);

  const handleSurprise = useCallback(() => {
    const rk = REGION_ORDER[Math.floor(Math.random() * REGION_ORDER.length)];
    const pk = Object.keys(PROCESSES)[Math.floor(Math.random() * 4)];
    const rr = 1 + Math.floor(Math.random() * 2);
    const gk = Math.random() < 0.75 ? 'specialty' : 'commercial';
    setRegion(rk);
    setProcess(pk);
    setGrade(gk);
    setRoastIdx(rr);
  }, []);

  return (
    <section className="cup" id="cup">
      <div className="wrap">
        <header className="shead shead--center" data-reveal>
          <p className="shead__eyebrow"><span className="tick" /> Our Coffee Offerings</p>
          <h2 className="shead__title"><span className="hollow">Build a cup,</span><br />and we will source it.</h2>
          <p className="shead__lede">Everything here is coffee we export: five origins, washed or natural, specialty or commercial, prepared to your specification. Build a cup and send it to us.</p>
        </header>

        <div className="bench" data-reveal>
          <div className="bench__controls">
            <fieldset className="ctl ctl--wide">
              <legend><span className="ctl__n">1</span> Origin</legend>
              <div className="chips" id="cupRegions" role="radiogroup" aria-label="Origin">
                {REGION_ORDER.map((k) => (
                  <button
                    key={k}
                    className={`chip${region === k ? ' is-on' : ''}`}
                    data-region={k}
                    role="radio"
                    aria-checked={region === k}
                    onClick={() => setRegion(k)}
                  >
                    {REGIONS[k].name}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="ctl">
              <legend><span className="ctl__n">2</span> Preparation</legend>
              <div className="chips" id="cupProcess" role="radiogroup" aria-label="Preparation">
                {Object.entries(PROCESSES).map(([k, v]) => (
                  <button
                    key={k}
                    className={`chip${process === k ? ' is-on' : ''}`}
                    data-proc={k}
                    role="radio"
                    aria-checked={process === k}
                    onClick={() => setProcess(k)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <p className="ctl__hint" id="procHint">{p.hint}</p>
            </fieldset>

            <fieldset className="ctl">
              <legend><span className="ctl__n">3</span> Grade</legend>
              <div className="chips" id="cupGrades" role="radiogroup" aria-label="Grade">
                {Object.entries(GRADES).map(([k, v]) => (
                  <button
                    key={k}
                    className={`chip${grade === k ? ' is-on' : ''}`}
                    data-grade={k}
                    role="radio"
                    aria-checked={grade === k}
                    onClick={() => setGrade(k)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <p className="ctl__hint" id="gradeHint">{g.hint}</p>
            </fieldset>

            <fieldset className="ctl ctl--wide">
              <legend><span className="ctl__n">4</span> Roast level</legend>
              <input
                className="slider"
                id="roast"
                type="range"
                min="0"
                max="4"
                step="1"
                value={roastIdx}
                aria-label="Roast level"
                list="roastticks"
                onChange={(e) => setRoastIdx(parseInt(e.target.value, 10))}
              />
              <datalist id="roastticks"><option value="0" /><option value="1" /><option value="2" /><option value="3" /><option value="4" /></datalist>
              <div className="slider__labels"><span>Cinnamon</span><span>Light</span><span>City</span><span>Full city</span><span>Vienna</span></div>
              <p className="ctl__hint" id="roastHint">{ro.hint}</p>
            </fieldset>

            <div className="bench__cta">
              <button className="btn btn--gold" id="cupSend" onClick={handleSend}><span>Ask us for this cup</span><i className="btn__ico">&#8594;</i></button>
              <button className="btn btn--ghost btn--sm" id="cupSurprise" onClick={handleSurprise}><span>Surprise me</span></button>
            </div>
          </div>

          <div className="bench__stage">
            <div className="bench__cupwrap">
              <span className="bench__glow" aria-hidden="true" />
              <svg className="jebenart" viewBox="12 -12 254 292" role="img" aria-label="A jebena pouring coffee into a small handleless cup">
                <defs>
                  <linearGradient id="jbclay" x1="0.14" y1="0" x2="0.94" y2="1">
                    <stop offset="0" stopColor="#8B6914" /><stop offset="0.38" stopColor="#6B4E12" /><stop offset="1" stopColor="#3C2A0A" />
                  </linearGradient>
                  <linearGradient id="jbclay2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#7A5F1A" /><stop offset="1" stopColor="#4A3510" />
                  </linearGradient>
                  <linearGradient id="jbspout" x1="0" y1="0.9" x2="1" y2="0.1">
                    <stop offset="0" stopColor="#5C4033" /><stop offset="0.55" stopColor="#8B6914" /><stop offset="1" stopColor="#B8860B" />
                  </linearGradient>
                  <clipPath id="benchSini"><path d="M2 1 h58 v13 c0 16 -12 25 -29 25 S2 30 2 14z" /></clipPath>
                </defs>

                <ellipse className="jbn-shadow" cx="146" cy="262" rx="106" ry="9" />

                <g className="jbn-pot" transform="rotate(15 220 106)">
                  <path className="jbn-handle" d="M101 86 C68 92 50 118 53 148 C55 168 63 181 76 189" fill="none" stroke="#6B4E12" strokeWidth="14" strokeLinecap="round" />
                  <path d="M101 86 C68 92 50 118 53 148 C55 168 63 181 76 189" fill="none" stroke="#1A3028" strokeWidth="4" strokeLinecap="round" opacity=".45" />
                  <path d="M103 92 C74 98 58 120 60 146" fill="none" stroke="#C9A832" strokeWidth="3.5" strokeLinecap="round" opacity="0.22" />
                  <path className="jbn-body" d="M108 120 c34 0 59 28 59 62 c0 36 -26 58 -59 58 s-59 -22 -59 -58 c0 -34 25 -62 59 -62z" fill="url(#jbclay)" />
                  <path className="jbn-neck" d="M93 126 c2 -36 5 -58 8 -80 h14 c3 22 6 44 8 80z" fill="url(#jbclay2)" />
                  <ellipse cx="108" cy="92" rx="17" ry="4.5" fill="#8B6914" opacity="0.9" />
                  <ellipse cx="108" cy="46" rx="13" ry="4.5" fill="#7A5F1A" />
                  <ellipse cx="108" cy="46" rx="7.5" ry="2.4" fill="#0A1210" />
                  <path className="jbn-spout" d="M147 124 C170 127 193 117 212 99 L224 113 C205 140 176 154 151 157 Z" fill="url(#jbspout)" />
                  <path d="M156 131 C176 132 194 124 210 107" fill="none" stroke="#D4A44A" strokeWidth="3.2" strokeLinecap="round" opacity="0.35" />
                  <path d="M55 168 c17 10 87 10 104 0" fill="none" stroke="#D9A441" strokeWidth="5" strokeLinecap="round" />
                  <path d="M57 185 c17 10 84 10 100 0" fill="none" stroke="#D9A441" strokeWidth="3.6" strokeDasharray="4 7" strokeLinecap="round" opacity="0.9" />
                  <path d="M62 200 c15 9 75 9 90 0" fill="none" stroke="#D4A44A" strokeWidth="3.4" strokeDasharray="9 7" strokeLinecap="round" opacity="0.6" />
                  <ellipse cx="82" cy="160" rx="14" ry="28" fill="#E4EDE6" opacity="0.08" transform="rotate(-18 82 160)" />
                  <ellipse cx="106" cy="72" rx="3.6" ry="12" fill="#E4EDE6" opacity="0.09" />
                </g>

                <path className="jbn-stream" id="brewStream" d="M223 116 C229 146 231 178 229 208" fill="none" stroke={ro.colour} strokeWidth="5.5" strokeLinecap="round" />

                <g className="jbn-sini" transform="translate(198 204)">
                  <path d="M0 0 h62 v14 c0 17 -13 26 -31 26 s-31 -9 -31 -26z" fill="#E4EDE6" />
                  <g clipPath="url(#benchSini)">
                    <rect id="brewLiquid" x="-2" y="6" width="66" height="42" fill={ro.colour} />
                    <ellipse id="brewCrema" cx="31" cy="6" rx="31" ry="5" fill="#A0B86A" opacity={ro.crema} />
                  </g>
                  <path d="M0 0 h62" stroke="#D9A441" strokeWidth="2" opacity="0.55" />
                  <path d="M9 23 h44" stroke="#8AAE4A" strokeWidth="2.4" strokeDasharray="2 5" opacity="0.8" />
                </g>

                <g className="jbsteam" id="cupSteam" aria-hidden="true" style={{ '--aroma': (1.25 - roastIdx * 0.16).toFixed(2) } as React.CSSProperties}>
                  <path d="M214 196 c9 -14 -7 -22 0 -36 c5 -10 -3 -17 1 -26" />
                  <path d="M229 194 c9 -15 -7 -24 0 -40 c5 -11 -3 -19 1 -28" />
                  <path d="M244 196 c9 -14 -7 -22 0 -36 c5 -10 -3 -17 1 -26" />
                </g>
              </svg>
            </div>

            <div className="bench__read">
              <p className="bench__label" id="cupGradeLabel">{g.label}</p>
              <h3 className="bench__title" id="cupTitle">{r.name} {p.label.toLowerCase()}, {ro.name.toLowerCase()} roast</h3>
              <p className="bench__desc" id="cupDesc">{p.short} {ro.short}</p>
              <div className="bench__notes" id="cupNotes">
                {notes.map((n, i) => (
                  <span key={n} className="note" style={{ animationDelay: `${i * 60}ms` }}>{n}</span>
                ))}
              </div>
              <div className="bench__meters" id="cupMeters">
                {Object.entries(meters).map(([k, v]) => (
                  <div key={k} className="bar">
                    <span>{k}</span>
                    <span className="bar__t"><i className="bar__f" style={{ width: `${v}%` }} /></span>
                    <span className="bar__v">{Math.round(v)}</span>
                  </div>
                ))}
              </div>
              <p className="bench__brew" id="cupBrew"><b>Brew it:</b> {ro.brew}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
