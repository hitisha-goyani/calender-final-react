import MiniCalendar from "./MiniCalendar";

export default function YearView({ viewYear, selectedDate, today, events, photos, onMonthClick, onSelectDate, isMobile }) {
  const cols = isMobile ? 2 : 4;
  return (
    <div>
      <h2 style={{ fontSize: isMobile?24:36, fontWeight:900, color:"white", letterSpacing:"-0.04em", opacity:0.8, marginBottom: isMobile?12:20 }}>{viewYear}</h2>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap: isMobile?8:16 }}>
        {Array.from({length:12},(_,i)=>i).map(i=>(
          <div key={i} onClick={()=>onMonthClick(i)} style={{ cursor:"pointer", transition:"transform .2s" }}
            onMouseEnter={e=>{ if(!isMobile) e.currentTarget.style.transform="scale(1.02)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; }}>
            <MiniCalendar
              year={viewYear} month={i}
              selectedDate={selectedDate}
              onSelect={d=>{ onSelectDate(d); onMonthClick(i); }}
              today={today} events={events} photo={photos[i]}
              small={isMobile}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
