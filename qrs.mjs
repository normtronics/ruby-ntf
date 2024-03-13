import { PrismaClient } from "./prisma/generated/client/index.js";
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
        minted: true,
      },
    });

    for (const nft of nfts) {
      await qrcode.toFile(
        `./public/qrs/${nft.id}.png`,
        `https://nfts-one.vercel.app//claim?id=${nft.id}`
      );
    }
  } catch (e) {
    console.error(e);
  }
};

main();