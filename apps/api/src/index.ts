import { yoga } from './yoga';

const server = Bun.serve({
	port: 8082,
	fetch: yoga,
});
console.info(
	`Server is running on ${new URL(
		yoga.graphqlEndpoint,
		`http://${server.hostname}:${server.port}`,
	)}`,
);
