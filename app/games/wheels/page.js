"use client";
import { useEffect, useRef, useState } from "react";

export default function WheelsGame(){
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("foam");
  const [isDown, setIsDown] = useState(false);

  useEffect(()=>{
    const c = canvasRef.current; const ctx = c.getContext("2d");
    ctx.fillStyle = "#111418"; ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = "#181a1f"; ctx.beginPath(); ctx.arc(320,200,120,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = "#2a2f38"; ctx.font = "14px sans-serif"; ctx.fillText("MICHELIN", 270, 90);
    ctx.fillStyle = "#b8bec8"; ctx.beginPath(); ctx.arc(320,200,86,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = "#8f99a6"; ctx.lineWidth = 8;
    for(let a=0; a<6; a++){
      const angle = a * Math.PI/3;
      const x1 = 320 + Math.cos(angle)*20, y1 = 200 + Math.sin(angle)*20;
      const x2 = 320 + Math.cos(angle)*80, y2 = 200 + Math.sin(angle)*80;
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    }
  },[]);

  function draw(e){
    if(!isDown) return;
    const c = canvasRef.current; const rect = c.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    const ctx = c.getContext("2d");
    if(tool==="foam"){ ctx.fillStyle="rgba(0,255,120,0.6)"; ctx.beginPath(); ctx.arc(x,y,14,0,Math.PI*2); ctx.fill(); }
    else if(tool==="brush"){ ctx.fillStyle="rgba(0,255,120,0.35)"; ctx.beginPath(); ctx.arc(x,y,18,0,Math.PI*2); ctx.fill(); }
    else if(tool==="water"){ ctx.globalCompositeOperation="destination-out"; ctx.beginPath(); ctx.arc(x,y,22,0,Math.PI*2); ctx.fill(); ctx.globalCompositeOperation="source-over"; }
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Игра: Wheel Cleaner — BMW + Michelin</h1>
      <p className="text-sm text-gray-300 mt-1">Шаги: 1) Пена → 2) Щётка → 3) Смыть</p>
      <div className="mt-3 flex gap-2">
        <button className={`btn ${tool==="foam"?"btn-primary":"btn-ghost"}`} onClick={()=>setTool("foam")}>Пена</button>
        <button className={`btn ${tool==="brush"?"btn-primary":"btn-ghost"}`} onClick={()=>setTool("brush")}>Щётка</button>
        <button className={`btn ${tool==="water"?"btn-primary":"btn-ghost"}`} onClick={()=>setTool("water")}>Вода</button>
      </div>
      <canvas
        ref={canvasRef} width={640} height={400}
        className="mt-4 rounded-xl border border-white/10 bg-black/20 touch-none"
        onMouseDown={()=>setIsDown(true)} onMouseUp={()=>setIsDown(false)} onMouseMove={draw}
        onTouchStart={()=>setIsDown(true)} onTouchEnd={()=>setIsDown(false)} onTouchMove={draw}
      />
    </div>
  );
}
