import type { CodegenConfig } from '@graphql-codegen/cli'

const scalars = {
  NonEmptyString: 'string',
}

const config: CodegenConfig = {
  schema: './src/graphql/typeDefs/index.ts',
  ignoreNoDocuments: true,     // for better experience with the watcher
  generates: {
	'./src/types/graphql/codegen/resolvers.ts': {
  	plugins: ['typescript', 'typescript-resolvers'],
  	config: {
    	federation: true,        // Supports Apollo Federation.
    	useIndexSignature: true, // Adds an index signature to any generates resolver.
    	useTypeImports: true,    // Will use import type {} rather than import {} when importing only types.
      scalars,
      contextType: '@/types/context.js#CustomContext',
      mappers: {
        Image: '../index.js#Image as CustomImage',
        Document: '../index.js#Document as CustomDocument',
      },
  	},
	},
  },
}

export default config
