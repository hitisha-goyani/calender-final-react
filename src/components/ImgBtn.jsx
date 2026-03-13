import { useRef } from "react";
import { readFileAsDataURL } from "../utils";

export default function ImgBtn({ label, icon, accent, bg, onImage, glow=false, small=false }) {
  const ref = useRef();
  async function handle(e) {
    const f = e.target.files[0]; if (!f) return;
    onImage(await readFileAsDataURL(f)); e.target.value="";
  }
  return (
    <>
      <input ref={ref} type="file" accept="image/*" style={{display:"none"}} onChange={handle}/>
      <button onClick={()=>ref.current.click()} style={{
        display:"flex", alignItems:"center", gap: small?4:6,
        padding: small ? "4px 8px" : "6px 12px",
        borderRadius: small?8:10, fontWeight:900,
        fontSize: small?9:11, letterSpacing:"0.1em", textTransform:"uppercase",
        whiteSpace:"nowrap", cursor:"pointer",
        background: glow ? `linear-gradient(135deg,${accent},${accent}88)` : `${accent}22`,
        color: glow ? bg : accent,
        border: glow ? "none" : `1.5px solid ${accent}44`,
        boxShadow: glow ? `0 4px 16px ${accent}44` : "none",
        transition:"transform .15s",
      }}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
      >
        <span style={{fontSize: small?12:14}}>{icon}</span>
        <span>{label}</span>
      </button>
    </>
  );
}
