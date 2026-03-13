import { useState } from "react";
import { MONTHS } from "../constants";

export default function AddEventModal({ selectedDate, theme, onAdd, onClose }) {
  const [text, setText] = useState("");
  function handle() { if (!text.trim()) return; onAdd(text.trim()); setText(""); }
  return (
    <div style={{ position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"flex-end",justifyContent:"center",background:"#00000088",backdropFilter:"blur(8px)" }}>
      <div style={{ borderRadius:"20px 20px 0 0",padding:"24px 20px 36px",width:"100%",maxWidth:480,background:theme.bg,border:`1px solid ${theme.accent}44` }}>
        <div style={{ display:"flex",justifyContent:"center",marginBottom:16 }}>
          <div style={{ width:36,height:4,borderRadius:4,background:`${theme.accent}44` }}/>
        </div>
        <h3 style={{ fontSize:20,fontWeight:900,color:"white",marginBottom:4 }}>Add Event</h3>
        <p style={{ fontSize:12,color:"white",opacity:0.45,marginBottom:20 }}>
          {selectedDate ? `${MONTHS[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}` : ""}
        </p>
        <input
          style={{ width:"100%",borderRadius:12,padding:"12px 16px",color:"white",fontSize:14,fontWeight:600,background:"#ffffff12",border:`1px solid ${theme.accent}44`,caretColor:theme.accent,marginBottom:16 }}
          placeholder="Event title..."
          value={text}
          onChange={e=>setText(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&handle()}
          autoFocus
        />
        <div style={{ display:"flex",gap:10 }}>
          <button onClick={onClose} style={{ flex:1,padding:"12px 0",borderRadius:12,fontSize:13,fontWeight:900,background:"#ffffff12",color:"#ffffff88",cursor:"pointer" }}>Cancel</button>
          <button onClick={handle} style={{ flex:1,padding:"12px 0",borderRadius:12,fontSize:13,fontWeight:900,background:theme.accent,color:theme.bg,cursor:"pointer" }}>Add Event</button>
        </div>
      </div>
    </div>
  );
}
