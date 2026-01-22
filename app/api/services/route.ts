import { NextResponse } from "next/server";
import { services } from "@/data/services";

export async function GET() {
  return NextResponse.json({ services });
}
