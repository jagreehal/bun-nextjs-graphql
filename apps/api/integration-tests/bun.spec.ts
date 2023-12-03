import { Server } from 'bun';
import { describe, expect, it } from 'bun:test';
import { createYoga } from 'graphql-yoga';
import { builder } from '../src/builder';

describe('Bun integration', () => {
	const yoga = createYoga({
		schema: builder.toSchema(),
	});

	let server: Server;
	let url: string;
	function beforeEach() {
		server = Bun.serve({
			fetch: yoga,
			port: process.env.INTEGRATION_TEST_SERVER_PORT,
		});
		url = `http://${server.hostname}:${server.port}${yoga.graphqlEndpoint}`;
	}

	function afterEach() {
		server.stop();
	}

	it('shows GraphiQL', async () => {
		beforeEach();
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'text/html',
				},
			});
			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toBe('text/html');
			const htmlContents = await response.text();
			expect(htmlContents.includes('GraphiQL')).toBe(true);
		} finally {
			afterEach();
		}
	});

	it('accepts a query', async () => {
		beforeEach();
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `{
  posts {
    id
  }
}`,
				}),
			});
			const result = await response.json();
			expect(result.data.posts.length).toBeGreaterThan(0);
		} finally {
			afterEach();
		}
	});
});
