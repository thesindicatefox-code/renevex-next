"use client";
import { useEffect, useRef, useState } from "react";

export default function WashGame(){
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("foam");
  const [isDown, setIsDown] = useState(false);

  useEffect(()=>{
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#111418"; ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = "#1f2430"; ctx.fillRect(0,c.height-120,c.width,120);
    ctx.fillStyle = "#b0b6bf";
    ctx.beginPath();
    ctx.moveTo(60,260); ctx.quadraticCurveTo(140,190,240,190);
    ctx.quadraticCurveTo(360,190,440,240);
    ctx.lineTo(500,240); ctx.quadraticCurveTo(560,240,560,280);
    ctx.lineTo(560,300); ctx.lineTo(60,300); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#222"; ctx.beginPath(); ctx.arc(180,300,26,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(420,300,26,0,Math.PI*2); ctx.fill();
  },[]);

  function draw(e){
    if(!isDown) return;
    const c = canvasRef.current; const rect = c.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    const ctx = c.getContext("2d");
    if(tool==="foam"){ ctx.fillStyle="rgba(0,255,120,0.6)"; ctx.beginPath(); ctx.arc(x,y,14,0,Math.PI*2); ctx.fill(); }
    else if(tool==="sponge"){ ctx.fillStyle="rgba(0,255,120,0.35)"; ctx.beginPath(); ctx.arc(x,y,18,0,Math.PI*2); ctx.fill(); }
    else if(tool==="water"){ ctx.globalCompositeOperation="destination-out"; ctx.beginPath(); ctx.arc(x,y,20,0,Math.PI*2); ctx.fill(); ctx.globalCompositeOperation="source-over"; }
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Игра: Пена на Porsche 911</h1>
      <p className="text-sm text-gray-300 mt-1">Шаги: 1) Пена (зелёная) → 2) Губка → 3) Вода</p>
      <div className="mt-3 flex gap-2">
        <button className={`btn ${tool==="foam"?"btn-primary":"btn-ghost"}`} onClick={()=>setTool("foam")}>Пена</button>
        <button className={`btn ${tool==="sponge"?"btn-primary":"btn-ghost"}`} onClick={()=>setTool("sponge")}>Губка</button>
        <button className={`btn ${tool==="water"?"btn-primary":"btn-ghost"}`} onClick={()=>setTool("water")}>Вода</button>
      </div>
      <canvas
        ref={canvasRef} width={640} height={360}
        className="mt-4 rounded-xl border border-white/10 bg-black/20 touch-none"
        onMouseDown={()=>setIsDown(true)} onMouseUp={()=>setIsDown(false)} onMouseMove={draw}
        onTouchStart={()=>setIsDown(true)} onTouchEnd={()=>setIsDown(false)} onTouchMove={draw}
      />
    </div>
  );
}
