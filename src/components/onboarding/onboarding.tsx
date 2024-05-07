'use client'
import useFirebaseUser from "@/utils/useFirebaseUser";
import useFirebaseDocument from "@/utils/useFirebaseUserDocument"
import { useState, useCallback, useEffect } from 'react';
import { doc,  setDoc } from "firebase/firestore";
import { useDisconnect, useAddress } from '@thirdweb-dev/react';
import initializeFirebaseClient from "@/utils/initFirebase";

import { View, Text, TextInput, Pressable } from 'react-native' 
import { styles as RNStyles } from './onboarding.styles'

interface OnBoardingProps {}

export const OnBoarding = (props: OnBoardingProps) => {

  const [displayName, setDisplayName] = useState('')
  const [email, setEmailAddress] = useState('')
  const { isLoading, document } = useFirebaseDocument()
  const { user: firebaseUser, isLoading: loadingAuth } = useFirebaseUser();
  const { db } = initializeFirebaseClient();
  const [isOpen, setOpen] = useState(true)
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
    if(document) {
      e.preventDefault()
      const usersRef = doc(db, 'users', document.id);
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

  // useEffect(() => {
  //   console.log(document)
  //   if(document && !document.onBoarded) {
  //     setOpen(true)
  //   }
  // }, [document])

  // if(loadingAuth || isLoading || !firebaseUser || !document) {
  //   return null
  // }

  return (
    <View style={RNStyles.overlay}>
      <View style={RNStyles.container}>
        <Text style={RNStyles.title}>Welcome</Text>
        <Text style={RNStyles.text}>Choose a display name and enter your email address to receive updates from Ruby Mountain</Text>
        <TextInput 
          placeholder="Display name"
          style={RNStyles.input}
          onChange={displayChange}
          value={displayName}
        />

        <TextInput 
          placeholder="Enter your email"
          style={RNStyles.input}
          onChange={emailChange}
          value={email}
        />

        <Pressable 
          style={RNStyles.button}
          onPress={finishAction}
        >
          <Text>Finish sign-up</Text>
        </Pressable>

        <Pressable 
          onPress={disconnectAction}
        >
          <Text>Disconnect</Text>
        </Pressable>
      </View>
    </View>
  )
}