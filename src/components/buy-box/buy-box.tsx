'use client'

import { useCallback, useEffect, useState } from 'react';
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
import getStripe from '@/utils/stripe';
import { ThreeCircles } from 'react-loader-spinner'


interface BuyBoxProps {
  type: 'fixed' | 'pay' | 'free'
  nft: NFT
}

type SafeNft = Omit<NFT, 'description'>;




export const BuyBox = (props: BuyBoxProps) => {
  const address = useAddress()
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const { db } = initializeFirebaseClient();
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const { data: contract } = useContract(props.nft.contract.address);
  const { data: nfts, isLoading: nftsLoading } = useOwnedNFTs(contract, address);

  const [openModal, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(!open);

  // Will create a stripe session and the redirect them to checkout
  const onSubmit = useCallback(async (e: any) => {
    setLoading(true)
    e.preventDefault();

    const res = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(amount),
        title: props.nft.title,
        image: props.nft.image,
        redirectUrl: window.location.href,
        contractAddress: props.nft.contract.address,
        address: address,
        nftMetaData: props.nft.atributes,
        slug: props.nft.slug
      }),
    })

    const { intent } = await res.json()

    const stripe = await getStripe()

    await stripe?.redirectToCheckout({ sessionId: intent.id });

    setLoading(false)
  }, [])

  //If there is a session id the payment when through 
  const checkSessionId = async () => {
    const session_id = searchParams.get('session_id')

    if(session_id) {
      setLoading(true);
      handleOpen()
      setLoading(false);
      // const current = new URLSearchParams(Array.from(searchParams.entries())); 
      // current.delete("session_id");
      // const search = current.toString();
      // const query = search ? `?${search}` : "";
      // router.push(`${pathname}${query}`);
    }
  }

  const checkIfOwner = () => {
    if(nfts) {
      const found = nfts.find(n => n.metadata.name === props.nft.title)
      return found !== null
    }

    return false
  }

  // useEffect(() => {
  //   if(address) {
  //     // checkSessionId()
  //   }
  // }, [address])


  // if(loading || nftsLoading) {
  //   return (
  //     <ThreeCircles
  //       visible={true}
  //       height="100"
  //       width="100"
  //       color="#4fa94d"
  //       ariaLabel="three-circles-loading"
  //       wrapperStyle={{}}
  //       wrapperClass=""
  //       />
  //   )
  // }

  const updatePrice = useCallback((e: any) => {
     setAmount(e.target.value)
  }, [])

  return (
    <div className={styles.container}>
      <h2>Listing Info</h2>
      {address ? ( 
        <div className={styles.innerContainer}>
          <div className={styles.price}>
            <input 
              type='number' 
              placeholder='Enter your price' 
              value={amount} onChange={updatePrice}
              disabled={loading}
            />
          </div>
          <div className={!loading ? styles.button : styles.disabled}>
              <button 
                onClick={onSubmit}
                disabled={loading}
              >
                {!loading ? 'Purchase' : 'Loading...'}
              </button>
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

//  <div className={styles.payTitle}>
//               {checkIfOwner() ? (
//                 <div>Already in your collection</div>
//               ): (
//                 <div>Pay what you want</div>
//               )}
//             </div>