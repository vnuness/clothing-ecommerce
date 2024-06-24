import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth
} from '../../utils/firebase'

import SignUpForm from '../../components/sign-up-form/SignUpForm';

const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign In with Google Account
      </button>
      <SignUpForm />
    </div>
  )
}

export default SignIn;