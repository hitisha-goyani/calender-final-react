import { MONTHS, MONTH_THEMES, HOLIDAYS } from "../constants";
import { getHoliday } from "../utils";
import ImgBtn from "./ImgBtn";

export default function Sidebar({ viewYear, viewMonth, selectedDate, events, photos, onMonthPhoto, onAllPhoto, onRemovePhoto, onAddEventClick, onRemoveEvent, onSelectDate }) {
  const theme = MONTH_THEMES[viewMonth];
  const currentPhoto = photos[viewMonth];

  const selHoliday = selectedDate ? getHoliday(selectedDate.year, selectedDate.month, selectedDate.day) : null;
  const selEvents = selectedDate ? events.filter((e) => e.year === selectedDate.year && e.month === selectedDate.month && e.day === selectedDate.day) : [];

  const holidays = Object.entries(HOLIDAYS)
    .filter(([k]) => k.startsWith(`${viewYear}-${viewMonth + 1}-`))
    .map(([k, v]) => ({ day: parseInt(k.split("-")[2]), name: v }))
    .sort((a, b) => a.day - b.day);

  const monthEvents = events.filter((e) => e.year === viewYear && e.month === viewMonth).sort((a, b) => a.day - b.day);

  return (
    <aside className="h-full overflow-y-auto" style={{ width: 272, borderRight: `1px solid ${theme.accent}18`, background: `${theme.bg}ee`, backdropFilter: "blur(16px)" }}>
      <div className="p-4 space-y-4">

        {/* Photo Upload */}
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${theme.accent}33` }}>
          {currentPhoto ? (
            <div className="relative h-32">
              <img src={currentPhoto} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 35%, #000000cc)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-2 flex gap-1.5 flex-wrap">
                <ImgBtn label="Change" icon="🔄" accent={theme.accent} bg={theme.bg} onImage={onMonthPhoto} glow={false} />
                <button onClick={onRemovePhoto} className="px-2 py-1.5 rounded-lg text-xs font-black" style={{ background: "#ff444420", color: "#ff8888", border: "1px solid #ff444430" }}>🗑️</button>
              </div>
            </div>
          ) : (
            <div className="p-3 space-y-2" style={{ background: `${theme.accent}0d` }}>
              <p className="text-xs font-black tracking-widest uppercase" style={{ color: theme.accent, opacity: 0.6 }}>Month Photo</p>
              <ImgBtn label={`Add for ${MONTHS[viewMonth]}`} icon="🖼️" accent={theme.accent} bg={theme.bg} onImage={onMonthPhoto} glow={false} />
              <ImgBtn label="Apply to All Months" icon="✨" accent={theme.accent} bg={theme.bg} onImage={onAllPhoto} glow={true} />
            </div>
          )}
        </div>

        {/* Selected Day */}
        {selectedDate && (
          <div className="rounded-2xl p-4" style={{ background: `${theme.accent}18`, border: `1px solid ${theme.accent}33` }}>
            <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: theme.accent }}>Selected</p>
            <p className="text-2xl font-black text-white">{selectedDate.day}</p>
            <p className="text-sm font-semibold text-white opacity-70">{MONTHS[selectedDate.month]} {selectedDate.year}</p>
            {selHoliday && <p className="text-xs mt-1 font-bold" style={{ color: theme.accent }}>🎉 {selHoliday}</p>}
            <button onClick={onAddEventClick} className="mt-3 w-full py-2 rounded-xl text-xs font-black tracking-widest uppercase hover:opacity-80 transition-opacity" style={{ background: theme.accent, color: theme.bg }}>+ Add Event</button>
            {selEvents.map((ev, i) => (
              <div key={i} className="mt-2 flex items-center justify-between rounded-lg px-3 py-2" style={{ background: `${theme.accent}22` }}>
                <span className="text-xs font-semibold text-white">{ev.text}</span>
                <button onClick={() => onRemoveEvent(events.indexOf(ev))} className="text-xs opacity-50 hover:opacity-100" style={{ color: theme.accent }}>✕</button>
              </div>
            ))}
          </div>
        )}

        {/* Holidays */}
        <div>
          <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: theme.accent, opacity: 0.6 }}>Holidays</p>
          {holidays.length === 0 && <p className="text-xs text-white opacity-30">None this month</p>}
          {holidays.map((h, i) => (
            <button key={i} onClick={() => onSelectDate({ year: viewYear, month: viewMonth, day: h.day })} className="w-full text-left flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-white/5 transition-all">
              <span className="text-xs font-black w-6 text-center" style={{ color: theme.accent }}>{h.day}</span>
              <span className="text-xs text-white opacity-70 font-semibold">{h.name}</span>
            </button>
          ))}
        </div>

        {/* Events */}
        <div>
          <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: theme.accent, opacity: 0.6 }}>Events</p>
          {monthEvents.length === 0 && <p className="text-xs text-white opacity-30">No events</p>}
          {monthEvents.map((ev, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 px-2 rounded-lg mb-1" style={{ background: `${theme.accent}15` }}>
              <span className="text-xs font-black w-6 text-center" style={{ color: theme.accent }}>{ev.day}</span>
              <span className="text-xs font-semibold text-white opacity-80 flex-1">{ev.text}</span>
              <button onClick={() => onRemoveEvent(events.indexOf(ev))} className="text-xs opacity-40 hover:opacity-100" style={{ color: theme.accent }}>✕</button>
            </div>
          ))}
        </div>

        {/* Mood */}
        <div className="rounded-2xl p-4 text-center" style={{ background: `${theme.accent}12`, border: `1px solid ${theme.accent}22` }}>
          <p className="text-xs tracking-widest uppercase font-black" style={{ color: theme.accent, opacity: 0.5 }}>Mood</p>
          <p className="text-base font-black text-white mt-1">{theme.name}</p>
        </div>

      </div>
    </aside>
  );
}
