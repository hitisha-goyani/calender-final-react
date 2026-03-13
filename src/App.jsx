import { useState, useCallback, useEffect } from "react";
import { MONTHS, MONTH_THEMES } from "./constants";
import Sidebar       from "./components/Sidebar";
import BigCalendar   from "./components/BigCalendar";
import YearView      from "./components/YearView";
import AgendaView    from "./components/AgendaView";
import PhotoManager  from "./components/PhotoManager";
import AddEventModal from "./components/AddEventModal";
import BottomSheet   from "./components/BottomSheet";

const now   = new Date();
const TODAY = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };

export default function App() {
  const [viewYear,       setViewYear]       = useState(2025);
  const [viewMonth,      setViewMonth]      = useState(now.getMonth());
  const [view,           setView]           = useState("month");
  const [sidebarOpen,    setSidebarOpen]    = useState(true);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [selectedDate,   setSelectedDate]   = useState(TODAY);
  const [events,         setEvents]         = useState([
    { year:2025, month:2,  day:15, text:"Team Meetup"     },
    { year:2025, month:5,  day:21, text:"Launch Day"      },
    { year:2025, month:9,  day:10, text:"Conference"      },
    { year:2026, month:0,  day:10, text:"Planning Sprint" },
  ]);
  const [showEventModal,   setShowEventModal]   = useState(false);
  const [photos,           setPhotos]           = useState(Array(12).fill(null));
  const [showPhotoManager, setShowPhotoManager] = useState(false);
  const [showBottomSheet,  setShowBottomSheet]  = useState(false);
  const [screenW,          setScreenW]          = useState(window.innerWidth);

  useEffect(() => {
    const fn = () => setScreenW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const isMobile = screenW < 768;
  const isTablet = screenW >= 768 && screenW < 1100;

  const theme        = MONTH_THEMES[viewMonth];
  const currentPhoto = photos[viewMonth];
  const photosSet    = photos.filter(Boolean).length;

  const setMonthPhoto = useCallback((idx, data) => setPhotos(p => { const n=[...p]; n[idx]=data; return n; }), []);
  const setAllPhotos  = useCallback(data => setPhotos(Array(12).fill(data)), []);
  const removePhoto   = useCallback(idx  => setPhotos(p => { const n=[...p]; n[idx]=null; return n; }), []);

  function addEvent(text) {
    if (!selectedDate) return;
    setEvents(prev => [...prev, { ...selectedDate, text }]);
    setShowEventModal(false);
  }
  function removeEvent(idx) { setEvents(prev => prev.filter((_,i)=>i!==idx)); }
  function prevMonth() {
    if (viewMonth===0) { if(viewYear>2025){setViewMonth(11);setViewYear(y=>y-1);} }
    else setViewMonth(m=>m-1);
  }
  function nextMonth() {
    if (viewMonth===11) { if(viewYear<2026){setViewMonth(0);setViewYear(y=>y+1);} }
    else setViewMonth(m=>m+1);
  }
  function goToday() { setSelectedDate(TODAY); setViewMonth(TODAY.month); setViewYear(TODAY.year); }
  function handleDaySelect(d) {
    setSelectedDate(d);
    if (isMobile) setShowBottomSheet(true);
  }

  const sideW = isMobile ? 0 : isTablet ? (sidebarOpen ? 230 : 0) : (sidebarOpen ? 268 : 0);

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100dvh", background:theme.bg, transition:"background .8s ease", overflow:"hidden" }}>

      {/* Ambient BG */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}>
        {currentPhoto ? (
          <><img src={currentPhoto} alt="" style={{ width:"100%",height:"100%",objectFit:"cover",opacity:0.1 }}/><div style={{ position:"absolute",inset:0,background:`${theme.bg}bb` }}/></>
        ) : (
          <div style={{ width:"100%",height:"100%",background:`radial-gradient(ellipse 80% 60% at 50% 0%,${theme.accent}18 0%,transparent 70%)` }}/>
        )}
      </div>

      {/* ══ HEADER ══ */}
      <header style={{
        position:"relative", zIndex:20, flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        gap:8, padding: isMobile ? "0 12px" : "0 20px",
        height: isMobile ? 52 : 60,
        borderBottom:`1px solid ${theme.accent}22`,
        background:`${theme.bg}ee`, backdropFilter:"blur(20px)"
      }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {!isMobile && (
            <button onClick={()=>setSidebarOpen(s=>!s)}
              style={{ width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",background:`${theme.accent}18`,color:"#ffffff99",fontSize:16 }}>☰</button>
          )}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontWeight:900, color:"white", letterSpacing:"-0.04em", fontSize: isMobile?14:20 }}>CALENDARIUM</span>
              <span style={{ fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:999, background:`${theme.accent}33`, color:theme.accent }}>2025–26</span>
            </div>
            {!isMobile && <p style={{ fontSize:8, color:"white", opacity:0.3, letterSpacing:"0.15em", textTransform:"uppercase" }}>Annual Planner</p>}
          </div>
        </div>

        {/* Month nav */}
        <div style={{ display:"flex", alignItems:"center", gap: isMobile?4:8 }}>
          <button onClick={prevMonth} style={{ width:isMobile?28:32,height:isMobile?28:32,borderRadius:"50%",background:`${theme.accent}22`,color:"white",opacity:0.7,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center" }}>‹</button>
          <div style={{ textAlign:"center", minWidth: isMobile?90:130, position:"relative" }}>
            <h2 style={{ fontWeight:900, color:"white", letterSpacing:"-0.03em", fontSize: isMobile?14:18 }}>{MONTHS[viewMonth]}</h2>
            <button onClick={()=>setShowYearPicker(s=>!s)} style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:theme.accent }}>{viewYear} ▾</button>
            {showYearPicker && (
              <div style={{ position:"absolute",top:44,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,zIndex:50,borderRadius:12,padding:12,background:"#111",border:`1px solid ${theme.accent}44`,boxShadow:"0 20px 60px #00000099" }}>
                {[2025,2026].map(y=>(
                  <button key={y} onClick={()=>{setViewYear(y);setShowYearPicker(false);}}
                    style={{ padding:"6px 18px",borderRadius:8,fontWeight:900,fontSize:13,background:viewYear===y?theme.accent:`${theme.accent}22`,color:viewYear===y?theme.bg:theme.accent }}>{y}</button>
                ))}
              </div>
            )}
          </div>
          <button onClick={nextMonth} style={{ width:isMobile?28:32,height:isMobile?28:32,borderRadius:"50%",background:`${theme.accent}22`,color:"white",opacity:0.7,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center" }}>›</button>
        </div>

        {/* Right controls */}
        <div style={{ display:"flex", alignItems:"center", gap: isMobile?4:8 }}>
          <button onClick={()=>setShowPhotoManager(true)}
            style={{ display:"flex",alignItems:"center",gap:4,padding:isMobile?"5px 8px":"6px 12px",borderRadius:10,fontSize:11,fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",background:`${theme.accent}22`,color:theme.accent,border:`1.5px solid ${theme.accent}33` }}>
            📸{!isMobile && <span style={{marginLeft:4}}>Photos</span>}
            {photosSet>0 && <span style={{ width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:8,background:theme.accent,color:theme.bg,marginLeft:2 }}>{photosSet}</span>}
          </button>
          {!isMobile && ["month","year","agenda"].map(v=>(
            <button key={v} onClick={()=>setView(v)}
              style={{ padding:"6px 12px",borderRadius:999,fontSize:11,fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",background:view===v?theme.accent:`${theme.accent}18`,color:view===v?theme.bg:theme.accent }}>{v}</button>
          ))}
          {!isMobile && (
            <button onClick={goToday} style={{ padding:"6px 12px",borderRadius:999,fontSize:11,fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",background:`${theme.accent}18`,color:theme.accent }}>Today</button>
          )}
        </div>
      </header>

      {/* ══ BODY ══ */}
      <div style={{ position:"relative", zIndex:10, display:"flex", flex:1, overflow:"hidden" }}>

        {/* Desktop Sidebar */}
        {!isMobile && (
          <div style={{ width:sideW, flexShrink:0, overflow:"hidden", transition:"width .3s ease" }}>
            {sidebarOpen && (
              <Sidebar
                viewYear={viewYear} viewMonth={viewMonth}
                selectedDate={selectedDate} events={events} photos={photos}
                onMonthPhoto={img=>setMonthPhoto(viewMonth,img)}
                onAllPhoto={setAllPhotos}
                onRemovePhoto={()=>removePhoto(viewMonth)}
                onAddEventClick={()=>setShowEventModal(true)}
                onRemoveEvent={removeEvent}
                onSelectDate={setSelectedDate}
              />
            )}
          </div>
        )}

        {/* Main */}
        <main style={{ flex:1, overflow:"auto", padding: isMobile ? 6 : isTablet ? 12 : "16px 20px" }}>
          {view==="month" && (
            <BigCalendar
              year={viewYear} month={viewMonth}
              selectedDate={selectedDate} onSelect={handleDaySelect}
              today={TODAY} events={events} photo={currentPhoto}
              onMonthPhoto={img=>setMonthPhoto(viewMonth,img)}
              onAllPhoto={setAllPhotos}
              onRemovePhoto={()=>removePhoto(viewMonth)}
              isMobile={isMobile} isTablet={isTablet}
            />
          )}
          {view==="year" && (
            <YearView
              viewYear={viewYear} selectedDate={selectedDate}
              today={TODAY} events={events} photos={photos}
              onMonthClick={i=>{setViewMonth(i);setView("month");}}
              onSelectDate={handleDaySelect}
              isMobile={isMobile}
            />
          )}
          {view==="agenda" && (
            <AgendaView viewYear={viewYear} viewMonth={viewMonth} events={events} isMobile={isMobile}/>
          )}
        </main>
      </div>

      {/* ══ MOBILE BOTTOM NAV ══ */}
      {isMobile && (
        <nav style={{ position:"relative",zIndex:20,flexShrink:0,display:"flex",alignItems:"center",height:56,borderTop:`1px solid ${theme.accent}20`,background:`${theme.bg}f5`,backdropFilter:"blur(20px)" }}>
          {[
            {v:"month",icon:"▦",label:"Month"},
            {v:"year", icon:"▤",label:"Year"},
            {v:"agenda",icon:"≡",label:"Agenda"},
          ].map(({v,icon,label})=>(
            <button key={v} onClick={()=>setView(v)}
              style={{ flex:1,height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,color:view===v?theme.accent:"#ffffff33",transition:"color .2s" }}>
              <span style={{ fontSize:20,lineHeight:1 }}>{icon}</span>
              <span style={{ fontSize:9,fontWeight:800,letterSpacing:"0.08em" }}>{label}</span>
            </button>
          ))}
          <button onClick={()=>setShowBottomSheet(s=>!s)}
            style={{ flex:1,height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,color:showBottomSheet?theme.accent:"#ffffff33" }}>
            <span style={{ fontSize:20,lineHeight:1 }}>☰</span>
            <span style={{ fontSize:9,fontWeight:800,letterSpacing:"0.08em" }}>Menu</span>
          </button>
          <button onClick={goToday}
            style={{ flex:1,height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,color:"#ffffff33" }}>
            <span style={{ fontSize:20,lineHeight:1 }}>◎</span>
            <span style={{ fontSize:9,fontWeight:800,letterSpacing:"0.08em" }}>Today</span>
          </button>
        </nav>
      )}

      {/* Mobile Bottom Sheet */}
      {isMobile && (
        <BottomSheet
          open={showBottomSheet} onClose={()=>setShowBottomSheet(false)}
          viewYear={viewYear} viewMonth={viewMonth}
          selectedDate={selectedDate} events={events} photos={photos}
          onMonthPhoto={img=>setMonthPhoto(viewMonth,img)}
          onAllPhoto={setAllPhotos}
          onRemovePhoto={()=>removePhoto(viewMonth)}
          onAddEventClick={()=>{setShowBottomSheet(false);setShowEventModal(true);}}
          onRemoveEvent={removeEvent}
          onSelectDate={setSelectedDate}
        />
      )}

      {/* Modals */}
      {showPhotoManager && (
        <PhotoManager photos={photos} theme={theme}
          onMonthPhoto={setMonthPhoto} onRemovePhoto={removePhoto}
          onAllPhoto={setAllPhotos} onClose={()=>setShowPhotoManager(false)} isMobile={isMobile}/>
      )}
      {showEventModal && (
        <AddEventModal selectedDate={selectedDate} theme={theme}
          onAdd={addEvent} onClose={()=>setShowEventModal(false)}/>
      )}

      <style>{`::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${theme.accent}44;border-radius:4px}`}</style>
    </div>
  );
}
