const NFTs = [
  {
    name: "Ruby Mountain Self Portrait No. 2",
    description: '\"Rebirth\" is a self-portrait series by Ruby Mountain, capturing their evolution into a new version of herself and their deep connection with her highest self. In this rebirth era, Ruby Mountain explores self-reflection, healing, and nature to unlock their true creative potential, breaking free from societal expectations and personal struggles. /n/nJoin Ruby Mountain on this artistic journey as she unveils her latest single, "Eclipse," a testament to their journey through grief and emerging stronger on the other side. The owners of NFT Rebirth #2 will receive an exclusive invitation to Ruby Mountain\'s private "Eclipse" listening party on April 28th, 2024, in Los Angeles.',
    image:
      "ipfs://QmUstFUQif4MXmKo2F9wRqaji7ru54pCmmAMYNkZBM7V5j/Asset%202.png",
    attributes: {
      color: "Purple",
      artist: "Ruby Mountain",
      edition: "First",
      release: "1st Church of Mycology",
      date: "April 19th, 2024",
      media: "Digital Photography",
      flowers: "Roses",
      clothing: "Red",
      home_plant: "Venus",
      ethnicity: "Afghan"
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