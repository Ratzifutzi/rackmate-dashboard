import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
	try {
		const raw = await fs.readFile("/sys/class/thermal/thermal_zone0/temp", "utf8");
		const temperature = parseInt(raw.trim(), 10) / 1000; // e.g., 50123 -> 50.123 °C
		return new NextResponse(JSON.stringify({ temperature }), {
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store, no-cache, must-revalidate",
			},
		});
	} catch (e: any) {
		return NextResponse.json({ error: e?.message ?? "read failed" }, { status: 500 });
	}
}
