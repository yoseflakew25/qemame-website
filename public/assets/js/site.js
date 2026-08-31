/* =============================================================
   QEMAME TRADING PLC - interactions
   ============================================================= */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // tells the stylesheet it is allowed to hide things before revealing them.
  // without this class every section renders visible, script or no script.
  document.documentElement.classList.add('js');

  /* ---------------- data ---------------- */
  var REGIONS = {
    yirgacheffe: {
      name: 'Yirgacheffe', am: 'ይርጋጨፌ', zone: 'Gedeo Zone, southern Ethiopia',
      alt: '1,900 to 2,200 m', top: '2,200', harvest: 'November to January', process: 'Washed and natural',
      varieties: 'Local heirloom (Kurume, Dega, Wolisho)', avail: 'washed and natural',
      story: 'The name every filter drinker already knows. Cool nights on the Gedeo escarpment slow the cherry down until the sugars are dense, and the washed lots come out of the cup like tea with flowers in it. If a buyer has only ever had one Ethiopian coffee, it was probably this one.',
      notes: ['jasmine', 'bergamot', 'lemon blossom', 'white peach', 'black tea'],
      bars: { Floral: 95, Citrus: 88, Berry: 42, Body: 48, Sweetness: 78, Acidity: 90 }
    },
    sidama: {
      name: 'Sidama', am: 'ሲዳማ', zone: 'Sidama Region, southern Ethiopia',
      alt: '1,800 to 2,200 m', top: '2,200', harvest: 'November to January', process: 'Washed and natural',
      varieties: 'Heirloom, Kurume dominant', avail: 'washed and natural',
      story: 'Sidama is dense with very small farms, often less than half a hectare, and cherry arrives at the station carried by hand. Washed Sidama is the workhorse of a good filter programme: bright, structured and repeatable across a season, which is exactly what a roaster with a menu to fill needs.',
      notes: ['lemon zest', 'black tea', 'brown sugar', 'apricot', 'clean finish'],
      bars: { Floral: 74, Citrus: 86, Berry: 55, Body: 58, Sweetness: 80, Acidity: 86 }
    },
    guji: {
      name: 'Guji', am: 'ጉጂ', zone: 'Guji Zone, Oromia',
      alt: '1,950 to 2,350 m', top: '2,350', harvest: 'November to February', process: 'Natural and washed',
      varieties: 'Heirloom landrace and JARC selections', avail: 'natural and washed',
      story: 'Guji sat inside the Sidama name until buyers tasted it on its own and refused to give it back. Some of the highest coffee in the country grows here, and a natural dried slowly at that altitude tastes like somebody put fruit in the cup on purpose. This is the origin competition buyers ask for by name.',
      notes: ['strawberry', 'mango', 'rose water', 'raspberry', 'syrupy body'],
      bars: { Floral: 82, Citrus: 60, Berry: 96, Body: 80, Sweetness: 92, Acidity: 78 }
    },
    geisha: {
      name: 'Geisha', am: 'ጌሻ', zone: 'Bench Maji and Kaffa, south west Ethiopia',
      alt: '1,600 to 2,100 m', top: '2,100', harvest: 'November to January', process: 'Natural and washed',
      varieties: 'Forest landrace, the original Geisha among them', avail: 'natural and washed',
      story: 'The variety the world pays the most for was collected from these forests in the 1930s, long before it ever reached Panama. Coffee still grows here under a canopy nobody planted, and the genetic diversity on one hillside outruns whole producing countries. This is the origin we are proudest to source from.',
      notes: ['jasmine', 'bergamot', 'tropical fruit', 'sweet spice', 'tea like'],
      bars: { Floral: 96, Citrus: 84, Berry: 62, Body: 52, Sweetness: 82, Acidity: 88 }
    },
    limmu: {
      name: 'Limmu', am: 'ሊሙ', zone: 'Limmu, Jimma Zone, Oromia',
      alt: '1,400 to 2,000 m', top: '2,000', harvest: 'November to January', process: 'Washed',
      varieties: 'Heirloom with JARC selections', avail: 'washed, natural on request',
      story: 'Limmu is the diplomat of Ethiopian coffee: balanced, soft, winey, never shouting. It is what we suggest to roasters whose customers found Yirgacheffe too loud, and it holds its fruit in milk, which makes it a quietly useful espresso component.',
      notes: ['apricot', 'soft citrus', 'honey', 'almond', 'winey finish'],
      bars: { Floral: 62, Citrus: 70, Berry: 58, Body: 66, Sweetness: 82, Acidity: 68 }
    }
  };
  var REGION_ORDER = ['yirgacheffe', 'sidama', 'guji', 'geisha', 'limmu'];

  var PROCESS = {
    washed: { label: 'Washed', hint: 'Wet processed and soaked. One of our two standard exports, and the classic clean, tea like Ethiopian profile.', short: 'Fully washed, so you taste the terroir and nothing the process added.',
      notes: ['crisp acidity', 'clean finish'], d: { Acidity: 12, Body: -8, Sweetness: -4, Florality: 10 } },
    natural: { label: 'Natural', hint: 'Unwashed: whole cherry dried on raised beds. Our other standard export, fruit forward and harder to do without faults.', short: 'Dried whole on the bed, so the fruit goes into the bean rather than off it.',
      notes: ['jammy fruit', 'wine edge'], d: { Acidity: -8, Body: 16, Sweetness: 14, Florality: -4 } },
    honey: { label: 'Honey', hint: 'Dried with the mucilage on. Special preparation, arranged to order.', short: 'Dried with the mucilage on: rounder than washed, cleaner than natural.',
      notes: ['panela sweetness', 'round mouthfeel'], d: { Acidity: 0, Body: 8, Sweetness: 10, Florality: 2 } },
    anaerobic: { label: 'Anaerobic', hint: 'Sealed tank fermentation. Special preparation, small volumes, for buyers who want something to talk about.', short: 'Sealed tank fermentation takes it a long way from the classical profile.',
      notes: ['cherry cola', 'lychee', 'bold funk'], d: { Acidity: -4, Body: 12, Sweetness: 18, Florality: 6 } }
  };

  var GRADES = {
    specialty: {
      label: 'Specialty grade',
      hint: 'Specialty grade from a named region, cupped and kept traceable. What a single origin menu is built on.',
      line: 'Specialty grade, so it keeps its region and its paper trail all the way to your warehouse.',
      notes: [], mul: {}
    },
    commercial: {
      label: 'Commercial grade',
      hint: 'Dependable Ethiopian arabica for bulk export and blending. Quieter in the cup, easier on the price, available in volume.',
      line: 'Commercial grade, for blends and bulk programmes: quieter in the cup, friendlier on the price.',
      notes: ['nutty', 'cocoa'], mul: { Acidity: 0.82, Body: 1.12, Sweetness: 0.9, Florality: 0.55 }
    }
  };

  var ROASTS = [
    { name: 'Cinnamon', hint: 'Too light. Underdeveloped, sharp and grassy: the sugars never got going. We would send this back.',
      colour: '#9A6B3C', crema: 0.45, notes: ['sour', 'grassy', 'papery'], d: { Acidity: 18, Body: -22, Sweetness: -26, Florality: -10 },
      brew: 'A long V60 at 96 degrees, and forgiveness.',
      short: 'At cinnamon roast it never develops: sour and cereal. Two notches darker.' },
    { name: 'Light', hint: 'Where most Ethiopian lots want to live. The florals and the fruit acids survive the roast intact.',
      colour: '#6B3A1C', crema: 0.34, notes: [], d: { Acidity: 8, Body: -6, Sweetness: 4, Florality: 12 },
      brew: 'Pour over, 1:16, 93 degrees, three minutes.',
      short: 'A light roast keeps every one of those aromatics intact.' },
    { name: 'City', hint: 'The fruit turns from fresh to cooked and caramel comes forward. Very safe for a wide audience.',
      colour: '#54290F', crema: 0.3, notes: ['caramel', 'orange marmalade'], d: { Acidity: 0, Body: 6, Sweetness: 10, Florality: -8 },
      brew: 'Batch brew at 1:17, or filter espresso 1:2.5.',
      short: 'City roast trades florality for caramel and a wider audience.' },
    { name: 'Full city', hint: 'Body over brightness. Chocolate and baked fruit, florals mostly gone. Works in milk.',
      colour: '#3F2213', crema: 0.24, notes: ['cocoa', 'baked plum'], d: { Acidity: -14, Body: 16, Sweetness: 4, Florality: -24 },
      brew: 'Espresso 1:2 in 26 to 30 seconds, or French press.',
      short: 'Full city buries the top notes under caramelisation. Good in milk.' },
    { name: 'Vienna', hint: 'Roast character dominates the origin. Honest answer: do not spend Guji money to taste roast.',
      colour: '#22120A', crema: 0.16, notes: ['dark chocolate', 'smoke', 'roast'], d: { Acidity: -26, Body: 22, Sweetness: -8, Florality: -36 },
      brew: 'Moka pot, or espresso with milk.',
      short: 'At Vienna the roast is doing the talking, not the farm.' }
  ];

  /* ---------------- loader ---------------- */
  (function () {
    var loader = $('#loader');
    if (!loader) return;
    var done = function () {
      setTimeout(function () { document.body.classList.add('loaded'); }, reduce ? 60 : 420);
    };
    if (reduce) { done(); }
    else {
      window.addEventListener('load', function () { setTimeout(done, 500); });
      setTimeout(done, 2600);
    }
  })();



  /* ---------------- progress + nav ---------------- */
  (function () {
    var pbar = $('#progress i'), nav = $('#nav'), burger = $('#burger'), links = $$('[data-nav]'), totop = $('#totop');
    var last = 0, atFooter = false, ticking = false;
    var onScroll = function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var y = window.scrollY;
        var h = document.documentElement.scrollHeight - window.innerHeight;
        if (pbar) pbar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
        if (nav) {
          nav.classList.toggle('stuck', y > 40);
          if (!nav.classList.contains('open')) nav.classList.toggle('hide', y > last && y > 380);
        }
        if (totop) totop.classList.toggle('on', y > 900 && !atFooter);
        last = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // the floating button steps aside for the large type footer
    var footEl = $('.foot');
    if (footEl && 'IntersectionObserver' in window) {
      var giant = $('.foot__giant');
      new IntersectionObserver(function (ents) {
        atFooter = ents[0].isIntersecting;
        // the wordmark sits inside the bottom 12% the reveal observer ignores,
        // so it gets its own trigger
        if (giant && atFooter) giant.classList.add('in');
        onScroll();
      }, { rootMargin: '0px' }).observe(footEl);
    }

    // smooth scroll for data-target links
    $$('[data-target]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var t = $(a.getAttribute('data-target'));
        if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
    });

    if (burger && nav) {
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
      });
      $$('.nav__links a').forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
        });
      });
    }
    if (totop) totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

    var sections = links.map(function (a) { return $(a.getAttribute('data-target')); }).filter(Boolean);
    if ('IntersectionObserver' in window && sections.length) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-target') === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { io.observe(s); });
    }
    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  })();

  /* ---------------- reveal + counters ---------------- */
  (function () {
    var els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });

    var counters = $$('[data-count]');
    var cio = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        var el = en.target;
        var target = parseFloat(el.getAttribute('data-target') || el.getAttribute('data-count'));
        var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
        var suf = el.getAttribute('data-suffix') || '';
        var group = el.getAttribute('data-group') !== '0';
        if (reduce) {
          el.textContent = (group ? target.toLocaleString('en-US', { minimumFractionDigits: dec }) : String(target)) + suf;
          return;
        }
        var start = performance.now(), dur = 1600;
        (function step(now) {
          var t = clamp((now - start) / dur, 0, 1);
          var e = 1 - Math.pow(1 - t, 3);
          var v = target * e;
          el.textContent = (dec ? v.toFixed(dec)
            : (group ? Math.round(v).toLocaleString('en-US') : String(Math.round(v)))) + suf;
          if (t < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { cio.observe(c); });
  })();

  /* ---------------- hero: parallax ---------------- */
  (function () {
    var hero = $('#hero');
    if (!hero || reduce) return;

    var layers = $$('[data-depth]', hero);
    var tx = 0, ty = 0, cx = 0, cy = 0, rafId = 0;
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!rafId) rafId = requestAnimationFrame(pl);
    });
    function pl() {
      rafId = 0;
      cx = lerp(cx, tx, 0.06); cy = lerp(cy, ty, 0.06);
      if (Math.abs(cx - tx) < 0.001 && Math.abs(cy - ty) < 0.001) return;
      layers.forEach(function (l) {
        var d = parseFloat(l.getAttribute('data-depth')) || 0.1;
        l.style.transform = 'translate3d(' + (-cx * d * 46) + 'px,' + (-cy * d * 22) + 'px,0)';
      });
      rafId = requestAnimationFrame(pl);
    }
  })();

  /* ---------------- the legend: scroll driven ---------------- */
  (function () {
    var sec = $('#origin'); if (!sec) return;
    var beats = $$('.beat', sec), dots = $$('.ldot', sec), cur = -1;
    function apply(p) {
      sec.style.setProperty('--p', p.toFixed(4));
      sec.classList.toggle('dance', p > 0.22 && p < 0.62);
      var i = clamp(Math.floor(p * 4.02), 0, 3);
      if (i !== cur) {
        cur = i;
        beats.forEach(function (b, n) { b.classList.toggle('is-on', n === i); });
        dots.forEach(function (d, n) { d.classList.toggle('is-on', n === i); });
      }
    }
    if (reduce) { apply(0.75); beats.forEach(function (b) { b.classList.add('is-on'); }); return; }
    var ticking = false, cachedTotal = 0;
    function recalcTotal() { cachedTotal = sec.offsetHeight - window.innerHeight; }
    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var r = sec.getBoundingClientRect();
        var p = clamp(-r.top / (cachedTotal || 1), 0, 1);
        apply(p);
      });
    }
    recalcTotal();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { recalcTotal(); onScroll(); });
    onScroll();
    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        var n = parseInt(d.getAttribute('data-goto'), 10);
        var target = sec.offsetTop + cachedTotal * ((n + 0.42) / 4);
        window.scrollTo({ top: target, behavior: 'smooth' });
      });
    });
  })();

  /* ---------------- terroir map ---------------- */
  var setRegion;
  (function () {
    var card = $('#lotcard'); if (!card) return;
    var groups = $$('.rg');
    var fields = {
      am: $('#lcAm'), name: $('#lcName'), zone: $('#lcZone'), score: $('#lcScore'), story: $('#lcStory'),
      alt: $('#lcAlt'), harvest: $('#lcHarvest'), process: $('#lcProcess'), varieties: $('#lcVar'),
      notes: $('#lcNotes'), bars: $('#lcBars'), lot: $('#lcLot'), ask: $('#lcAsk')
    };
    var active = 'yirgacheffe';
    setRegion = function (key, scrollCard) {
      var r = REGIONS[key]; if (!r) return;
      active = key;
      groups.forEach(function (g) { g.classList.toggle('is-on', g.getAttribute('data-region') === key); });
      fields.am.textContent = r.am;
      fields.name.textContent = r.name;
      fields.zone.textContent = r.zone;
      fields.score.textContent = r.top;
      fields.story.textContent = r.story;
      fields.alt.textContent = r.alt;
      fields.harvest.textContent = r.harvest;
      fields.process.textContent = r.process;
      fields.varieties.textContent = r.varieties;
      fields.lot.textContent = r.avail;
      fields.ask.setAttribute('data-sample-region', key);
      fields.notes.innerHTML = '';
      r.notes.forEach(function (n, i) {
        var s = document.createElement('span');
        s.className = 'note'; s.textContent = n;
        s.style.animationDelay = (i * 70) + 'ms';
        fields.notes.appendChild(s);
      });
      fields.bars.innerHTML = '';
      Object.keys(r.bars).forEach(function (k) {
        var row = document.createElement('div');
        row.className = 'bar';
        row.innerHTML = '<span>' + k + '</span><span class="bar__t"><i class="bar__f"></i></span><span class="bar__v">' + r.bars[k] + '</span>';
        fields.bars.appendChild(row);
      });
      requestAnimationFrame(function () {
        $$('.bar__f', fields.bars).forEach(function (f, i) {
          var v = Object.keys(r.bars).map(function (k) { return r.bars[k]; })[i];
          setTimeout(function () { f.style.width = v + '%'; }, 60 + i * 60);
        });
      });
      card.classList.remove('flash');
      requestAnimationFrame(function () { requestAnimationFrame(function () { card.classList.add('flash'); }); });
      if (scrollCard && window.innerWidth < 1080) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    groups.forEach(function (g) {
      var key = g.getAttribute('data-region');
      g.addEventListener('click', function () { setRegion(key, true); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setRegion(key, true); }
      });
    });
    setRegion('yirgacheffe', false);
    if (fields.ask) fields.ask.addEventListener('click', function () {
      prefill('We are interested in ' + REGIONS[active].name + ' (' + REGIONS[active].avail + ').');
    });
  })();

  /* ---------------- shared: prefill the request form ---------------- */
  function prefill(text) {
    var msg = $('#formMsg'), contact = $('#contact');
    if (!msg || !contact) return;
    var cur = msg.value.trim();
    msg.value = cur && cur.indexOf(text) === -1 ? cur + '\n' + text : text;
    contact.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () {
      msg.focus({ preventScroll: true });
      msg.setSelectionRange(msg.value.length, msg.value.length);
    }, reduce ? 0 : 700);
  }

  /* ---------------- build a cup ---------------- */
  (function () {
    var host = $('#cupRegions'); if (!host) return;
    var procWrap = $('#cupProcess'), gradeWrap = $('#cupGrades'), roast = $('#roast');
    var elTitle = $('#cupTitle'), elDesc = $('#cupDesc'), elNotes = $('#cupNotes'), elMeters = $('#cupMeters'),
      elBrew = $('#cupBrew'), elProcHint = $('#procHint'), elGradeHint = $('#gradeHint'),
      elGradeLabel = $('#cupGradeLabel'), elRoastHint = $('#roastHint'),
      liquid = $('#brewLiquid'), crema = $('#brewCrema'), stream = $('#brewStream'), steam = $('#cupSteam');
    var state = { region: 'yirgacheffe', process: 'washed', grade: 'specialty', roast: 1 };

    REGION_ORDER.forEach(function (k) {
      var b = document.createElement('button');
      b.className = 'chip' + (k === state.region ? ' is-on' : '');
      b.setAttribute('data-region', k);
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', k === state.region ? 'true' : 'false');
      b.textContent = REGIONS[k].name;
      host.appendChild(b);
    });

    function meterRow(label, v) {
      return '<div class="bar"><span>' + label + '</span><span class="bar__t"><i class="bar__f" style="width:' + v + '%"></i></span><span class="bar__v">' + Math.round(v) + '</span></div>';
    }

    function render() {
      var r = REGIONS[state.region], p = PROCESS[state.process], g = GRADES[state.grade], ro = ROASTS[state.roast];
      var base = { Acidity: r.bars.Acidity, Body: r.bars.Body, Sweetness: r.bars.Sweetness, Florality: r.bars.Floral };
      var m = {};
      Object.keys(base).forEach(function (k) {
        m[k] = clamp((base[k] + (p.d[k] || 0) + (ro.d[k] || 0)) * (g.mul[k] || 1), 4, 100);
      });

      elTitle.textContent = r.name + ' ' + p.label.toLowerCase() + ', ' + ro.name.toLowerCase() + ' roast';

      var notes = r.notes.slice(0, 3);
      if (state.roast >= 3) notes = notes.filter(function (n) {
        return ['jasmine', 'rose water', 'lemon blossom', 'bergamot', 'soft citrus', 'lemon zest'].indexOf(n) === -1;
      });
      notes = notes.concat(p.notes).concat(g.notes).concat(ro.notes);
      if (state.grade === 'commercial') notes = notes.slice(2);
      notes = notes.filter(function (n, i) { return notes.indexOf(n) === i; });
      if (!notes.length) notes = ['roast', 'body'];
      elNotes.innerHTML = notes.slice(0, 6).map(function (n, i) {
        return '<span class="note" style="animation-delay:' + (i * 60) + 'ms">' + n + '</span>';
      }).join('');

      elDesc.textContent = p.short + ' ' + ro.short;

      elMeters.innerHTML = meterRow('Acidity', m.Acidity) + meterRow('Body', m.Body) + meterRow('Sweetness', m.Sweetness) + meterRow('Florality', m.Florality);
      elBrew.innerHTML = '<b>Brew it:</b> ' + ro.brew;
      elProcHint.textContent = p.hint;
      if (elGradeHint) elGradeHint.textContent = g.hint;
      if (elGradeLabel) elGradeLabel.textContent = g.label;
      elRoastHint.textContent = ro.hint;
      liquid.setAttribute('fill', ro.colour);
      if (stream) stream.setAttribute('stroke', ro.colour);
      crema.setAttribute('opacity', ro.crema);
      if (steam) steam.style.setProperty('--aroma', (1.25 - state.roast * 0.16).toFixed(2));
    }

    host.addEventListener('click', function (e) {
      var b = e.target.closest('[data-region]'); if (!b) return;
      state.region = b.getAttribute('data-region');
      $$('.chip', host).forEach(function (c) {
        var on = c === b; c.classList.toggle('is-on', on); c.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      render();
    });
    procWrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-proc]'); if (!b) return;
      state.process = b.getAttribute('data-proc');
      $$('.chip', procWrap).forEach(function (c) {
        var on = c === b; c.classList.toggle('is-on', on); c.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      render();
    });
    if (gradeWrap) gradeWrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-grade]'); if (!b) return;
      state.grade = b.getAttribute('data-grade');
      $$('.chip', gradeWrap).forEach(function (c) {
        var on = c === b; c.classList.toggle('is-on', on); c.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      render();
    });
    roast.addEventListener('input', function () { state.roast = parseInt(roast.value, 10); render(); });

    var surprise = $('#cupSurprise');
    if (surprise) surprise.addEventListener('click', function () {
      var rk = REGION_ORDER[Math.floor(Math.random() * REGION_ORDER.length)];
      var pk = Object.keys(PROCESS)[Math.floor(Math.random() * 4)];
      var rr = 1 + Math.floor(Math.random() * 2);
      var gk = Math.random() < 0.75 ? 'specialty' : 'commercial';
      state.region = rk; state.process = pk; state.grade = gk; state.roast = rr;
      roast.value = rr;
      $$('.chip', host).forEach(function (c) {
        var on = c.getAttribute('data-region') === rk; c.classList.toggle('is-on', on); c.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      $$('.chip', procWrap).forEach(function (c) {
        var on = c.getAttribute('data-proc') === pk; c.classList.toggle('is-on', on); c.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      if (gradeWrap) $$('.chip', gradeWrap).forEach(function (c) {
        var on = c.getAttribute('data-grade') === gk; c.classList.toggle('is-on', on); c.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      render();
      if (typeof setRegion === 'function') setRegion(rk, false);
    });

    var send = $('#cupSend');
    if (send) send.addEventListener('click', function () {
      var r = REGIONS[state.region];
      prefill('From the cupping bench: ' + r.name + ', ' + PROCESS[state.process].label.toLowerCase() + ', ' +
        GRADES[state.grade].label.toLowerCase() + ', roasted to ' + ROASTS[state.roast].name.toLowerCase() + '.');
    });

    render();
  })();

  /* ---------------- core values ---------------- */
  (function () {
    var grid = $('#vgrid'); if (!grid) return;
    var items = $$('.value', grid);
    items.forEach(function (b) {
      b.addEventListener('click', function () {
        items.forEach(function (x) { x.classList.toggle('is-on', x === b); });
      });
      b.addEventListener('mouseenter', function () {
        if (window.matchMedia('(pointer:fine)').matches) {
          items.forEach(function (x) { x.classList.toggle('is-on', x === b); });
        }
      });
    });
  })();

  /* ---------------- spec tabs ---------------- */
  (function () {
    var tabs = $$('.stab'), panes = $$('.spane');
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var k = t.getAttribute('data-tab');
        tabs.forEach(function (x) { x.classList.toggle('is-on', x === t); x.setAttribute('aria-selected', x === t ? 'true' : 'false'); });
        panes.forEach(function (p) { p.classList.toggle('is-on', p.getAttribute('data-pane') === k); });
      });
    });
  })();

  /* ---------------- gallery carousel ---------------- */
  (function () {
    var track = $('#galTrack'); if (!track) return;
    var slides = $$('.gslide', track), dotsWrap = $('#galDots'),
      prev = $('#galPrev'), next = $('#galNext');
    if (!slides.length) return;
    var auto = null, userTook = false, cachedStep = 0;

    function recalcStep() {
      var gap = parseFloat(getComputedStyle(track).gap) || 16;
      cachedStep = slides[0].getBoundingClientRect().width + gap;
    }
    recalcStep();
    window.addEventListener('resize', recalcStep);
    function maxScroll() { return track.scrollWidth - track.clientWidth; }
    function index() { return Math.round(track.scrollLeft / cachedStep); }
    function go(i, smooth) {
      var last = slides.length - 1;
      var target = clamp(i, 0, last) * cachedStep;
      if (target > maxScroll()) target = maxScroll();
      track.scrollTo({ left: target, behavior: (smooth && !reduce) ? 'smooth' : 'auto' });
    }

    slides.forEach(function (_, n) {
      var d = document.createElement('button');
      d.className = 'gcar__dot' + (n === 0 ? ' is-on' : '');
      d.setAttribute('aria-label', 'Photograph ' + (n + 1));
      d.addEventListener('click', function () { stopAuto(); go(n, true); });
      dotsWrap.appendChild(d);
    });
    var dots = $$('.gcar__dot', dotsWrap);

    function sync() {
      var i = index();
      dots.forEach(function (d, n) { d.classList.toggle('is-on', n === i); });
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= maxScroll() - 2;
    }
    var raf = null;
    track.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = null; sync(); });
    }, { passive: true });

    if (prev) prev.addEventListener('click', function () { stopAuto(); go(index() - 1, true); });
    if (next) next.addEventListener('click', function () { stopAuto(); go(index() + 1, true); });

    // it advances on its own until the visitor takes over, then it stays put
    function stopAuto() { userTook = true; clearInterval(auto); auto = null; }
    function startAuto() {
      if (reduce || userTook || auto) return;
      auto = setInterval(function () {
        if (document.hidden) return;
        var i = track.scrollLeft >= maxScroll() - 2 ? 0 : index() + 1;
        go(i, true);
      }, 5200);
    }
    ['pointerdown', 'wheel', 'keydown', 'touchstart'].forEach(function (ev) {
      track.addEventListener(ev, stopAuto, { passive: true });
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) startAuto(); else { clearInterval(auto); auto = null; }
      }, { threshold: 0.35 }).observe(track);
    }
    track.addEventListener('mouseenter', function () { clearInterval(auto); auto = null; });
    track.addEventListener('mouseleave', startAuto);
    window.addEventListener('resize', sync);
    sync();
  })();

  /* ---------------- form ---------------- */
  (function () {
    var form = $('#form'); if (!form) return;
    var done = $('#formDone'), mail = $('#formMail'), doneMsg = $('#formDoneMsg');
    function bad(field, is) { field.closest('.field').classList.toggle('bad', is); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name=name]');
      var email = form.querySelector('[name=email]');
      var msg = form.querySelector('[name=message]');
      var ok = true;
      if (!name.value.trim()) { bad(name, true); ok = false; } else bad(name, false);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { bad(email, true); ok = false; } else bad(email, false);
      if (!msg.value.trim()) { bad(msg, true); ok = false; } else bad(msg, false);
      if (!ok) { form.querySelector('.field.bad input, .field.bad textarea').focus(); return; }

      var data = new FormData(form);
      var body = 'Name: ' + data.get('name') + '\nCompany: ' + (data.get('company') || '-') +
        '\nCountry: ' + (data.get('country') || '-') + '\nVolume: ' + data.get('volume') +
        '\nGrade: ' + data.get('grade') + '\nSamples: ' + (data.get('samples') ? 'yes' : 'no') +
        '\n\n' + data.get('message');
      if (mail) mail.href = 'mailto:qemame009@gmail.com?subject=' +
        encodeURIComponent('Coffee enquiry from ' + data.get('name')) + '&body=' + encodeURIComponent(body);
      if (doneMsg) doneMsg.textContent = 'Thank you, ' + String(data.get('name')).split(' ')[0] +
        '. We have your request and will come back to you from Addis Ababa with options, samples and pricing.';
      if (done) done.hidden = false;
    });
    $$('input, textarea', form).forEach(function (f) {
      f.addEventListener('input', function () { bad(f, false); });
    });
  })();

})();
