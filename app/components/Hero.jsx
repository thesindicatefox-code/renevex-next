"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-16 sm:py-24 text-center">
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-accent">ReneveX</span> Premium Detailing
      </motion.h1>
      <motion.p
        className="mt-4 text-gray-300 max-w-2xl mx-auto"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
      >
        Детейлинг уровня шоу-рума — у вас во дворе. Эко‑средства, страховка и сервис класса люкс.
      </motion.p>
      <motion.div initial={{ scale: .95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .4 }}>
        <Link href="/booking" className="mt-8 inline-block btn btn-primary">Забронировать</Link>
      </motion.div>
      <div className="mt-6 flex gap-4 justify-center text-sm text-gray-400">
        <span className="badge">Insured</span>
        <span className="badge">Eco‑friendly</span>
        <span className="badge">5★ Rated</span>
      </div>
    </section>
  );
}
