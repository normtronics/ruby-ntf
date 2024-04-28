'use client'

import { useEffect, useState } from 'react';
import { ConnectWallet, useAddress, useContract, useNFTBalance, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from './buy-box.module.css'
import Login from '../login/login';
import { NFT } from '@/types/nft';
import Button from '../Button';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import initializeFirebaseClient from '@/utils/initFirebase';
import useFirebaseUser from '@/utils/useFirebaseUser';
import { arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import {
  Button as MButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


interface BuyBoxProps {
  type: 'fixed' | 'pay' | 'free'
  nft: NFT
}


export const BuyBox = (props: BuyBoxProps) => {
  const address = useAddress()
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const { user: firebaseUser, isLoading: loadingAuth } = useFirebaseUser();
  const { auth, db } = initializeFirebaseClient();
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const { data: contract } = useContract(props.nft.contract.address);
  const { data: nfts, isLoading } = useOwnedNFTs(contract, address);
  const { data: nftBalance } = useNFTBalance(contract, address);

  const [openModal, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(!open);

  console.log(nfts)

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(amount),
        title: props.nft.title,
        image: props.nft.image,
        redirectUrl: window.location.href
      }),
    })

    const { intent } = await res.json()

    router.push(intent.url)
  };

  const checkSessionId = async () => {
    const session_id = searchParams.get('session_id')

    if(session_id && address) {
      setLoading(true);
        try {
          await axios.post("/api/nft", {
            nft: props.nft,
            address: address,
            contract: props.nft.contract.address
          });
          
          handleOpen()

          const usersRef = doc(db, 'users', address);
          const userDoc = await getDoc(usersRef);
          
          if (userDoc.exists()) { 
            setDoc(
              usersRef,
              { claimedNfts: arrayUnion(props.nft.title)},
              { merge: true }
            );
          }
    
        } catch (err) {
          alert(`Error claiming NFT: ${err}`);
          setLoading(false);
        } finally {
          setLoading(false);
          const current = new URLSearchParams(Array.from(searchParams.entries())); 
          current.delete("session_id");
          // cast to string
          const search = current.toString();
          // or const query = `${'?'.repeat(search.length && 1)}${search}`;
          const query = search ? `?${search}` : "";

          router.push(`${pathname}${query}`);
        }
    }
  }

  const checkIfOwner = () => {
    if(nfts) {
      const found = nfts.find(n => n.metadata.name === props.nft.title)
      return found !== null
    }

    return false
  }

  useEffect(() => {
    if(address) {
      checkSessionId()
    }
  }, [address])

  return (
    <div className={styles.container}>
      <h2>Listing Info</h2>
      {address ? ( 
        <div className={styles.innerContainer}>
          <div className={styles.price}>
            <div className={styles.payTitle}>
              {checkIfOwner() ? (
                <div>Already in your collection</div>
              ): (
                <div>Pay what you want</div>
              )}
            </div>
            <input type='number' placeholder='Enter your price' value={amount} onChange={(e) => {
              setAmount(e.target.value)
            }}/>
          </div>
          <div className={styles.button}>
              <button onClick={onSubmit}>Purchase</button>
          </div>
        </div> 
      ) : (
        <div className={styles.claim}>
          <Button nft={props.nft} />
          <p className="disclaimer">Press <i>&quot;Connect Wallet&quot;</i> to sign-up with email or crypto wallet and claim your digital collectable</p>
        </div>
      )}
      <Dialog open={openModal} handler={handleOpen} placeholder={''}>
        <DialogHeader placeholder={''}>Thank you! </DialogHeader>
        <DialogBody placeholder={''}>
          Thank you for purchaseing my NFT!
        </DialogBody>
        <DialogFooter placeholder={''}>
          <MButton variant="gradient" color="green" onClick={() => { handleOpen(); }} placeholder={''}>
            <span>Close</span>
          </MButton>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
//disabled={checkIfOwner()} 