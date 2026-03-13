import { MONTHS, DAYS_SHORT, HOLIDAYS, MONTH_THEMES } from "../constants";
import { getDaysInMonth, getFirstDay, getHoliday } from "../utils";

export default function AgendaView({ viewYear, viewMonth, events, isMobile }) {

  const theme    = MONTH_THEMES[viewMonth];

  const today = {
    year:new Date().getFullYear(),
    month:new Date().getMonth(),
    day:new Date().getDate()
  };

  const days     = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDay(viewYear, viewMonth);

  const monthHolidays = Object.entries(HOLIDAYS)
    .filter(([k])=>k.startsWith(`${viewYear}-${viewMonth+1}-`));

  const agendaEvents = events.filter(e=>e.year===viewYear && e.month===viewMonth);

  return (
    <div style={{ paddingBottom:40 }}>

      <h2 style={{ fontSize: isMobile?22:36, fontWeight:900, color:"white", letterSpacing:"-0.04em", opacity:0.8, marginBottom: isMobile?12:20 }}>
        {MONTHS[viewMonth]} {viewYear}
      </h2>

      <div style={{ display:"flex", flexDirection:"column", gap:6, maxWidth:600 }}>

        {Array.from({length:days},(_,i)=>i+1).map(day=>{

          const holiday = getHoliday(viewYear,viewMonth,day);
          const dayEv   = events.filter(e=>e.year===viewYear && e.month===viewMonth && e.day===day);

          if(!holiday && dayEv.length===0) return null;

          const isToday = today.year===viewYear && today.month===viewMonth && today.day===day;
          const dow     = (firstDay+day-1)%7;

          return (
            <div key={day}
              style={{
                display:"flex",
                gap: isMobile?10:16,
                borderRadius: isMobile?10:14,
                padding: isMobile?"10px 12px":"14px 18px",
                background: isToday?`${theme.accent}22`:"#ffffff08",
                border:`1px solid ${isToday?theme.accent:"#ffffff0a"}`
              }}
            >

              <div style={{ textAlign:"center", minWidth: isMobile?36:44, flexShrink:0 }}>
                <p style={{ fontSize: isMobile?18:24, fontWeight:900, color:theme.accent, lineHeight:1 }}>
                  {day}
                </p>

                <p style={{ fontSize:10, color:"white", opacity:0.4 }}>
                  {DAYS_SHORT[dow]}
                </p>
              </div>

              <div style={{ flex:1 }}>

                {holiday && (
                  <p style={{ fontSize: isMobile?12:14, fontWeight:700, color:"white", marginBottom:4 }}>
                    🎉 {holiday}
                  </p>
                )}

                {dayEv.map((ev,i)=>(
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:6,padding:"3px 0" }}>
                    <span style={{ width:6,height:6,borderRadius:"50%",background:theme.accent }}/>
                    <span style={{ fontSize: isMobile?12:13, color:"white", opacity:0.75 }}>
                      {ev.text}
                    </span>
                  </div>
                ))}

              </div>
            </div>
          );
        })}

        {agendaEvents.length===0 && monthHolidays.length===0 && (
          <p style={{ color:"white",opacity:0.25,textAlign:"center",padding:"48px 0",fontSize: isMobile?14:16 }}>
            No events or holidays this month
          </p>
        )}

      </div>
    </div>
  );
}