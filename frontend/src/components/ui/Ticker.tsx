export default function Ticker() {
  const items = [
    'QEMAME TRADING PLC', 'taste the world', 'Yirgacheffe', 'Sidama',
    'Guji', 'Geisha from Bench Maji', 'Limmu', 'washed and natural',
    'specialty and commercial', 'ቡና',
  ];

  const track = items.flatMap((item, i) => [
    <span key={`t-${i}`} lang={i === items.length - 1 ? 'am' : undefined}>{item}</span>,
    <span key={`d-${i}`} className="d" />,
  ]);

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {track}{/* duplicated for seamless loop */}
        {track}
      </div>
    </div>
  );
}
