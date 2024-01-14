'use client';

import { useGetPostsQuery } from '@/graphql/generated';

export function ClientComponent() {
	const { data, isLoading } = useGetPostsQuery();
	return (
		<p>
			{isLoading ? (
				'loading...'
			) : (
				<ul>
					{(data?.posts || []).map((post) => (
						<li key={post.id}>{post.title}</li>
					))}
				</ul>
			)}
		</p>
	);
}
