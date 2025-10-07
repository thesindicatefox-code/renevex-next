import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
  try {
    const data = await req.json();
    const required = ["name","phone","email","date","time","address","pkg"];
    for (const k of required) {
      if (!data[k]) return NextResponse.json({ ok:false, error:`Missing field: ${k}` }, { status: 400 });
    }

    // Email via Resend (optional)
    let emailOk = false;
    const resendKey = process.env.RESEND_API_KEY;
    const receiver = process.env.RECEIVER_EMAIL || "vladyslavpukas08@gmail.com";
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const subject = `ReneveX Booking — ${data.name}`;
        const html = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        await resend.emails.send({ from: "ReneveX <noreply@renevex.app>", to: receiver, subject, html });
        emailOk = true;
      } catch (e) { console.error("Resend error:", e?.message); }
    }

    // Telegram (optional)
    let tgOk = false;
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && chatId) {
      try {
        const text = [
          "🧼 *ReneveX — новая бронь*",
          `*Имя:* ${data.name}`,
          `*Телефон:* ${data.phone}`,
          `*Email:* ${data.email}`,
          `*Дата/время:* ${data.date} ${data.time}`,
          `*Адрес:* ${data.address}`,
          `*Пакет:* ${data.pkg}`,
          data.notes ? `*Заметки:* ${data.notes}` : ""
        ].filter(Boolean).join("\n");
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" })
        });
        tgOk = true;
      } catch (e) { console.error("Telegram error:", e?.message); }
    }

    return NextResponse.json({ ok:true, emailOk, tgOk });
  } catch (e) {
    return NextResponse.json({ ok:false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
