import MiniCalendar from "./MiniCalendar";

export default function YearView({ viewYear, selectedDate, today, events, photos, onMonthClick, onSelectDate }) {
  const months = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div>
      <h2 className="text-4xl font-black text-white mb-6 tracking-tighter opacity-80">{viewYear}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {months.map((i) => (
          <div key={i} onClick={() => onMonthClick(i)} className="cursor-pointer hover:scale-[1.02] transition-transform duration-200">
            <MiniCalendar
              year={viewYear} month={i}
              selectedDate={selectedDate}
              onSelect={(d) => { onSelectDate(d); onMonthClick(i); }}
              today={today} events={events} photo={photos[i]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
