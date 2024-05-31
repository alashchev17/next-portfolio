import { GraphQLClient } from 'graphql-request'
import { getSdk } from '@/generated/graphql'

const client = new GraphQLClient('https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clwu5g0qk02j108umwwvzsg4j/master')
export const sdk = getSdk(client)
