export interface Region {
  name: string;
  am: string;
  zone: string;
  alt: string;
  top: string;
  harvest: string;
  process: string;
  varieties: string;
  avail: string;
  story: string;
  notes: string[];
  bars: Record<string, number>;
}

export interface Process {
  label: string;
  hint: string;
  short: string;
  notes: string[];
  d: Record<string, number>;
}

export interface Grade {
  label: string;
  hint: string;
  line: string;
  notes: string[];
  mul: Record<string, number>;
}

export interface Roast {
  name: string;
  hint: string;
  colour: string;
  crema: number;
  notes: string[];
  d: Record<string, number>;
  brew: string;
  short: string;
}

export const REGIONS: Record<string, Region> = {
  yirgacheffe: {
    name: 'Yirgacheffe', am: 'ይርጋጨፌ', zone: 'Gedeo Zone, southern Ethiopia',
    alt: '1,900 to 2,200 m', top: '2,200', harvest: 'November to January', process: 'Washed and natural',
    varieties: 'Local heirloom (Kurume, Dega, Wolisho)', avail: 'washed and natural',
    story: 'The name every filter drinker already knows. Cool nights on the Gedeo escarpment slow the cherry down until the sugars are dense, and the washed lots come out of the cup like tea with flowers in it. If a buyer has only ever had one Ethiopian coffee, it was probably this one.',
    notes: ['jasmine', 'bergamot', 'lemon blossom', 'white peach', 'black tea'],
    bars: { Floral: 95, Citrus: 88, Berry: 42, Body: 48, Sweetness: 78, Acidity: 90 },
  },
  sidama: {
    name: 'Sidama', am: 'ሲዳማ', zone: 'Sidama Region, southern Ethiopia',
    alt: '1,800 to 2,200 m', top: '2,200', harvest: 'November to January', process: 'Washed and natural',
    varieties: 'Heirloom, Kurume dominant', avail: 'washed and natural',
    story: 'Sidama is dense with very small farms, often less than half a hectare, and cherry arrives at the station carried by hand. Washed Sidama is the workhorse of a good filter programme: bright, structured and repeatable across a season, which is exactly what a roaster with a menu to fill needs.',
    notes: ['lemon zest', 'black tea', 'brown sugar', 'apricot', 'clean finish'],
    bars: { Floral: 74, Citrus: 86, Berry: 55, Body: 58, Sweetness: 80, Acidity: 86 },
  },
  guji: {
    name: 'Guji', am: 'ጉጂ', zone: 'Guji Zone, Oromia',
    alt: '1,950 to 2,350 m', top: '2,350', harvest: 'November to February', process: 'Natural and washed',
    varieties: 'Heirloom landrace and JARC selections', avail: 'natural and washed',
    story: 'Guji sat inside the Sidama name until buyers tasted it on its own and refused to give it back. Some of the highest coffee in the country grows here, and a natural dried slowly at that altitude tastes like somebody put fruit in the cup on purpose. This is the origin competition buyers ask for by name.',
    notes: ['strawberry', 'mango', 'rose water', 'raspberry', 'syrupy body'],
    bars: { Floral: 82, Citrus: 60, Berry: 96, Body: 80, Sweetness: 92, Acidity: 78 },
  },
  geisha: {
    name: 'Geisha', am: 'ጌሻ', zone: 'Bench Maji and Kaffa, south west Ethiopia',
    alt: '1,600 to 2,100 m', top: '2,100', harvest: 'November to January', process: 'Natural and washed',
    varieties: 'Forest landrace, the original Geisha among them', avail: 'natural and washed',
    story: 'The variety the world pays the most for was collected from these forests in the 1930s, long before it ever reached Panama. Coffee still grows here under a canopy nobody planted, and the genetic diversity on one hillside outruns whole producing countries. This is the origin we are proudest to source from.',
    notes: ['jasmine', 'bergamot', 'tropical fruit', 'sweet spice', 'tea like'],
    bars: { Floral: 96, Citrus: 84, Berry: 62, Body: 52, Sweetness: 82, Acidity: 88 },
  },
  limmu: {
    name: 'Limmu', am: 'ሊሙ', zone: 'Limmu, Jimma Zone, Oromia',
    alt: '1,400 to 2,000 m', top: '2,000', harvest: 'November to January', process: 'Washed',
    varieties: 'Heirloom with JARC selections', avail: 'washed, natural on request',
    story: 'Limmu is the diplomat of Ethiopian coffee: balanced, soft, winey, never shouting. It is what we suggest to roasters whose customers found Yirgacheffe too loud, and it holds its fruit in milk, which makes it a quietly useful espresso component.',
    notes: ['apricot', 'soft citrus', 'honey', 'almond', 'winey finish'],
    bars: { Floral: 62, Citrus: 70, Berry: 58, Body: 66, Sweetness: 82, Acidity: 68 },
  },
};

