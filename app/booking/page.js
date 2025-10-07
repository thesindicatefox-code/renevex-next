"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function BookingPage(){
  const params = useSearchParams();
  const [form, setForm] = useState({ name:"", phone:"", email:"", date:"", time:"", address:"", pkg: params.get("pkg")||"" });
  const [msg, setMsg] = useState("");
  const tomorrow = useMemo(()=>{ const d=new Date(); d.setDate(d.getDate()+1); return d.toISOString().split("T")[0]; },[]);
  const earlyBird = useMemo(()=> form.date ? ((new Date(form.date)-new Date())/86400000)>=7 : false, [form.date]);

  async function submit(e){
    e.preventDefault();
    const required = ["name","phone","email","date","time","address","pkg"];
    for(const k of required){ if(!form[k]) return setMsg("Заполните все обязательные поля."); }
    setMsg("Отправка запроса...");
    try{
      const res = await fetch("/api/booking", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(form) });
      const json = await res.json();
      if(!res.ok || !json.ok) throw new Error(json.error || "Ошибка отправки");
      const pts = Number(localStorage.getItem("rx_points")||0) + 20;
      localStorage.setItem("rx_points", pts);
      setMsg("Готово! Мы получили вашу заявку. Ответ придёт на email/Telegram.");
    }catch(err){
      setMsg("Не удалось отправить через API. Напишите на почту: vladyslavpukas08@gmail.com");
    }
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl sm:text-4xl font-bold">Бронирование</h1>
      <p className="text-gray-300 mt-2">Мы приедем к вам с водой и энергией — полностью автономно.</p>

      <form onSubmit={submit} className="card mt-6 grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm text-gray-400">Имя*</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-xl bg-white text-black" placeholder="John Carter"/></div>
        <div><label className="text-sm text-gray-400">Телефон*</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-xl bg-white text-black" placeholder="(612) ___-____"/></div>
        <div><label className="text-sm text-gray-400">Email*</label><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-xl bg-white text-black" placeholder="you@example.com"/></div>
        <div><label className="text-sm text-gray-400">Адрес*</label><input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-xl bg-white text-black" placeholder="Street, City"/></div>
        <div><label className="text-sm text-gray-400">Дата*</label><input type="date" min={tomorrow} value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-xl bg-white text-black"/></div>
        <div><label className="text-sm text-gray-400">Время*</label>
          <select value={form.time} onChange={e=>setForm({...form,time:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-xl bg-white text-black">
            <option value="">Выберите…</option>
            <option>8:00 AM</option><option>10:30 AM</option><option>1:00 PM</option><option>3:30 PM</option>
          </select>
        </div>
        <div className="sm:col-span-2"><label className="text-sm text-gray-400">Пакет*</label>
          <select value={form.pkg} onChange={e=>setForm({...form,pkg:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-xl bg-white text-black">
            <option value="">Выберите пакет…</option>
            <option value="express">Express Wash — $75–$95</option>
            <option value="interior">Interior Standard — $130–$160</option>
            <option value="full">Full Detail — $220–$280</option>
            <option value="premium">Premium Protection — $350–$450</option>
          </select>
        </div>
        <div className="sm:col-span-2"><label className="text-sm text-gray-400">Заметки</label><textarea onChange={e=>setForm({...form,notes:e.target.value})} rows={3} className="w-full mt-1 px-3 py-2 rounded-xl bg-white text-black" placeholder="Тип авто, пожелания..."/></div>
        {msg && <div className="sm:col-span-2 text-emerald-400">{msg}</div>}
        {earlyBird && <div className="sm:col-span-2 text-sm text-amber-300">Раннее бронирование: скидка 10% будет применена при подтверждении.</div>}
        <button className="sm:col-span-2 btn btn-primary mt-2">Отправить запрос</button>
      </form>
    </div>
  );
}
