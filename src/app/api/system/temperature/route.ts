import si from "systeminformation";

export async function GET() {
	const temperature = await si.cpuTemperature();
	console.log("CPU Temperature:", temperature);

	return new Response(JSON.stringify(temperature), {
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "no-store, no-cache, must-revalidate",
		},
	});
}
