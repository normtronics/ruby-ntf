import { useUser } from '@thirdweb-dev/react';
import { signInWithCustomToken } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import initializeFirebaseClient from './initFirebase';
import useFirebaseUser from './useFIrebaseUser';

export const useRadioUser = () => {
  const thirdWebUser = useUser();
  const { user: firebaseUser, isLoading: loadingAuth } = useFirebaseUser();
  const { auth, db } = initializeFirebaseClient();

  const getUser = async () => {
    //@ts-ignore
    const token = thirdWebUser.user?.data?.firebaseToken;

    try {
      const userCredential = await signInWithCustomToken(auth, token);
      // On success, we have access to the user object.
      const user = userCredential.user;

      // If this is a new user, we create a new document in the database.
      const usersRef = doc(db, 'users', user.uid!);
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
    getUser();
  }, [thirdWebUser.user?.data]);

  return {
    thirdWebUser,
    firebaseUser,
    loadingAuth,
  };
};