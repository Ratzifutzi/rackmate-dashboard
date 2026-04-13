import { toaster } from '@/components/ui/toaster';

export default function toggleOne(
	on: boolean,
	id: number,
	setLoading: (loading: boolean) => void,
) {
	setLoading(true);

	const promise = (async () => {
		await fetch(`/api/relay/${on ? 'on' : 'off'}/${id}`, {
			method: 'GET',
			priority: 'high',
			cache: 'no-store',
		}).catch(() => {
			throw new Error(`Request failed for relay ${id}`);
		});
	})();
	promise.finally(() => setLoading(false));

	toaster.promise(promise, {
		loading: {
			title: on
				? `Turning relay ${id} ON`
				: `Turning relay ${id} OFF`,
		},
		success: {
			title: on
				? `Relay ${id} has been turned ON`
				: `Relay ${id} has been turned OFF`,
		},
		error: {
			title:
				'An error occurred while chaning one or more relays',
		},
	});
}
