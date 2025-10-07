"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BonusBar from "../components/BonusBar";
import ReferralWidget from "../components/ReferralWidget";
import Link from "next/link";

const PKGS = [
  { key:"express", name:"Express Wash", price:"$75–$95", popular:false, items:[
    "Предварительный ополаскиватель и пена (безопасная)",
    "Мойка по двухведёрной технологии",
    "Колёса, шины, стёкла снаружи"
  ]},
  { key:"interior", name:"Interior Standard", price:"$130–$160", popular:true, items:[
    "Полный пылесос (включая щели и багажник)",
    "Чистка пластика и санобработка зон касания",
    "Стёкла внутри/снаружи"
  ]},
  { key:"full", name:"Full Detail", price:"$220–$280", popular:false, items:[
    "Express Wash + Interior Standard",
    "Клейбор там, где нужно",
    "Спрей‑силиант 3–4 мес"
  ]},
  { key:"premium", name:"Premium Protection", price:"$350–$450", popular:false, items:[
    "Деконтаминация (iron/tar)",
    "One‑step полировка (глосс)",
    "Керамический спрей 6–9 мес"
  ]},
];

export default function ServicesPage(){
  const [selected, setSelected] = useState("");

  return (
    <div className="py-10">
      <h1 className="text-3xl sm:text-4xl font-bold">Пакеты услуг</h1>
      <p className="text-gray-300 mt-2">Средние цены для Minneapolis–St. Paul. SUV/третья рядность +$20–40; сильные загрязнения — по месту.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {PKGS.map(p => {
          const isSel = selected === p.key;
          return (
            <div key={p.key} className={`card ${isSel ? "ring-2 ring-accent" : ""}`}>
              {p.popular && <div className="badge bg-accent/20 text-accent">Популярный</div>}
              <h3 className="text-xl font-semibold mt-2">{p.name}</h3>
              <div className="text-3xl font-extrabold mt-2">{p.price}</div>
              <ul className="mt-3 text-sm text-gray-300 space-y-1">
                {p.items.map(it => <li key={it}>• {it}</li>)}
              </ul>
              <button
                className={`mt-4 btn ${isSel ? "btn-ghost" : "btn-primary"}`}
                onClick={()=> setSelected(isSel ? "" : p.key)}
              >
                {isSel ? "Selected" : "Select"}
              </button>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="card mt-8"
          >
            <h4 className="text-2xl font-bold">Подробно: {PKGS.find(p=>p.key===selected)?.name}</h4>
            <ol className="list-decimal list-inside mt-3 space-y-1 text-gray-200">
              {selected==="express" && [
                "Прополаскивание + пена (Koch GSF)",
                "Щётки по значкам/эмблемам",
                "Мойка руками, проёмы",
                "Колёса/аркЫ/шины",
                "Сушка без пятен, микрофибра",
                "Стёкла, лёгкий сатиновый шин‑дрессинг",
              ].map((s,i)=><li key={i}>{s}</li>)}

              {selected==="interior" && [
                "Полный пылесос, включая багажник",
                "Продувка пыли компрессором/кистями",
                "Чистка пластика, санитизация зон касания",
                "Ткани — спот‑чистка; кожа — чистка+кондиционер",
                "Стёкла без разводов",
              ].map((s,i)=><li key={i}>{s}</li>)}

              {selected==="full" && [
                "Процесс Express Wash",
                "Iron/tar тест; клейбор по необходимости",
                "Сушим и наносим спрей‑силиант",
                "Процесс Interior Standard",
                "Финальный осмотр",
              ].map((s,i)=><li key={i}>{s}</li>)}

              {selected==="premium" && [
                "Пена + контактная мойка + деконтаминация (iron/tar)",
                "Клейбар; one‑step полировка (глосс‑буст)",
                "Обезжиривание; керамический спрей (6–9 мес)",
                "Силант на диски; шины — сатин",
                "Тритмент стёкол; финальный QC",
              ].map((s,i)=><li key={i}>{s}</li>)}
            </ol>
            <div className="mt-4 flex gap-2">
              <Link href={`/booking?pkg=${selected}`} className="btn btn-primary">Забронировать пакет</Link>
              <button className="btn btn-ghost" onClick={()=>setSelected("")}>Скрыть</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BonusBar />
      <ReferralWidget />
    </div>
  );
}
