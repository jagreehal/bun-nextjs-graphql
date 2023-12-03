import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://localhost:8082/graphql',
	documents: ['integration-tests/**/*.ts'],
	generates: {
		'./integration-tests/gql/': {
			preset: 'client-preset',
		},
	},
	debug: true,
	verbose: true,
};

export default config;
