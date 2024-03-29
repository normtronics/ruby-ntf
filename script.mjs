const NFTs = [
  {
    name: "Ruby Mountain Self Portrait No. 1",
    description: "Ruby Mountain Self Portrait No. 1",
    image:
      "ipfs://bafybeiclabgip3wyaoxo3i45ogefb3ym4tndrrpem4hb6dxf7j33w64cxu/IMG_3517-1%20(dragged).jpg",
    attributes: {
      edition: "first",
      color: "red",
      artist: "ruby mountain"
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