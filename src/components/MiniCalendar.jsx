import { MONTHS, MONTH_THEMES } from "../constants";
import { buildCalendarCells, getHoliday } from "../utils";

export default function MiniCalendar({ year, month, onSelect, selectedDate, today, events, photo, small }) {
  const theme    = MONTH_THEMES[month];
  const cells    = buildCalendarCells(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  return (
    <div style={{ borderRadius: small?10:14, overflow:"hidden", boxShadow:"0 8px 32px #00000044", background:theme.bg, border:`1px solid ${theme.accent}22`, width:"100%" }}>
      {photo && (
        <div style={{ position:"relative", overflow:"hidden", height: small?52:72 }}>
          <img src={photo} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
          <div style={{ position:"absolute",inset:0,background:`linear-gradient(to bottom,transparent 20%,${theme.bg}ee)` }}/>
        </div>
      )}
      <div style={{ padding: small?"4px 8px":"6px 12px", background:photo?"transparent":`${theme.accent}18`, borderBottom:`1px solid ${theme.accent}22` }}>
        <p style={{ fontSize:8, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:theme.accent, opacity:0.6 }}>{theme.name}</p>
        <h3 style={{ fontSize: small?11:14, fontWeight:900, color:"white" }}>{MONTHS[month]}</h3>
      </div>
      <div style={{ padding: small?4:8 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:2 }}>
          {["S","M","T","W","T","F","S"].map((d,i)=>(
            <div key={i} style={{ textAlign:"center", fontSize:8, fontWeight:700, color:theme.accent, opacity:0.5 }}>{d}</div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1 }}>
          {cells.map((day,i)=>{
            if(!day) return <div key={i}/>;
            const isToday = today.year===year && today.month===month && today.day===day;
            const isSel   = selectedDate?.year===year && selectedDate?.month===month && selectedDate?.day===day;
            const holiday = getHoliday(year,month,day);
            const hasEv   = events.some(e=>e.year===year && e.month===month && e.day===day);
            const dow     = (firstDay+day-1)%7;
            const isWknd  = dow===0||dow===6;
            return (
              <button key={i} onClick={()=>onSelect({year,month,day})}
                style={{ position:"relative", aspectRatio:"1",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center", fontSize: small?9:10, fontWeight: isSel||isToday?800:400, cursor:"pointer",
                  background: isSel?theme.accent : isToday?`${theme.accent}30` : "transparent",
                  color: isSel?theme.bg : isToday?theme.accent : isWknd?`${theme.accent}88` : "#bbb",
                }}>
                {day}
                {(holiday||hasEv) && <span style={{ position:"absolute",bottom:1,left:"50%",transform:"translateX(-50%)",width:3,height:3,borderRadius:"50%",background:isSel?theme.bg:theme.accent }}/>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
