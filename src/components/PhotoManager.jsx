import { MONTHS, MONTH_THEMES } from "../constants";
import ImgBtn from "./ImgBtn";

export default function PhotoManager({ photos, theme, onMonthPhoto, onRemovePhoto, onAllPhoto, onClose, isMobile }) {
  const cols = isMobile ? 3 : 4;
  return (
    <div style={{ position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:isMobile?"flex-end":"center",justifyContent:"center",padding:isMobile?0:16,background:"#000000aa",backdropFilter:"blur(12px)" }}>
      <div style={{ borderRadius:isMobile?"20px 20px 0 0":"20px",overflow:"hidden",width:"100%",maxWidth:760,background:"#0e0e0e",border:`1px solid ${theme.accent}33`,maxHeight:"90vh",overflowY:"auto" }}>

        {isMobile && (
          <div style={{ display:"flex",justifyContent:"center",padding:"10px 0 2px" }}>
            <div style={{ width:36,height:4,borderRadius:4,background:`${theme.accent}44` }}/>
          </div>
        )}

        {/* Header */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:isMobile?"10px 14px":"16px 20px",position:"sticky",top:0,zIndex:10,background:"#0e0e0ef0",backdropFilter:"blur(12px)",borderBottom:`1px solid ${theme.accent}22` }}>
          <div>
            <h2 style={{ fontSize: isMobile?16:20, fontWeight:900, color:"white" }}>📸 Photo Manager</h2>
            {!isMobile && <p style={{ fontSize:11,color:"rgba(255,255,255,0.4)",fontWeight:600,marginTop:2 }}>Assign photos per month or apply one to all</p>}
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <ImgBtn label="Apply to ALL" icon="✨" accent={theme.accent} bg="#0e0e0e" onImage={onAllPhoto} glow small={isMobile}/>
            <button onClick={onClose} style={{ width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.5)",fontSize:16,background:"#ffffff10",cursor:"pointer" }}>✕</button>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap: isMobile?6:14, padding: isMobile?"10px 10px 20px":"18px 20px 24px" }}>
          {MONTHS.map((m,i)=>{
            const t = MONTH_THEMES[i];
            const p = photos[i];
            return (
              <div key={i} style={{ borderRadius: isMobile?10:14, overflow:"hidden", background:t.bg, border:`1px solid ${t.accent}22` }}>
                <div style={{ position:"relative", height: isMobile?64:96, background:`${t.accent}10` }}>
                  {p ? (
                    <>
                      <img src={p} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                      <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 40%,#000a)" }}/>
                      <button onClick={()=>onRemovePhoto(i)} style={{ position:"absolute",top:4,right:4,width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900,background:"#ff4444cc",color:"#fff",cursor:"pointer" }}>✕</button>
                      <span style={{ position:"absolute",bottom:4,left:6,fontSize:9,fontWeight:900,color:"white" }}>{m}</span>
                    </>
                  ) : (
                    <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,opacity:0.2 }}>
                      <span style={{ fontSize: isMobile?18:26 }}>🖼️</span>
                      <span style={{ fontSize:9,color:"white",fontWeight:700 }}>{m}</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: isMobile?"4px 6px":"8px" }}>
                  <ImgBtn label={p?"Change":"Add"} icon={p?"🔄":"📷"} accent={t.accent} bg={t.bg} onImage={img=>onMonthPhoto(i,img)} small/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
