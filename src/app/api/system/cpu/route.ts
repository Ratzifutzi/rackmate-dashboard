import si from "systeminformation";

export async function GET() {
	const load = await si.currentLoad();

	return new Response(JSON.stringify(load.currentLoad), {
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "no-store, no-cache, must-revalidate",
		},
	});
}
