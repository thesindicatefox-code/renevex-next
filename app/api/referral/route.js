import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";

function codeKey(uid){ return `rx:ref:code:${uid}`; }
function ownerKey(code){ return `rx:ref:owner:${code}`; }
function pointsKey(uid){ return `rx:points:${uid}`; }

function rnd(){ return Math.random().toString(36).slice(2,8).toUpperCase(); }

export async function GET(req){
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");
  if(!uid) return NextResponse.json({ ok:false, error:"uid required" }, { status:400 });

  if(!redis){
    globalThis.__ref = globalThis.__ref || {};
    if(!globalThis.__ref[uid]) globalThis.__ref[uid] = rnd();
    return NextResponse.json({ ok:true, code: globalThis.__ref[uid], emu:true });
  }

  let code = await redis.get(codeKey(uid));
  if(!code){
    code = rnd();
    await redis.set(codeKey(uid), code);
    await redis.set(ownerKey(code), uid);
  }
  return NextResponse.json({ ok:true, code });
}

export async function POST(req){
  const { code, uid } = await req.json().catch(()=> ({}));
  if(!code || !uid) return NextResponse.json({ ok:false, error:"code and uid required" }, { status:400 });

  if(!redis){
    // emulate: +100 points to ref owner
    globalThis.__ref = globalThis.__ref || {};
    const ownerUid = Object.keys(globalThis.__ref).find(k => globalThis.__ref[k]===code);
    if(!ownerUid) return NextResponse.json({ ok:false, error:"invalid code", emu:true }, { status:400 });
    globalThis.__points = globalThis.__points || {};
    globalThis.__points[ownerUid] = Number(globalThis.__points[ownerUid]||0)+100;
    return NextResponse.json({ ok:true, credited: ownerUid, emu:true });
  }

  const ownerUid = await redis.get(ownerKey(code));
  if(!ownerUid) return NextResponse.json({ ok:false, error:"invalid code" }, { status:400 });
  await redis.incrby(pointsKey(ownerUid), 100);
  return NextResponse.json({ ok:true, credited: ownerUid });
}
