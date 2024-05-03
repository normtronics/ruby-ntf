"use client";

import { useState, type FC } from "react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Claim.module.css";
import { useRouter } from 'next/navigation'
import React from "react";
import {
  Button as MButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Login from "./login/login";
import { NFT } from "@/types/nft";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import useFirebaseUser from "@/utils/useFirebaseUser";
import initializeFirebaseClient from "@/utils/initFirebase";


const Button: FC<{ nft: NFT }> = ({ nft }) => {
  const address = useAddress();
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { user: firebaseUser, isLoading: loadingAuth } = useFirebaseUser();
  const { auth, db } = initializeFirebaseClient();
  // const usersRef = firebaseUser ? doc(db, 'users', firebaseUser.uid!) : null
  // const [isClaimed, setIsClaimed] = useState()

  const claim = async () => {
    setLoading(true);
    try {
      await axios.post("/api/nft", {
        nft,
        address,
      });

      handleOpen()

      const usersRef = doc(db, 'users', firebaseUser?.uid!);
      const userDoc = await getDoc(usersRef);
      if (userDoc.exists()) { 
        setDoc(
          usersRef,
          { claimedNfts: arrayUnion(nft.title)},
          { merge: true }
        );
      }

    } catch (err) {
      alert(`Error claiming NFT: ${err}`);
    } finally {
      setLoading(false);
    }
  };



  // const showClaimText = async (loading: boolean) => {
  //   const userDoc = await getDoc(usersRef);
  //   if (userDoc.exists()) { 
  //     const claimed = userDoc.data().claimedNfts.includes(nft.title)
  //     setIsClaimed(claimed)
  //     if(loading && !claimed) return 'Claiming...'
  //     if(!loading && !claimed) return 'Claim'
  //     if(!loading && claimed) return 'Already Claimed'
  //   }

   

  //   return 'Claim'
  // }

  return (
    <>
      {address ? (

        <button
          className={styles.claimButton}
          onClick={() => claim()}
          disabled={loading}
        >
          {loading ? 'Claiming...' : 'Claim'}
        </button>
      ): (
        <Login />
      )}
      <Dialog open={open} handler={handleOpen} placeholder={''}>
        <DialogHeader placeholder={''}>Thank you! </DialogHeader>
        <DialogBody placeholder={''}>
          Thank you for claiming my NFT! You will be redirected back to the home page at <b>nft.rubymountain.xyz</b>, and there you can view your claimed NFT. It may take a minute for it to display on your assets page.
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