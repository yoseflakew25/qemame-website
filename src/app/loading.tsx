export default function Loading() {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,#0E1A14,#0B1210)]">
      <div className="text-center">
        <svg
          viewBox="0 0 80 80"
          width={80}
          height={80}
          className="mx-auto mb-4 block"
          aria-hidden="true"
        >
          <g transform="translate(40 40) rotate(-24)">
            <ellipse
              rx="26"
              ry="18"
              fill="none"
              stroke="#5E8A64"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-bean-draw"
            />
          </g>
        </svg>
        <p className="font-serif text-[1.6rem] font-semibold tracking-[0.16em] text-[#D9A441]">
          QEMAME TRADING PLC
        </p>
      </div>
    </div>
  );
}