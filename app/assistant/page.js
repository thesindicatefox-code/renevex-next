"use client";
import { useState } from "react";
import Link from "next/link";

const Q = [
  { key:"size", q:"Какой у вас автомобиль?", options:["Седан/купе","Кроссовер","Большой SUV/минивэн","Пикап"] },
  { key:"interior", q:"Состояние салона?", options:["Лёгкая уборка","Средняя загрязнённость","Сильная/песок/шерсть"] },
  { key:"paint", q:"Состояние лакокраски?", options:["Хорошее","Есть шероховатость/налёт","Тусклая/мелкие царапины"] },
  { key:"goal", q:"Цель?", options:["Быстро освежить","Чистый салон","Полный блеск и защита"] },
];

function suggest(state){
  // простая логика
  if(state.goal==="Быстро освежить") return { pkg:"express", name:"Express Wash", why:"Нужно быстро освежить внешний вид." };
  if(state.goal==="Чистый салон") return { pkg:"interior", name:"Interior Standard", why:"Фокус на салон, стекло, зоны касания." };
  if(state.goal==="Полный блеск и защита"){
    if(state.paint!=="Хорошее") return { pkg:"premium", name:"Premium Protection", why:"Декон+полировка+керамический спрей дадут стойкий глянец." };
    return { pkg:"full", name:"Full Detail", why:"И салон, и кузов + защита — оптимальный баланс." };
  }
  return { pkg:"full", name:"Full Detail", why:"Универсальный выбор для большинства случаев." };
}

export default function Assistant(){
  const [idx, setIdx] = useState(0);
  const [state, setState] = useState({});
  const done = idx>=Q.length;
  const rec = suggest(state);

  function pick(v){
    const key = Q[idx].key;
    setState(s => ({ ...s, [key]: v }));
    setIdx(i => i+1);
  }

  return (
    <div className="py-10 max-w-2xl">
      <h1 className="text-3xl font-bold">AI‑Ассистент подбора пакета</h1>
      {!done ? (
        <div className="card mt-6">
          <div className="text-lg font-semibold">{Q[idx].q}</div>
          <div className="mt-4 grid sm:grid-cols-2 gap-2">
            {Q[idx].options.map(o => (
              <button key={o} className="btn btn-ghost" onClick={()=>pick(o)}>{o}</button>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-400">Шаг {idx+1} из {Q.length}</div>
        </div>
      ) : (
        <div className="card mt-6">
          <div className="text-lg">Рекомендация: <b>{rec.name}</b></div>
          <div className="text-gray-300 mt-1">Почему: {rec.why}</div>
          <Link href={`/booking?pkg=${rec.pkg}`} className="btn btn-primary mt-4">Забронировать {rec.name}</Link>
          <button className="btn btn-ghost mt-2" onClick={()=>{ setIdx(0); setState({}); }}>Пройти заново</button>
        </div>
      )}
    </div>
  );
}
