import { NFT } from "@/types/nft";
import { Engine } from "@thirdweb-dev/engine";
import { NextResponse } from "next/server";
import { metadata } from '../../layout';

interface ExtendedNextApiRequest extends Request {
  json: () => Promise<{ nft: NFT, address: string, contract: string}>
}

export async function POST(req: ExtendedNextApiRequest) {
  const { nft, address, contract } = await req.json();

  const BACKEND_WALLET_ADDRESS = process.env.BACKEND_WALLET_ADDRESS!;
  const NFT_CONTRACT_ADDRESS = contract
  const CHAIN = process.env.NEXT_PUBLIC_CHAIN!;

  try {
    if (!nft) {
      return NextResponse.json({ error: "NFT not found" }, { status: 404 });
    }

    const engine = new Engine({
      url: process.env.ENGINE_URL!,
      accessToken: process.env.THIRDWEB_ACCESS_TOKEN!,
    });

    const tx = await engine.erc721.mintTo(
      CHAIN,
      NFT_CONTRACT_ADDRESS,
      BACKEND_WALLET_ADDRESS,
      {
        metadata: {
          name: nft.title,
          description: nft.description,
          image: nft.image,
          //@ts-ignore
          properties: nft.atributes,
        },
        receiver: address,
      }
    );
    
    // Store this in firebase
    console.log('tx', tx)

    return NextResponse.json(tx, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
