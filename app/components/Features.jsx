const items = [
  { title: "Быстро", desc: "Мгновенные деплои и CDN от Vercel." },
  { title: "Красиво", desc: "Tailwind = чистая и гибкая стилизация." },
  { title: "Надёжно", desc: "App Router, RSC и SSR — для масштаба." },
];

export default function Features() {
  return (
    <section id="features" className="py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center">Преимущества</h2>
      <div className="mt-8 grid sm:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-gray-300">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
