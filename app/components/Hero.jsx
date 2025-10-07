export default function Hero() {
  return (
    <section className="py-16 sm:py-24 text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold">
        <span className="text-accent">Renevex</span> Premium
      </h1>
      <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
        App Router + Tailwind готовы к продакшену 🚀
      </p>
      <div className="mt-8">
        <a
          href="#cta"
          className="inline-block rounded-xl bg-accent px-6 py-3 font-medium hover:opacity-90 transition"
        >
          Начать
        </a>
      </div>
    </section>
  );
}
