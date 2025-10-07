"use client";
import { useEffect, useState } from "react";

function getUID(){
  if(typeof window==="undefined") return "anon";
  let u = localStorage.getItem("rx_uid");
  if(!u){ u = crypto.randomUUID(); localStorage.setItem("rx_uid", u); }
  return u;
}

export default function BonusBar() {
  const [points, setPoints] = useState(0);
  const uid = getUID();

  async function refresh(){
    const r = await fetch(`/api/points?uid=${uid}`);
    const j = await r.json();
    setPoints(Number(j.points||0));
  }
  useEffect(()=>{ refresh(); }, []);

  async function add(n){
    const r = await fetch("/api/points", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ uid, delta: n }) });
    const j = await r.json(); setPoints(Number(j.points||0));
  }
  async function redeem(){
    if(points<100) return alert("Нужно минимум 100 баллов (=$5) для обмена.");
    const r = await fetch("/api/points", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ uid, redeem: 100 }) });
    const j = await r.json(); setPoints(Number(j.points||0));
    alert("Супер! −$5 будет применено к ближайшей броне (запишите код: BONUS5).");
  }

  return (
    <div className="card mt-6 flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-400">Бонусная программа</div>
        <div className="text-xl font-semibold">Баллы: {points}</div>
      </div>
      <div className="flex gap-2">
        <button onClick={()=>add(10)} className="btn btn-ghost">+10</button>
        <button onClick={redeem} className="btn btn-primary">Обменять</button>
      </div>
    </div>
  );
}
