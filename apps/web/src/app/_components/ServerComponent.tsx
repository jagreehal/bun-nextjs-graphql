import { serverFetch } from '@/remote/query-utils';
import { useGetPostsQuery } from '@/remote/gql-generated';

export async function ServerComponent() {
	const { posts } = await serverFetch(useGetPostsQuery, {
		next: { revalidate: 5 },
	});

	if (!posts) {
		return null;
	}

	return (
		<ul>
			{posts.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
