import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clwu5g0qk02j108umwwvzsg4j/master',
  documents: ['./**/*.graphql'],
  generates: {
    './generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        rawRequest: true,
      },
    },
  },
}

export default config
