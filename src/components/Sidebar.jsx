import { MONTHS, MONTH_THEMES, HOLIDAYS } from "../constants";
import { getHoliday } from "../utils";
import ImgBtn from "./ImgBtn";

export default function Sidebar({ viewYear, viewMonth, selectedDate, events, photos, onMonthPhoto, onAllPhoto, onRemovePhoto, onAddEventClick, onRemoveEvent, onSelectDate }) {
  const theme        = MONTH_THEMES[viewMonth];
  const currentPhoto = photos[viewMonth];
  const selHoliday   = selectedDate ? getHoliday(selectedDate.year, selectedDate.month, selectedDate.day) : null;
  const selEvents    = selectedDate ? events.filter(e=>e.year===selectedDate.year && e.month===selectedDate.month && e.day===selectedDate.day) : [];
  const holidays     = Object.entries(HOLIDAYS).filter(([k])=>k.startsWith(`${viewYear}-${viewMonth+1}-`)).map(([k,v])=>({day:parseInt(k.split("-")[2]),name:v})).sort((a,b)=>a.day-b.day);
  const monthEvents  = events.filter(e=>e.year===viewYear && e.month===viewMonth).sort((a,b)=>a.day-b.day);

  const S = { fontSize:11, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:theme.accent, opacity:0.55, marginBottom:6, display:"block" };

  return (
    <aside style={{ height:"100%", overflowY:"auto", borderRight:`1px solid ${theme.accent}18`, background:`${theme.bg}f0`, backdropFilter:"blur(20px)" }}>
      <div style={{ padding:"12px 10px", display:"flex", flexDirection:"column", gap:12 }}>

        {/* Photo */}
        <div style={{ borderRadius:14, overflow:"hidden", border:`1px solid ${theme.accent}33` }}>
          {currentPhoto ? (
            <div style={{ position:"relative", height:100 }}>
              <img src={currentPhoto} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
              <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 35%,#000000cc)" }}/>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:6,display:"flex",gap:6 }}>
                <ImgBtn label="Change" icon="🔄" accent={theme.accent} bg={theme.bg} onImage={onMonthPhoto} small/>
                <button onClick={onRemovePhoto} style={{ padding:"4px 8px",borderRadius:6,fontSize:10,fontWeight:900,background:"#ff444420",color:"#ff8888",border:"1px solid #ff444428" }}>🗑️</button>
              </div>
            </div>
          ) : (
            <div style={{ padding:10, background:`${theme.accent}0d`, display:"flex", flexDirection:"column", gap:6 }}>
              <span style={S}>Month Photo</span>
              <ImgBtn label={`Add for ${MONTHS[viewMonth]}`} icon="🖼️" accent={theme.accent} bg={theme.bg} onImage={onMonthPhoto} small/>
              <ImgBtn label="Apply to All Months" icon="✨" accent={theme.accent} bg={theme.bg} onImage={onAllPhoto} glow small/>
            </div>
          )}
        </div>

        {/* Selected Day */}
        {selectedDate && (
          <div style={{ borderRadius:14, padding:"12px 10px", background:`${theme.accent}18`, border:`1px solid ${theme.accent}33` }}>
            <span style={S}>Selected Day</span>
            <p style={{ fontSize:22, fontWeight:900, color:"white", lineHeight:1 }}>{selectedDate.day}</p>
            <p style={{ fontSize:11, color:"white", opacity:0.6, fontWeight:600, marginTop:2 }}>{MONTHS[selectedDate.month]} {selectedDate.year}</p>
            {selHoliday && <p style={{ fontSize:11, fontWeight:700, color:theme.accent, marginTop:4 }}>🎉 {selHoliday}</p>}
            <button onClick={onAddEventClick} style={{ marginTop:8, width:"100%", padding:"8px 0", borderRadius:10, fontSize:11, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", background:theme.accent, color:theme.bg, cursor:"pointer" }}>+ Add Event</button>
            {selEvents.map((ev,i)=>(
              <div key={i} style={{ marginTop:6, display:"flex", alignItems:"center", justifyContent:"space-between", borderRadius:8, padding:"6px 8px", background:`${theme.accent}22` }}>
                <span style={{ fontSize:11, fontWeight:600, color:"white", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ev.text}</span>
                <button onClick={()=>onRemoveEvent(events.indexOf(ev))} style={{ fontSize:12, color:theme.accent, opacity:0.6, marginLeft:4, flexShrink:0 }}>✕</button>
              </div>
            ))}
          </div>
        )}

        {/* Holidays */}
        <div>
          <span style={S}>Holidays</span>
          {holidays.length===0 && <p style={{ fontSize:11, color:"white", opacity:0.25 }}>None this month</p>}
          {holidays.map((h,i)=>(
            <button key={i} onClick={()=>onSelectDate({year:viewYear,month:viewMonth,day:h.day})}
              style={{ width:"100%", textAlign:"left", display:"flex", alignItems:"center", gap:6, padding:"5px 4px", borderRadius:6, cursor:"pointer", background:"transparent", color:"inherit" }}>
              <span style={{ fontSize:11, fontWeight:900, width:20, textAlign:"center", color:theme.accent, flexShrink:0 }}>{h.day}</span>
              <span style={{ fontSize:11, color:"white", opacity:0.65, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{h.name}</span>
            </button>
          ))}
        </div>

        {/* Events */}
        <div>
          <span style={S}>Events</span>
          {monthEvents.length===0 && <p style={{ fontSize:11, color:"white", opacity:0.25 }}>No events</p>}
          {monthEvents.map((ev,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 6px", borderRadius:8, marginBottom:3, background:`${theme.accent}15` }}>
              <span style={{ fontSize:11, fontWeight:900, width:18, textAlign:"center", color:theme.accent, flexShrink:0 }}>{ev.day}</span>
              <span style={{ fontSize:11, fontWeight:600, color:"white", opacity:0.75, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ev.text}</span>
              <button onClick={()=>onRemoveEvent(events.indexOf(ev))} style={{ fontSize:11, color:theme.accent, opacity:0.5, flexShrink:0 }}>✕</button>
            </div>
          ))}
        </div>

        {/* Mood chip */}
        <div style={{ borderRadius:14, padding:"10px 8px", textAlign:"center", background:`${theme.accent}10`, border:`1px solid ${theme.accent}20` }}>
          <p style={{ fontSize:9, letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:900, color:theme.accent, opacity:0.4 }}>Mood</p>
          <p style={{ fontSize:13, fontWeight:900, color:"white", marginTop:2 }}>{theme.name}</p>
        </div>
      </div>
    </aside>
  );
}
