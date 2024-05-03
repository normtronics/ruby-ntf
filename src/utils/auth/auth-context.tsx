import * as React from "react";
import { onAuthStateChanged, signInWithCustomToken, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import initializeFirebaseClient from "../initFirebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useUser } from "@thirdweb-dev/react";

export type Auth = {
  user: User | null;
};

export const FirebaseAuthContext = createContext<Auth | null>(null);

export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth, db } = initializeFirebaseClient();
  const [user, setUser] = useState<User | null>(null);
  const thirdWebUser = useUser();
  const initValues: Auth = { user };

   const getUser = async () => {
    //@ts-ignore
    const token = thirdWebUser.user?.data?.firebaseToken;

    try {
      const userCredential = await signInWithCustomToken(auth, token);
      // On success, we have access to the user object.
      const user = userCredential.user;

      // If this is a new user, we create a new document in the database.
      const usersRef = doc(db, "users", user.uid!);
      const userDoc = await getDoc(usersRef);

      if (!userDoc.exists()) {
        // User now has permission to update their own document outlined in the Firestore rules.
        setDoc(usersRef, { createdAt: serverTimestamp() }, { merge: true });
      } else {
        setDoc(
          usersRef,
          { lastAccessedAt: serverTimestamp() },
          { merge: true }
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      listener();
    };
  }, [auth]);

  useEffect(() => {
    //@ts-ignore
    if(thirdWebUser.user?.data?.firebaseToken) {
      getUser();
    }
  }, []);

  return (
    <FirebaseAuthContext.Provider
      value={{
        user
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useFirebaseAuthContext = () => {
  const audioPlayerContext = useContext(FirebaseAuthContext);
  if (audioPlayerContext === null) {
    throw new Error('useFirebaseAuthContext must be inside a FirebaseAuthContext');
  }
  return audioPlayerContext
};
