"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/booking", label: "Бронирование" },
  { href: "/contact", label: "Контакты" },
  { href: "/card", label: "Визитка" },
  { href: "/games/wash", label: "Игра: Пена" },
  { href: "/games/wheels", label: "Игра: Колёса" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="w-full sticky top-0 z-40 backdrop-blur bg-black/20">
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold tracking-wide">
          <span className="text-accent">ReneveX</span> Premium
        </Link>
        <ul className="hidden lg:flex gap-5 text-sm text-gray-300">
          {links.map(l => (
            <li key={l.href}>
              <Link
                className={pathname===l.href ? "text-white" : "hover:text-white"}
                href={l.href}
              >{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="h-px w-full bg-white/5" />
    </header>
  );
}
