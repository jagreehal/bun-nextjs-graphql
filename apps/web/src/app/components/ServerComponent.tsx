import { serverFetch } from '@/graphql/query-utils';
import { useGetPostsQuery } from '@/graphql/gql-generated';

export async function ServerComponent() {
	const { posts } = await serverFetch(useGetPostsQuery, {
		next: { revalidate: 5 },
	});

	if (!posts) {
		return;
	}

	return (
		<ul>
			{posts.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
