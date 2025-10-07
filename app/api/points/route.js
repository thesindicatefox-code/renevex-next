import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";

function key(uid){ return `rx:points:${uid}`; }

export async function GET(req){
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");
  if(!uid) return NextResponse.json({ ok:false, error:"uid required" }, { status:400 });
  if(!redis) return NextResponse.json({ ok:true, points: Number(globalThis?.__points?.[uid]||0), emu:true });
  const pts = Number(await redis.get(key(uid))||0);
  return NextResponse.json({ ok:true, points: pts });
}

export async function POST(req){
  const body = await req.json().catch(()=> ({}));
  const { uid, delta, redeem } = body||{};
  if(!uid) return NextResponse.json({ ok:false, error:"uid required" }, { status:400 });

  if(!redis){
    globalThis.__points = globalThis.__points || {};
    const cur = Number(globalThis.__points[uid]||0);
    const next = redeem ? Math.max(0, cur - Number(redeem)) : cur + Number(delta||0);
    globalThis.__points[uid] = next;
    return NextResponse.json({ ok:true, points: next, emu:true });
  }

  if(redeem){
    const cur = Number(await redis.get(key(uid))||0);
    const next = Math.max(0, cur - Number(redeem));
    await redis.set(key(uid), next);
    return NextResponse.json({ ok:true, points: next });
  } else {
    const next = await redis.incrby(key(uid), Number(delta||0));
    return NextResponse.json({ ok:true, points: Number(next) });
  }
}
