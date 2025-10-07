export default function ContactPage(){
  return (
    <div className="py-10">
      <h1 className="text-3xl sm:text-4xl font-bold">Контакты</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="card">
          <h3 className="text-xl font-semibold">Написать</h3>
          <div className="mt-3 grid gap-2 text-gray-300">
            <a className="underline" href="mailto:vladyslavpukas08@gmail.com">vladyslavpukas08@gmail.com</a>
            <a className="underline" href="https://t.me/vpnxl" target="_blank">Telegram: @vpnxl</a>
            <a className="underline" href="https://www.facebook.com" target="_blank">Facebook: Vladyslav Pukas</a>
          </div>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold">Локация и часы</h3>
          <ul className="mt-3 text-gray-300 text-sm">
            <li>Minneapolis, MN</li>
            <li>Пн–Пт: 8:00–18:00</li>
            <li>Сб: 9:00–16:00</li>
            <li>Вс: Выходной</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
