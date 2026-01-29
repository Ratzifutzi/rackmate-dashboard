import { toaster } from '@/components/ui/toaster';

export default function toggleAll(
	on: boolean,
	setLoading: (loading: boolean) => void,
) {
	setLoading(true);
	const ids = [1, 2, 3, 4, 5, 6, 7, 8];

	const promise = (async () => {
		for (const id of ids) {
			const res = await fetch(
				`http://192.168.178.106/${on ? 'on' : 'off'}/${id}`,
				{
					method: 'GET',
					priority: 'high',
					cache: 'no-store',
				},
			);
			if (!res.ok) {
				throw new Error(`Request failed for relay ${id}`);
			}
		}
	})();
	promise.finally(() => setLoading(false));

	toaster.promise(promise, {
		loading: {
			title: on
				? 'Turning all relays ON'
				: 'Turning all relays OFF',
		},
		success: {
			title: on
				? 'All relays have been turned ON'
				: 'All relays have been turned OFF',
		},
		error: {
			title:
				'An error occurred while chaning one or more relays',
		},
	});
}
