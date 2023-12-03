import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { type ExecutionResult, print } from 'graphql';
import { describe, expect, it } from 'bun:test';
import { graphql } from './gql';
import { yoga } from '../src/yoga';

function executeOperation<TResult, TVariables>(
	operation: TypedDocumentNode<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<ExecutionResult<TResult>> {
	return Promise.resolve(
		yoga.fetch('http://yoga/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				query: print(operation),
				variables: variables ?? undefined,
			}),
		}),
	).then((response) => response.json());
}

describe('Yoga Tests', () => {
	it('execute query operation', async () => {
		const PostsQuery = graphql(/* GraphQL */ `
			query GetPosts($skip: Int, $take: Int) {
				posts(skip: $skip, take: $take) {
					id
					title
					content
					author {
						id
						firstName
						lastName
					}
					comments {
						id
						comment
					}
				}
			}
		`);

		const result = await executeOperation(PostsQuery, {
			skip: 0,
			take: 11,
		});
		expect(result.data?.posts?.length).toBeGreaterThan(0);
	});

	it('execute mutation operation', async () => {
		const CreatePostMutation = graphql(/* GraphQL */ `
			mutation CreatePost($authorId: ID!, $title: String!, $content: String!) {
				createPost(authorId: $authorId, title: $title, content: $content) {
					id
					title
					content
					author {
						id
						firstName
						lastName
					}
				}
			}
		`);

		const result = await executeOperation(CreatePostMutation, {
			authorId: '1',
			title: 'My New Post',
			content: 'This is the content of the new post.',
		});

		expect(result.data?.createPost.title).toEqual('My New Post');
		expect(result.data?.createPost.content).toEqual(
			'This is the content of the new post.',
		);
	});
});
