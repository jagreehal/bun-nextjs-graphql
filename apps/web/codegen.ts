import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://localhost:8082/graphql',
	overwrite: true,
	documents: './src/**/*.gql',
	generates: {
		'./src/graphql/generated.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-query',
				{
					add: {
						content: `
            type FetchOptions = {
              cache?: RequestCache;
              next?: NextFetchRequestConfig;
            };
            
            type RequestInit = {
              headers: (HeadersInit & FetchOptions) | FetchOptions;
            };`,
					},
				},
			],
			config: {
				reactQueryVersion: 5,
				legacyMode: false,
				exposeFetcher: true,
				exposeQueryKeys: true,
				addSuspenseQuery: true,
				fetcher: './fetcher#fetcher',
			},
		},
	},
};
export default config;
