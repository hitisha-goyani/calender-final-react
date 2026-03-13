import { MONTHS, DAYS_SHORT, MONTH_THEMES } from "../constants";
import { buildCalendarCells, getHoliday } from "../utils";
import ImgBtn from "./ImgBtn";

export default function BigCalendar({ year, month, selectedDate, onSelect, today, events, photo, onMonthPhoto, onAllPhoto, onRemovePhoto, isMobile, isTablet }) {
  const theme    = MONTH_THEMES[month];
  const cells    = buildCalendarCells(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const DAY_LABELS = isMobile ? ["S","M","T","W","T","F","S"] : DAYS_SHORT;

  const bannerH  = photo ? (isMobile ? 90 : isTablet ? 130 : 180) : (isMobile ? 64 : 90);
  const cellMinH = isMobile ? 36 : isTablet ? 52 : 70;

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", gap: isMobile?4:8 }}>

      {/* Banner */}
      <div style={{ position:"relative", borderRadius:isMobile?12:16, overflow:"hidden", flexShrink:0, height:bannerH, background:photo?"transparent":`${theme.accent}0d`, border:`1.5px dashed ${theme.accent}28`, transition:"height .4s ease" }}>
        {photo && (
          <>
            <img src={photo} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
            <div style={{ position:"absolute",inset:0,background:`linear-gradient(120deg,${theme.bg}dd 0%,transparent 55%,${theme.bg}88 100%)` }}/>
          </>
        )}

        <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",padding: isMobile?"0 10px":"0 20px",gap:8 }}>
          <div style={{ minWidth:0 }}>
            <p style={{ fontSize: isMobile?8:10, fontWeight:900, letterSpacing:"0.15em", textTransform:"uppercase", color:theme.accent, opacity:0.65 }}>
              {theme.name} · {year}
            </p>

            <h2 style={{ fontSize: isMobile?22:isTablet?34:48, fontWeight:900, color:"white", letterSpacing:"-0.04em", lineHeight:1 }}>
              {MONTHS[month]}
            </h2>
          </div>

          <div style={{ marginLeft:"auto", display:"flex", flexDirection:"column", gap: isMobile?4:6, alignItems:"flex-end", flexShrink:0 }}>
            <ImgBtn label={isMobile?"This Month":`Photo for ${MONTHS[month]}`} icon="🖼️" accent={theme.accent} bg={theme.bg} onImage={onMonthPhoto} glow={false} small={isMobile}/>
            <ImgBtn label="Apply to ALL" icon="✨" accent={theme.accent} bg={theme.bg} onImage={onAllPhoto} glow={true} small={isMobile}/>

            {photo && (
              <button onClick={onRemovePhoto} style={{ display:"flex",alignItems:"center",gap:4,padding:isMobile?"4px 8px":"6px 10px",borderRadius:8,fontWeight:900,fontSize:isMobile?8:10,letterSpacing:"0.1em",textTransform:"uppercase",background:"#ff444420",color:"#ff8888",border:"1px solid #ff444430" }}>
                🗑️{!isMobile && " Remove"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Day Headers */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
        {DAY_LABELS.map((d,i)=>(
          <div key={i} style={{ textAlign:"center", fontSize: isMobile?9:11, fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", color:theme.accent, opacity:0.5, padding:"2px 0" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap: isMobile?2:4, flex:1 }}>
        {cells.map((day,i)=>{
          if (!day) return <div key={i} style={{ borderRadius: isMobile?6:10, background:"#ffffff04" }}/>;

          const isToday = today.year===year && today.month===month && today.day===day;
          const isSel   = selectedDate?.year===year && selectedDate?.month===month && selectedDate?.day===day;
          const holiday = getHoliday(year,month,day);
          const dayEv   = events.filter(e=>e.year===year && e.month===month && e.day===day);

          const dow     = (firstDay+day-1)%7;
          const isWknd  = dow===0||dow===6;

          return (
            <button key={i} onClick={()=>onSelect({year,month,day})}
              style={{
                borderRadius: isMobile?6:10,
                padding: isMobile?"3px 2px":"6px",
                display:"flex",
                flexDirection:"column",
                alignItems:"flex-start",
                textAlign:"left",
                minHeight:cellMinH,
                cursor:"pointer",
                background: isSel?theme.accent : isToday?`${theme.accent}22` : "#ffffff08",
                border: isToday&&!isSel ? `1.5px solid ${theme.accent}` : isSel?"none" : "1px solid #ffffff08",
                transition:"transform .15s, opacity .15s",
                overflow:"hidden"
              }}
              onMouseEnter={e=>{ if(!isMobile) e.currentTarget.style.transform="scale(1.04)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; }}
            >
              <span style={{ fontSize: isMobile?11:13, fontWeight:900, lineHeight:1, color: isSel?theme.bg : isToday?theme.accent : isWknd?`${theme.accent}cc` : "#ffffff70" }}>
                {day}
              </span>

              {holiday && !isMobile && (
                <span style={{ fontSize:7, fontWeight:700, color: isSel?theme.bg:theme.accent, opacity:0.85, marginTop:2 }}>
                  🎉 {holiday}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}