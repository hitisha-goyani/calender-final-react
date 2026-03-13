import { MONTHS, MONTH_THEMES, HOLIDAYS } from "../constants";
import { getHoliday } from "../utils";
import ImgBtn from "./ImgBtn";

export default function BottomSheet({ open, onClose, viewYear, viewMonth, selectedDate, events, photos, onMonthPhoto, onAllPhoto, onRemovePhoto, onAddEventClick, onRemoveEvent, onSelectDate }) {
  const theme        = MONTH_THEMES[viewMonth];
  const currentPhoto = photos[viewMonth];
  const selHoliday   = selectedDate ? getHoliday(selectedDate.year, selectedDate.month, selectedDate.day) : null;
  const selEvents    = selectedDate ? events.filter(e=>e.year===selectedDate.year && e.month===selectedDate.month && e.day===selectedDate.day) : [];
  const holidays     = Object.entries(HOLIDAYS).filter(([k])=>k.startsWith(`${viewYear}-${viewMonth+1}-`)).map(([k,v])=>({day:parseInt(k.split("-")[2]),name:v})).sort((a,b)=>a.day-b.day);
  const monthEvents  = events.filter(e=>e.year===viewYear && e.month===viewMonth).sort((a,b)=>a.day-b.day);

  const S = { fontSize:10, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:theme.accent, opacity:0.55, marginBottom:6, display:"block" };

  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:40,background:"#00000066",backdropFilter:"blur(4px)" }}/>
      <div style={{ position:"fixed",bottom:56,left:0,right:0,zIndex:50,borderRadius:"20px 20px 0 0",background:theme.bg,border:`1px solid ${theme.accent}33`,maxHeight:"72vh",overflowY:"auto" }}>
        {/* Handle */}
        <div style={{ display:"flex",justifyContent:"center",padding:"10px 0 4px" }}>
          <div style={{ width:36,height:4,borderRadius:4,background:`${theme.accent}44` }}/>
        </div>

        <div style={{ padding:"0 14px 32px", display:"flex", flexDirection:"column", gap:12 }}>

          {/* Photo */}
          <div style={{ borderRadius:14,overflow:"hidden",border:`1px solid ${theme.accent}33` }}>
            {currentPhoto ? (
              <div style={{ position:"relative",height:110 }}>
                <img src={currentPhoto} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 35%,#000c)" }}/>
                <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:8,display:"flex",gap:6 }}>
                  <ImgBtn label="Change" icon="🔄" accent={theme.accent} bg={theme.bg} onImage={onMonthPhoto} small/>
                  <button onClick={onRemovePhoto} style={{ padding:"4px 8px",borderRadius:6,fontSize:10,fontWeight:900,background:"#ff444420",color:"#ff8888",border:"1px solid #ff444428" }}>🗑️</button>
                </div>
              </div>
            ) : (
              <div style={{ padding:10,background:`${theme.accent}0d`,display:"flex",flexDirection:"column",gap:6 }}>
                <span style={S}>Month Photo</span>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                  <ImgBtn label={`Add for ${MONTHS[viewMonth]}`} icon="🖼️" accent={theme.accent} bg={theme.bg} onImage={onMonthPhoto} small/>
                  <ImgBtn label="Apply to All" icon="✨" accent={theme.accent} bg={theme.bg} onImage={onAllPhoto} glow small/>
                </div>
              </div>
            )}
          </div>

          {/* Selected day */}
          {selectedDate && (
            <div style={{ borderRadius:14,padding:"12px 10px",background:`${theme.accent}18`,border:`1px solid ${theme.accent}33` }}>
              <span style={S}>Selected Day</span>
              <p style={{ fontSize:24,fontWeight:900,color:"white",lineHeight:1 }}>{selectedDate.day} <span style={{ fontSize:14,opacity:0.6 }}>{MONTHS[selectedDate.month]} {selectedDate.year}</span></p>
              {selHoliday && <p style={{ fontSize:12,fontWeight:700,color:theme.accent,marginTop:4 }}>🎉 {selHoliday}</p>}
              <button onClick={onAddEventClick} style={{ marginTop:10,width:"100%",padding:"10px 0",borderRadius:10,fontSize:12,fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",background:theme.accent,color:theme.bg,cursor:"pointer" }}>+ Add Event</button>
              {selEvents.map((ev,i)=>(
                <div key={i} style={{ marginTop:6,display:"flex",alignItems:"center",justifyContent:"space-between",borderRadius:8,padding:"7px 10px",background:`${theme.accent}22` }}>
                  <span style={{ fontSize:13,fontWeight:600,color:"white",flex:1 }}>{ev.text}</span>
                  <button onClick={()=>onRemoveEvent(events.indexOf(ev))} style={{ fontSize:14,color:theme.accent }}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Holidays */}
          {holidays.length>0 && (
            <div>
              <span style={S}>Holidays This Month</span>
              {holidays.map((h,i)=>(
                <button key={i} onClick={()=>{onSelectDate({year:viewYear,month:viewMonth,day:h.day});onClose();}}
                  style={{ width:"100%",textAlign:"left",display:"flex",alignItems:"center",gap:8,padding:"8px 4px",borderRadius:8,cursor:"pointer",background:"transparent" }}>
                  <span style={{ fontSize:13,fontWeight:900,width:24,textAlign:"center",color:theme.accent,flexShrink:0 }}>{h.day}</span>
                  <span style={{ fontSize:13,color:"white",opacity:0.7,fontWeight:600 }}>{h.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Events */}
          {monthEvents.length>0 && (
            <div>
              <span style={S}>Events This Month</span>
              {monthEvents.map((ev,i)=>(
                <div key={i} style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:10,marginBottom:4,background:`${theme.accent}15` }}>
                  <span style={{ fontSize:12,fontWeight:900,width:22,textAlign:"center",color:theme.accent,flexShrink:0 }}>{ev.day}</span>
                  <span style={{ fontSize:13,fontWeight:600,color:"white",opacity:0.8,flex:1 }}>{ev.text}</span>
                  <button onClick={()=>onRemoveEvent(events.indexOf(ev))} style={{ fontSize:14,color:theme.accent }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
