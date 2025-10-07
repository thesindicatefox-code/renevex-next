"use client";
import { motion } from "framer-motion";

const items = [
  { title: "Интерьер", desc: "Пылесос, щётки, пар—чистка, уход за кожей.", icon: "🧼" },
  { title: "Экстерьер", desc: "Двухведёрная мойка, пена, колёса, стёкла.", icon: "🚿" },
  { title: "Защита", desc: "Глина/деконтаминация, полировка, спрей‑керамика.", icon: "🛡️" },
];

export default function Features() {
  return (
    <section id="features" className="py-12 sm:py-16">
      <h2 className="text-3xl font-semibold text-center">Что вы получаете</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.08 }}
            className="card"
          >
            <div className="text-3xl">{it.icon}</div>
            <h3 className="mt-3 text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-gray-300">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
