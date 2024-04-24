'use client'

import { useRadioUser } from "@/utils/useUser";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Index() {
  const { firebaseUser, thirdWebUser} = useRadioUser()

  // console.log('firebaseUser', firebaseUser)
  // console.log('thirdWebUser', thirdWebUser)

  return (
    <>
      <ConnectWallet
        theme='dark'
      />
    </>
  );
}
