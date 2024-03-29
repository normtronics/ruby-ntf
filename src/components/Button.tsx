"use client";

import { useState, type FC } from "react";
import axios from "axios";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Claim.module.css";
import prisma from "../utils/prisma";
import { useRouter } from 'next/navigation'
import React from "react";
import {
  Button as MButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


const Button: FC<{ id: string }> = ({ id }) => {
  const address = useAddress();
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const claim = async () => {
    setLoading(true);
    try {
      await axios.post("/api/nft", {
        id: id,
        address,
      });

      handleOpen()
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
        modalTitle={"Ruby Mountain"}
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
      <Dialog open={open} handler={handleOpen} placeholder={''}>
        <DialogHeader placeholder={''}>Thank you! </DialogHeader>
        <DialogBody placeholder={''}>
          Thank you for claiming my NFT!
          You will be redirected back to the home page at <b>nft.rubymountain.xyz</b>, and there you can view your claimed NFT.
        </DialogBody>
        <DialogFooter placeholder={''}>
          <MButton variant="gradient" color="green" onClick={() => { handleOpen(); router.push('/'); }} placeholder={''}>
            <span>Close</span>
          </MButton>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Button;