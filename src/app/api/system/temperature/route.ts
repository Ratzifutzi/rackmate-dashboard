import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import si from "systeminformation";

export async function GET(request: NextRequest): Promise<NextResponse> {
	return NextResponse.json({ temp: await si.cpuTemperature() });
}
