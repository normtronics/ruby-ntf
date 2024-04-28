'use client'

import { useEffect, useState } from 'react';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from './buy-box.module.css'
import Login from '../login/login';
import { NFT } from '@/types/nft';
import Button from '../Button';
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
import { checkout } from '../../utils/stripe';
import { useRouter } from 'next/navigation';


interface BuyBoxProps {
  type: 'fixed' | 'pay' | 'free'
  nft: NFT
}


export const BuyBox = (props: BuyBoxProps) => {
  const address = useAddress()
  const router = useRouter()

  const [amount, setAmount] = useState('')

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

    // checkout(intent.id)
    router.push(intent.url)
  };
  
  return (
    <div className={styles.container}>
      <h2>Listing Info</h2>
      {address ? ( <div className={styles.innerContainer}>
        <div className={styles.price}>
          <div className={styles.payTitle}>Pay what you can</div>
          <input type='number' placeholder='Enter your price' value={amount} onChange={(e) => {
            setAmount(e.target.value)
          }}/>
        </div>
        <div className={styles.button}>
            <button onClick={onSubmit}>Purchase</button>
        </div>
      </div> ) : (
        <div className={styles.claim}>
          <Button nft={props.nft} />
          <p className="disclaimer">Press <i>&quot;Connect Wallet&quot;</i> to sign-up with email or crypto wallet and claim your digital collectable</p>
        </div>
      )}
    </div>
  )
}