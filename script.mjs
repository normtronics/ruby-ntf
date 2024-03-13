const NFTs = [
  {
    name: "Blue Circle",
    description: "A blue circle NFT from the Shapes Collection",
    image:
      "ipfs://QmPL8z4axPydaRK9wq3Pso2z5gfnDVcgTjf6yx88v3amr2/blue_circle.png",
    attributes: {
      shape: "circle",
      color: "blue",
      sides: "0",
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
    await prisma.nFT.createMany({
      data: NFTs.map((nft) => ({
        ...nft,
        minted: false,
      })),
    });

    console.log("NFTs added to DB");
  } catch (e) {
    console.error(e);
  }
};

main();