export const REGION_ORDER = ['yirgacheffe', 'sidama', 'guji', 'geisha', 'limmu'] as const;

export const PROCESSES: Record<string, Process> = {
  washed: {
    label: 'Washed',
    hint: 'Wet processed and soaked. One of our two standard exports, and the classic clean, tea like Ethiopian profile.',
    short: 'Fully washed, so you taste the terroir and nothing the process added.',
    notes: ['crisp acidity', 'clean finish'],
    d: { Acidity: 12, Body: -8, Sweetness: -4, Florality: 10 },
  },
  natural: {
    label: 'Natural',
    hint: 'Unwashed: whole cherry dried on raised beds. Our other standard export, fruit forward and harder to do without faults.',
    short: 'Dried whole on the bed, so the fruit goes into the bean rather than off it.',
    notes: ['jammy fruit', 'wine edge'],
    d: { Acidity: -8, Body: 16, Sweetness: 14, Florality: -4 },
  },
  honey: {
    label: 'Honey',
    hint: 'Dried with the mucilage on. Special preparation, arranged to order.',
    short: 'Dried with the mucilage on: rounder than washed, cleaner than natural.',
    notes: ['panela sweetness', 'round mouthfeel'],
    d: { Acidity: 0, Body: 8, Sweetness: 10, Florality: 2 },
  },
  anaerobic: {
    label: 'Anaerobic',
    hint: 'Sealed tank fermentation. Special preparation, small volumes, for buyers who want something to talk about.',
    short: 'Sealed tank fermentation takes it a long way from the classical profile.',
    notes: ['cherry cola', 'lychee', 'bold funk'],
    d: { Acidity: -4, Body: 12, Sweetness: 18, Florality: 6 },
  },
};

export const GRADES: Record<string, Grade> = {
  specialty: {
    label: 'Specialty grade',
    hint: 'Specialty grade from a named region, cupped and kept traceable. What a single origin menu is built on.',
    line: 'Specialty grade, so it keeps its region and its paper trail all the way to your warehouse.',
    notes: [],
    mul: {},
  },
  commercial: {
    label: 'Commercial grade',
    hint: 'Dependable Ethiopian arabica for bulk export and blending. Quieter in the cup, easier on the price, available in volume.',
    line: 'Commercial grade, for blends and bulk programmes: quieter in the cup, friendlier on the price.',
    notes: ['nutty', 'cocoa'],
    mul: { Acidity: 0.82, Body: 1.12, Sweetness: 0.9, Florality: 0.55 },
  },
};

export const ROASTS: Roast[] = [
  {
    name: 'Cinnamon', hint: 'Too light. Underdeveloped, sharp and grassy: the sugars never got going. We would send this back.',
    colour: '#9A6B3C', crema: 0.45, notes: ['sour', 'grassy', 'papery'],
    d: { Acidity: 18, Body: -22, Sweetness: -26, Florality: -10 },
    brew: 'A long V60 at 96 degrees, and forgiveness.',
    short: 'At cinnamon roast it never develops: sour and cereal. Two notches darker.',
  },
  {
    name: 'Light', hint: 'Where most Ethiopian lots want to live. The florals and the fruit acids survive the roast intact.',
    colour: '#6B3A1C', crema: 0.34, notes: [],
    d: { Acidity: 8, Body: -6, Sweetness: 4, Florality: 12 },
    brew: 'Pour over, 1:16, 93 degrees, three minutes.',
    short: 'A light roast keeps every one of those aromatics intact.',
  },
  {
    name: 'City', hint: 'The fruit turns from fresh to cooked and caramel comes forward. Very safe for a wide audience.',
    colour: '#54290F', crema: 0.3, notes: ['caramel', 'orange marmalade'],
    d: { Acidity: 0, Body: 6, Sweetness: 10, Florality: -8 },
    brew: 'Batch brew at 1:17, or filter espresso 1:2.5.',
    short: 'City roast trades florality for caramel and a wider audience.',
  },
  {
    name: 'Full city', hint: 'Body over brightness. Chocolate and baked fruit, florals mostly gone. Works in milk.',
    colour: '#3F2213', crema: 0.24, notes: ['cocoa', 'baked plum'],
    d: { Acidity: -14, Body: 16, Sweetness: 4, Florality: -24 },
    brew: 'Espresso 1:2 in 26 to 30 seconds, or French press.',
    short: 'Full city buries the top notes under caramelisation. Good in milk.',
  },
  {
    name: 'Vienna', hint: 'Roast character dominates the origin. Honest answer: do not spend Guji money to taste roast.',
    colour: '#22120A', crema: 0.16, notes: ['dark chocolate', 'smoke', 'roast'],
    d: { Acidity: -26, Body: 22, Sweetness: -8, Florality: -36 },
    brew: 'Moka pot, or espresso with milk.',
    short: 'At Vienna the roast is doing the talking, not the farm.',
  },
];
