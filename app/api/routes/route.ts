import { NextResponse } from "next/server";
import { buildRouteOptions } from "@/lib/pricing";
import { weatherConditions } from "@/data/mockWeather";

export async function POST(request: Request) {
  const body = await request.json();
  const distance = Number(body.distance ?? 5);
  const hour = new Date().getHours();
  const weather = weatherConditions[hour % weatherConditions.length];
  const preference = body.preference ?? "fast";
  const routes = buildRouteOptions(distance, hour, weather, preference);
  return NextResponse.json({ routes });
}
