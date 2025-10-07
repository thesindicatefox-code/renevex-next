"use client";
import { useState } from "react";
import Link from "next/link";

export default function CardPage(){
  const [flip, setFlip] = useState(false);
  return (
    <div className="py-10">
      <h1 className="text-3xl sm:text-4xl font-bold">Визитка ReneveX</h1>
      <p className="text-gray-300 mt-2">Нажмите на карточку, чтобы перевернуть «лицо/оборот».</p>

      <div className="mt-6 perspective">
        <div
          className={`preserve-3d transition-transform duration-700 [transform-style:preserve-3d] ${flip ? "[transform:rotateY(180deg)]" : ""}`}
          onClick={()=>setFlip(!flip)}
        >
          <div className="card h-64 sm:h-72 w-full sm:w-[640px] mx-auto [backface-visibility:hidden]">
            <div className="text-2xl font-bold"><span className="text-accent">ReneveX</span> Premium</div>
            <p className="mt-2 text-gray-300">Премиум мобильный детейлинг. Minneapolis–St. Paul.</p>
            <ul className="mt-4 text-gray-300 text-sm space-y-1">
              <li>• Интерьер, экстерьер, защита</li>
              <li>• Раннее бронирование −10%</li>
              <li>• Игра: пена на Porsche 911</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <Link href="/services" className="btn btn-primary">Услуги</Link>
              <Link href="/booking" className="btn btn-ghost">Бронь</Link>
            </div>
          </div>
          <div className="card h-64 sm:h-72 w-full sm:w-[640px] mx-auto [transform:rotateY(180deg)] [backface-visibility:hidden] -mt-64 sm:-mt-72">
            <div className="text-xl font-semibold">Контакты</div>
            <div className="mt-3 grid gap-2">
              <a className="underline" href="mailto:vladyslavpukas08@gmail.com">vladyslavpukas08@gmail.com</a>
              <a className="underline" href="https://t.me/vpnxl" target="_blank">Telegram: @vpnxl</a>
              <a className="underline" href="https://www.facebook.com" target="_blank">Facebook: Vladyslav Pukas</a>
            </div>
            <div className="mt-3 text-gray-300 text-sm">
              Minneapolis, MN • Пн–Пт 8:00–18:00 • Сб 9:00–16:00
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`.perspective{perspective:1000px}`}</style>
    </div>
  );
}
