import { NextResponse } from 'next/server';

type Params = {
	params: Promise<{
		action: string;
		id: string;
	}>;
};

export async function GET(_req: Request, context: Params) {
	const { action: rawAction, id: rawId } =
		await context.params;

	let action = rawAction;
	let id = rawId;

	if (!action || !id) {
		try {
			const url = new URL(_req.url);
			const parts = url.pathname.split('/').filter(Boolean);
			const relayIdx = parts.findIndex(
				(p) => p === 'relay',
			);
			if (relayIdx !== -1 && parts.length >= relayIdx + 3) {
				action = parts[relayIdx + 1];
				id = parts[relayIdx + 2];
			}
		} catch {}
	}

	if (!['on', 'off'].includes(action)) {
		return NextResponse.json(
			{ error: 'Invalid action' },
			{ status: 400 },
		);
	}

	const relayId = Number(id);
	if (!Number.isFinite(relayId) || relayId <= 0) {
		return NextResponse.json(
			{ error: 'Invalid relay id' },
			{ status: 400 },
		);
	}

	const baseUrl = 'http://192.168.178.106';
	const target = `${baseUrl}/${action}/${relayId}`;

	try {
		const res = await fetch(target, {
			method: 'GET',
			cache: 'no-store',
		});
		const text = await res.text();
		if (!res.ok) {
			return NextResponse.json(
				{
					error: `Upstream error: ${text || res.statusText}`,
				},
				{ status: 502 },
			);
		}

		return new NextResponse(text, {
			status: 200,
			headers: {
				'content-type': 'text/plain; charset=utf-8',
			},
		});
	} catch (err: unknown) {
		return NextResponse.json(
			{
				error: `Proxy request failed: ${
					err instanceof Error
						? err.message
						: 'unknown error'
				}`,
			},
			{ status: 502 },
		);
	}
}
