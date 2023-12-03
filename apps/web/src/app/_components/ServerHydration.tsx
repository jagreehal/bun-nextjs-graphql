import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { serverPreFetch } from '@/remote/query-utils';
import { useGetPostQuery } from '@/remote/gql-generated';
import { ClientPreFetch } from './ClientPreFetch';

export async function ServerHydration() {
	const queryClient = await serverPreFetch(useGetPostQuery, {
		cache: 'force-cache',
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ClientPreFetch />
		</HydrationBoundary>
	);
}
