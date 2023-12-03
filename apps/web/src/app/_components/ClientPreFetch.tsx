'use client';

import { useGetPostsQuery } from '@/remote/gql-generated';

export function ClientPreFetch() {
	const { data, isLoading } = useGetPostsQuery({});

	if (isLoading || !data?.posts) {
		return null;
	}

	return (
		<ul>
			{data.posts.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
