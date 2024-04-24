import { NFT } from "@/types/nft"
import { gql } from "graphql-request"
import { graphQLClient } from "./client"

export const getNft = async (slug: string) => {
  const query = gql`
    query getNft($slug: String!) {
      nft(where: {slug: $slug}) {
        atributes
        backgroundColor {
          hex
        }
        createdAt
        description
        end
        id
        image
        publishedAt
        seoImage
        slug
        start
        title
        updatedAt
        creator {
          bio
          name
          slug
        }
        contract {
          address
          name
        }
        nftype
      }
    }
  `

  const variables = {
    slug
  }
  
  const data = await graphQLClient.request<{ nft: NFT }>(query, variables)

  return data
}