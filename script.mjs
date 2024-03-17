const NFTs = [
  {
    name: "The Rose Crib Social Club Pass #1",
    description: "This NFT is a digital representation of membership to The Rose Crib social club. This will give you access to future events",
    image:
      "ipfs://QmTdTzaUdrHaZzSpgxypYYhnY6GZnRobJRUsG8nDTHvsx5/bb10NFT.png",
    attributes: {
      edition: "first",
      color: "black",
      eventReleaseAt: "bb10"
    },
  },
];

import { PrismaClient } from "./prisma/generated/client/index.js";

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  const globalWithPrisma = global;
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

const main = async () => {
  try {
    const data = await prisma.nFT.createMany({
      data: NFTs.map((nft) => ({
        ...nft,
        // minted: false,
      })),
    });

    console.log("NFTs added to DB", data);
  } catch (e) {
    console.error(e);
  }
};

main();