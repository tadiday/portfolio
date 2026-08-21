import { getMonthLabels, levelStyles, type ActivityWeek } from "./contribution-utils";

export default function ContributionGraph({ weeks, unit }: { weeks: ActivityWeek[]; unit: "contribution" | "submission" }) {
  const months = getMonthLabels(weeks);
  const columns = `repeat(${weeks.length}, minmax(10px, 1fr))`;

  return (
    <div className="overflow-x-auto pb-1">
      <div className="min-w-[685px] w-full">
        <div className="mb-2 grid h-3 gap-[3px] font-mono text-[8px] uppercase text-[var(--text-muted)]" style={{ gridTemplateColumns: columns }}>
          {months.map(({ label, weekIndex }) => (
            <span key={`${label}-${weekIndex}`} className="whitespace-nowrap" style={{ gridColumnStart: weekIndex + 1 }}>{label}</span>
          ))}
        </div>
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: columns }}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
              {week.days.map((day) => {
                const label = `${day.count} ${unit}${day.count === 1 ? "" : "s"} on ${new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" })}`;
                return (
                  <span key={day.date} aria-label={label} title={label} className="aspect-square w-full rounded-[2px] transition-[filter,outline-color] duration-150 hover:brightness-125 hover:outline hover:outline-1 hover:outline-[var(--text-primary)]" style={{ backgroundColor: levelStyles[day.level], gridRowStart: new Date(`${day.date}T00:00:00Z`).getUTCDay() + 1 }} />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
