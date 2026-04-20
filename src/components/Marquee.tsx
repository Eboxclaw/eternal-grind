interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}

export function Marquee({ items, reverse, className = "", itemClassName = "" }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-pause overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-flex w-max gap-12 ${reverse ? "animate-marquee-r" : "animate-marquee"}`}>
        {doubled.map((t, i) => (
          <span
            key={i}
            className={`font-mono text-sm uppercase tracking-[0.25em] ${itemClassName}`}
          >
            {t} <span className="text-ink">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
