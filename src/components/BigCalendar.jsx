import { MONTHS, DAYS, MONTH_THEMES } from "../constants";
import { buildCalendarCells, getHoliday } from "../utils";
import ImgBtn from "./ImgBtn";

export default function BigCalendar({ year, month, selectedDate, onSelect, today, events, photo, onMonthPhoto, onAllPhoto, onRemovePhoto }) {
  const theme = MONTH_THEMES[month];
  const cells = buildCalendarCells(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Photo Header */}
      <div
        className="relative rounded-2xl overflow-hidden flex-shrink-0"
        style={{ height: photo ? 200 : 100, background: photo ? "transparent" : `${theme.accent}0d`, border: `1.5px dashed ${theme.accent}30`, transition: "height .4s ease" }}
      >
        {photo && (
          <>
            <img src={photo} alt="month cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${theme.bg}dd 0%, transparent 55%, ${theme.bg}88 100%)` }} />
          </>
        )}
        <div className="absolute inset-0 flex items-center px-5 gap-4 flex-wrap">
          <div>
            <p className="text-xs font-black tracking-widest uppercase" style={{ color: theme.accent, opacity: 0.65 }}>{theme.name} · {year}</p>
            <h2 className="text-5xl font-black text-white tracking-tighter leading-none drop-shadow-xl">{MONTHS[month]}</h2>
          </div>
          <div className="ml-auto flex flex-col gap-2 items-end">
            <ImgBtn label={`Photo for ${MONTHS[month]}`} icon="🖼️" accent={theme.accent} bg={theme.bg} onImage={onMonthPhoto} glow={false} />
            <ImgBtn label="Apply to ALL Months" icon="✨" accent={theme.accent} bg={theme.bg} onImage={onAllPhoto} glow={true} />
            {photo && (
              <button
                onClick={onRemovePhoto}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-black text-xs tracking-widest uppercase hover:scale-105 transition-all"
                style={{ background: "#ff444420", color: "#ff8888", border: "1.5px solid #ff444430" }}
              >
                🗑️ Remove Photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-black tracking-widest uppercase py-1" style={{ color: theme.accent, opacity: 0.5 }}>{d}</div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-1 flex-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="rounded-xl" style={{ background: "#ffffff04" }} />;
          const isToday = today.year === year && today.month === month && today.day === day;
          const isSel = selectedDate?.year === year && selectedDate?.month === month && selectedDate?.day === day;
          const holiday = getHoliday(year, month, day);
          const dayEv = events.filter((e) => e.year === year && e.month === month && e.day === day);
          const dow = (firstDay + day - 1) % 7;
          const isWknd = dow === 0 || dow === 6;
          return (
            <button
              key={i}
              onClick={() => onSelect({ year, month, day })}
              className="relative rounded-xl p-1.5 flex flex-col items-start transition-all duration-200 hover:scale-[1.04] text-left"
              style={{
                minHeight: 68,
                background: isSel ? theme.accent : isToday ? `${theme.accent}22` : "#ffffff08",
                border: isToday && !isSel ? `1.5px solid ${theme.accent}` : isSel ? "none" : "1px solid #ffffff0a",
              }}
            >
              <span className="text-sm font-black" style={{ color: isSel ? theme.bg : isToday ? theme.accent : isWknd ? `${theme.accent}cc` : "#ffffff80" }}>{day}</span>
              {holiday && <span className="leading-tight font-bold truncate w-full mt-0.5" style={{ color: isSel ? theme.bg : theme.accent, opacity: 0.9, fontSize: 8 }}>🎉 {holiday}</span>}
              {dayEv.slice(0, 2).map((ev, ei) => (
                <span key={ei} className="rounded px-1 truncate w-full font-semibold mt-0.5" style={{ background: isSel ? `${theme.bg}44` : `${theme.accent}33`, color: isSel ? theme.bg : theme.accent, fontSize: 8 }}>{ev.text}</span>
              ))}
              {dayEv.length > 2 && <span style={{ color: theme.accent, opacity: 0.6, fontSize: 7 }}>+{dayEv.length - 2} more</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
