import { useGetPostsQuery } from '@/graphql/generated';
import { serverFetch } from '@/graphql/query-utils';

export async function DynamicServerComponent() {
	const { hello } = await serverFetch(useGetPostsQuery, {
		next: { revalidate: 0 },
	});

	return <p>{hello}</p>;
}
