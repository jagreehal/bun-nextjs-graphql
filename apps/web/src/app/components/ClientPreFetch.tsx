'use client';

import { useGetPostsQuery } from '@/graphql/generated';

export function ClientPreFetch() {
	const { data, isLoading } = useGetPostsQuery({});

	if (isLoading || !data?.posts) {
		return;
	}

	return (
		<ul>
			{data.posts.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
