import Link from "next/link";
import { motion } from "framer-motion";

export default function Back() {
  return (
    <main className="container py-14">
      <motion.div
        initial={{ rotateY: -180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
        className="card p-8"
      >
        <h2 className="text-2xl font-bold">Контакты • ReneveX</h2>
        <div className="mt-4 grid gap-2 text-white/80">
          <a href="mailto:vladyslavpukas08@gmail.com" className="underline">vladyslavpukas08@gmail.com</a>
          <a href="https://t.me/vpnxl" target="_blank" className="underline" rel="noreferrer">Telegram: @vpnxl</a>
          <a href="https://www.facebook.com" target="_blank" className="underline" rel="noreferrer">Facebook: Vladyslav Pukas</a>
          <span>Миннеаполис, MN</span>
        </div>
        <div className="mt-6 flex gap-3">
          <Link href="/" className="btn btn-ghost">← Обратная сторона</Link>
          <a href="/#booking" className="btn btn-primary">Забронировать</a>
        </div>
      </motion.div>
    </main>
  );
}
