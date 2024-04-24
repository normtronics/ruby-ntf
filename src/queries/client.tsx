import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_URL || '', {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
})