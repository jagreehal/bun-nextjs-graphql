import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { serverPreFetch } from '@/graphql/query-utils';
import { useGetPostQuery } from '@/graphql/gql-generated';
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
