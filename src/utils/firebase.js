import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnEJ0A_n9aXdt3yzhFXv_1iWpnoAnIGRk",
  authDomain: "clothing-ecommerce-db-82659.firebaseapp.com",
  projectId: "clothing-ecommerce-db-82659",
  storageBucket: "clothing-ecommerce-db-82659.appspot.com",
  messagingSenderId: "389107584624",
  appId: "1:389107584624:web:0a5d4b0b3b17534f076eb5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.error('Error creating the user', error.message);
    }
  }

  return userDocRef;

  //
}