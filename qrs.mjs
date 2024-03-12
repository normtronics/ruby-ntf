import { PrismaClient } from "@prisma/client";
import qrcode from "qrcode";

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
    const nfts = await prisma.nFT.findMany({
      where: {
        minted: false,
      },
    });

    for (const nft of nfts) {
      await qrcode.toFile(
        `./qrs/${nft.id}.png`,
        `http://localhost:3000/claim?id=${nft.id}`
      );
    }
  } catch (e) {
    console.error(e);
  }
};

main();