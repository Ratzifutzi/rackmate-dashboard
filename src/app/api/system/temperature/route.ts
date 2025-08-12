import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET(request: NextRequest): Promise<NextResponse> {
	const raw = await fs.readFile("/sys/class/thermal/thermal_zone0/temp", "utf8");

	return NextResponse.json({ temp: parseInt(raw.trim(), 10) / 1000 }); // e.g., 50123 -> 50.123 °C
}
