import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" className="py-16 sm:py-20">
      <div className="card text-center">
        <h3 className="text-2xl font-semibold">Готовы забронировать?</h3>
        <p className="mt-2 text-gray-300">Раннее бронирование на 7+ дней — скидка 10%.</p>
        <Link href="/booking" className="mt-6 inline-block btn btn-primary">
          Перейти к бронированию
        </Link>
      </div>
    </section>
  );
}
