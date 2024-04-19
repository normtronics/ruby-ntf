"use client";

import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useAuth,
  useContract,
  useNFT,
  useNFTBalance,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";

export default function Home() {
  const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;
  const { data: contract } = useContract(NFT_CONTRACT_ADDRESS);
  const address = useAddress();
  const { data: nfts, isLoading, isError, isFetched, isLoadingError } = useOwnedNFTs(contract, address);
  const { data: nftBalance } = useNFTBalance(contract, address);
  const { data: myNFT } = useNFT(contract, 0)

  const thirdwebAuth = useAuth();
  console.log('thirdwebAuth', nfts)
 
  // if (isLoading && !isError) {
  //   return (
  //     <div className={styles.loadingContainer}>
  //       <h1>Loading your assets...</h1>
  //       <div className={styles.loader}>Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.container}>
      <Header />
      {/* <Hero /> */}
      {/* <NftCard /> */}
      <h1 className={styles.title}>Your Assets</h1>
      <h2>
        TOTAL ITEMS: <span>{nftBalance?.toNumber()}</span>
      </h2>

      {/* <ConnectWallet 
        className={styles.connectBtn}
        theme={"dark"}
        modalTitle={"The Rose Crib"}
        switchToActiveChain={true}
        modalSize={"wide"}
        auth={{
          onLogin: (token: string) => {
            console.log('token', token)
          }
        }}
      /> */}

      {!address && <h1>Connect your wallet</h1>}
      {address && isLoading && <h1>Loading...</h1>}
      {address && !isLoading && !nfts?.length && <h1>You have no NFTs :(</h1>}
      <div className={styles.nfts}>
        {nfts?.map(({ metadata }) => (
          <Link
            href={`https://thirdweb.com/${process.env.NEXT_PUBLIC_CHAIN}/${process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS}/nfts/${metadata.id}`}
            target="_blank"
            rel="noopener noreferrer"
            key={metadata.id}
          >
            <div key={metadata.id} className={styles.nft}>
              <ThirdwebNftMedia
                metadata={metadata}
                width="140px"
                height="140px"
              />
              <h2>{metadata.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}