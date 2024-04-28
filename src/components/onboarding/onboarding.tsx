'use client'
import useFirebaseUser from "@/utils/useFirebaseUser";
import useFirebaseDocument from "@/utils/useFirebaseUserDocument"
import { useState, useCallback, useEffect } from 'react';
import { doc,  setDoc } from "firebase/firestore";
import { useDisconnect, useAddress } from '@thirdweb-dev/react';
import styles from './onboarding.module.css'
import initializeFirebaseClient from "@/utils/initFirebase";

interface OnBoardingProps {}

export const OnBoarding = (props: OnBoardingProps) => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmailAddress] = useState('')
  const { isLoading, document } = useFirebaseDocument()
  const { user: firebaseUser, isLoading: loadingAuth } = useFirebaseUser();
  const { db } = initializeFirebaseClient();
  const [isOpen, setOpen] = useState(false)
  const disconnect = useDisconnect()
  const address = useAddress()

  const displayChange = useCallback((e: any) => {
    setDisplayName(e.target.value)
  }, [])

  const emailChange = useCallback((e: any) => {
    setEmailAddress(e.target.value)
  }, [])

  const finishAction = useCallback((e: any) => {
    console.log('finishAction', address)
    if(address) {
      e.preventDefault()
      const usersRef = doc(db, 'users', address);
      setDoc(
        usersRef,
        { 
          onBoarded: true,
          displayName: displayName,
          email: email
        },
        { merge: true }
      );

      setOpen(false)
    }
  }, [])

  const closeAction = useCallback((e: any) => {
    disconnect()
    setOpen(false)
  }, [])

  const disconnectAction = useCallback(() => {
    disconnect()
    setOpen(false)
  }, [])

  useEffect(() => {
    console.log(document)
    if(document && !document.onBoarded) {
      setOpen(true)
    }
  }, [document])

  if(loadingAuth || isLoading || !firebaseUser || !document) {
    return null
  }

  return (
    <>
      { (isOpen) ? ( <div className={styles.overlay}>
        <button 
            className={styles.close} 
            onClick={closeAction}>
          <img 
            src="/icons/close.svg" 
            className={styles.icon}
          />
        </button>
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome</h1>
          <div className={styles.text}>Choose a display name and enter your email address to receive updates from Ruby Mountain</div>
          <input 
            type="text" 
            placeholder="Display name" 
            className={styles.input}
            onChange={displayChange}
            value={displayName}
          />
          <input 
            type="email"   
            placeholder="Enter your email"  
            className={styles.input}
            onChange={emailChange}
            value={email}
          />

          {/* <div className={styles.inputContainer}>
            <input type="checkbox" />
            <div>I have read and accepted the Terms of Service, the Terms of Creator and confirm that I am at least 13 years old.</div>
          </div> */}

          {/* <div className={styles.inputContainer}>
            <input type="checkbox" />
            <div>I want to receive annoucements and news from Ruby Mountain to stay up to date.</div>
          </div> */}

          <button 
            className={styles.button}
            onClick={finishAction}
          >
            Finish sign-up
          </button>
          <button 
            onClick={disconnectAction}
          >
            Disconnect
          </button>
        </div>
      </div> ) : null }
    </>
  )
}