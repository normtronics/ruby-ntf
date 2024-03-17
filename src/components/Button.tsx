"use client";

import { useState, type FC } from "react";
import axios from "axios";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Claim.module.css";
import prisma from "../utils/prisma";
import { useRouter } from 'next/navigation'


const Button: FC<{ id: string }> = ({ id }) => {
  const address = useAddress();
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const claim = async () => {
    setLoading(true);
    try {
      await axios.post("/api/nft", {
        id: id,
        address,
      });

      alert("NFT claimed!");
      router.push('/')
    } catch (err) {
      alert(`Error claiming NFT: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {address && (
        <button
          className={styles.claimButton}
          onClick={() => claim()}
          disabled={loading}
        >
          {loading ? "Claiming..." : "Claim"}
        </button>
      )}
      <ConnectWallet 
        className={styles.connectBtn}
        theme={"dark"}
        modalTitle={"The Rose Crib"}
        switchToActiveChain={true}
        modalSize={"wide"}
        auth={{
          onLogin: (token: string) => {
          // prisma.user.upsert({
          //   where: { email: email },
          //   update: { ...user },
          //   create: { ...user },
          // });
          }
        }}
      />
    </>
  );
};

export default Button;