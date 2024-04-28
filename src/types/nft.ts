export type NFT = {
  id: string,
  description: string,
  image: string,
  slug: string,
  title: string,
  atributes: { [key: string]: string },
  end: string,
  start: string,
  backgroundColor: {
    hex: string
  },
  createdAt: string,
  publishedAt: string,
  seoImage: string,
  updatedAt: string,
  creator: {
    bio: string
    name: string
    slug: string
  },
  contract: {
    address: string
    name: string
  },
  nftype: string
  metadata: any
  songs: [{
    title: string,
    url: string,
    image: string
  }]
}
