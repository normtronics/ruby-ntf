import { NFT } from "@/types/nft"
import { gql } from "graphql-request"
import { graphQLClient } from "./client"

export const getNfts = async () => {
  const query = gql`
    query Nfts {
      nfts {
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
        metadata
        songs {
          title
          url
          image
        }
      }
    }
  `

  console.log('query', query)
  const data = await graphQLClient.request<{ nfts: NFT[] }>(query)

  return data
}