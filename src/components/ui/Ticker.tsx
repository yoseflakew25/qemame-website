const ITEMS = [
  { text: 'QEMAME TRADING PLC', am: false },
  { text: 'taste the world', am: false },
  { text: 'Yirgacheffe', am: false },
  { text: 'Sidama', am: false },
  { text: 'Guji', am: false },
  { text: 'Geisha from Bench Maji', am: false },
  { text: 'Limmu', am: false },
  { text: 'washed and natural', am: false },
  { text: 'specialty and commercial', am: false },
  { text: 'ቡና', am: true },
] as const;

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {ITEMS.map((item, i) => [
          <span key={`a-${i}`} lang={item.am ? 'am' : undefined}>{item.text}</span>,
          <span key={`ad-${i}`} className="d" />,
        ])}
        {ITEMS.map((item, i) => [
          <span key={`b-${i}`} lang={item.am ? 'am' : undefined}>{item.text}</span>,
          <span key={`bd-${i}`} className="d" />,
        ])}
      </div>
    </div>
  );
}
