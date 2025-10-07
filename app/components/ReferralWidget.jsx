"use client";
import { useEffect, useState } from "react";

function getUID(){
  if(typeof window==="undefined") return "anon";
  let u = localStorage.getItem("rx_uid");
  if(!u){ u = crypto.randomUUID(); localStorage.setItem("rx_uid", u); }
  return u;
}

export default function ReferralWidget() {
  const [code, setCode] = useState("");
  const uid = getUID();

  useEffect(() => {
    async function run(){
      const r = await fetch(`/api/referral?uid=${uid}`); const j = await r.json(); setCode(j.code);
    }
    run();
  }, [uid]);

  const link = typeof window !== "undefined" ? `${window.location.origin}?ref=${code}` : `https://renevex.app?ref=${code}`;

  return (
    <div className="card mt-6">
      <div className="text-sm text-gray-400">Реферальная программа</div>
      <div className="mt-1">Ваш код: <b>{code}</b></div>
      <div className="mt-2 break-all text-gray-300">{link}</div>
      <p className="mt-2 text-sm text-gray-400">За каждого друга: +100 баллов. 100 баллов = $5 скидки.</p>
    </div>
  );
}
