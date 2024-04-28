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
import styles from "../styles/Home.module.css";
import { Header } from "@/components/Header/Header";
import { SimpleFooter } from "@/components/footer/footer";
import { getNfts } from "@/queries/getNfts";
import { FilterMenu } from "@/components/filter-menu/filter-menu";
import { Card } from "@/components/card/card";
import { Suspense } from "react";


export default async function Page() {
  const data = await getNfts()
  const nfts = data.nfts
  // const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;
  // const { data: contract } = useContract(NFT_CONTRACT_ADDRESS);

  // // This will be the logged in users address
  // const address = useAddress();
  // const { data: nfts, isLoading, isError, isFetched, isLoadingError } = useOwnedNFTs(contract, address);
  // const { data: nftBalance } = useNFTBalance(contract, address);

  // console.log('nfts', nfts)
 
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
      {/* <h1 className={styles.title}>Your Assets</h1>
      <h2>
        TOTAL ITEMS: <span>{nftBalance?.toNumber()}</span>
      </h2> */}

      {/* {!address && <h1>Connect your wallet</h1>}
      {address && isLoading && <h1>Loading...</h1>}
      {address && !isLoading && !nfts?.length && <h1>You have no NFTs :(</h1>} */}

      <FilterMenu />
      <div className={styles.grid}>
        {nfts && nfts.map((nft) => (
          <Card nft={nft} key={nft.id}/>
        ))}
      </div>

      {/* <SimpleFooter /> */}
    </div>
  );
}