export interface NFT {
  id: string,
  description: string,
  image: string,
  slug: string,
  title: string,
  creator: string,
  atributes: { [key: string]: string },
  end: string,
  start: string,
}
