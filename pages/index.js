import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="container py-14">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="ReneveX" className="h-8 w-8" />
          <b className="tracking-wide">ReneveX Detailing</b>
        </div>
        <Link href="/back" className="btn btn-ghost">Перевернуть визитку →</Link>
      </div>

      {/* hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 grid gap-6 md:grid-cols-2"
      >
        <div className="card p-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Премиальный мобильный детейлинг — у тебя во дворе
          </h1>
          <p className="mt-4 text-white/70">
            Эстетика Porsche × философия Ренессанса. Бронь онлайн, прозрачные цены,
            бонусы и реферал-система.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#booking" className="btn btn-primary">Забронировать</a>
            <a href="#packages" className="btn btn-ghost">Пакеты</a>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 120 }}
          className="card overflow-hidden"
        >
          <img
            alt="Porsche"
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </motion.section>

      {/* packages */}
      <section id="packages" className="mt-12 grid gap-6 md:grid-cols-4">
        {[
          { k: "express", title: "Express Wash", price: "$75–95", pts: ["Пена + бесконтакт", "Двухведерная мойка", "Диски/резина/стекла"] },
          { k: "int", title: "Interior", price: "$130–160", pts: ["Пылесос", "Пластик/кожа", "Стекла in/out"] },
          { k: "full", title: "Full Detail", price: "$220–280", pts: ["Экстерьер + интерьер", "Clay где нужно", "Спрей-силиант 3–4м"] },
          { k: "pro", title: "Premium Protection", price: "$350–450", pts: ["Декон (iron/tar)", "1-step полиш", "Керамик-топпер 6–9м"] }
        ].map(card => (
          <div key={card.k} className="card p-6">
            <div className="text-xl font-semibold">{card.title}</div>
            <div className="mt-2 text-3xl font-extrabold text-accent">{card.price}</div>
            <ul className="mt-3 text-sm text-white/70 space-y-1">
              {card.pts.map(p => <li key={p}>• {p}</li>)}
            </ul>
            <a href="#booking" className="btn btn-primary mt-4 w-full">Select</a>
          </div>
        ))}
      </section>

      {/* booking (без интеграций, чтобы билд был железный) */}
      <section id="booking" className="mt-12 card p-8">
        <h2 className="text-2xl font-bold">Бронирование</h2>
        <p className="text-white/70 mt-2">Заполни форму — мы подтвердим по Email/Telegram.</p>
        <form className="mt-6 grid gap-3 md:grid-cols-2">
          <input className="card p-3" placeholder="Имя" required />
          <input className="card p-3" placeholder="Телефон" required />
          <input className="card p-3 md:col-span-2" placeholder="Email" type="email" required />
          <input className="card p-3" placeholder="Дата" type="date" required />
          <select className="card p-3" required>
            <option value="">Пакет...</option>
            <option>Express</option><option>Interior</option><option>Full</option><option>Premium</option>
          </select>
          <textarea className="card p-3 md:col-span-2" rows="3" placeholder="Адрес и примечания"></textarea>
          <button className="btn btn-primary md:col-span-2">Отправить</button>
        </form>
      </section>

      {/* footer */}
      <footer className="mt-12 flex items-center justify-between text-sm text-white/60">
        <span>© {new Date().getFullYear()} ReneveX Detailing</span>
        <a className="underline" href="/back">Контакты →</a>
      </footer>
    </main>
  );
}
