import { useGetPostsQuery } from '@/remote/gql-generated';
import { serverFetch } from '@/remote/query-utils';

export async function DynamicServerComponent() {
	const { hello } = await serverFetch(useGetPostsQuery, {
		next: { revalidate: 0 },
	});

	return <p>{hello}</p>;
}
