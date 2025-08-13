import si from "systeminformation";

export async function GET() {
	const ram = await si.mem();

	// Calculate RAM usage percentage
	const ramUsagePercentage = (ram.used / ram.total) * 100;

	return new Response(JSON.stringify(ramUsagePercentage), {
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "no-store, no-cache, must-revalidate",
		},
	});
}
