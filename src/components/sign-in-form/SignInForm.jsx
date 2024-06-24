import { useState, useEffect } from "react";
import FormInput from "../form-input/FormInput";
import Button from "../button/ButtonComponent";
import './SignInForm.scss'
import { signInAuthUserWithEmailAndPassword, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase";
import { getRedirectResult, getAuth } from "firebase/auth";


const SignInForm = () => {

  useEffect(() => {
    const fetchRedirectResult = async () => {
      const auth = getAuth();
      const result = await getRedirectResult(auth);

      if (result) {
        const user = result.user;
        await createUserDocumentFromAuth(user);
      }
    };

    fetchRedirectResult();
  }, [])

  const defaultFormFields = {
    email: '',
    password: ''
  }

  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      handleEmailAndPasswordSignIn();
    } catch (error) {

    }
  }

  const handleEmailAndPasswordSignIn = async () => {
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log('success')


    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Invalid credentials!!')
      }
    }
  }

  const signInWithGoogle = () => {
    signInWithGoogleRedirect();
  }

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            autoComplete: "username",
            name: "email",
            required: true,
            onChange: handleChange,
            value: email
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            autoComplete: "new-password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password
          }}
        />

        <div className="buttons-container">
          <Button type="submit" buttonType='default'>Sign In</Button>
          <Button type="button" buttonType='google' onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>

    </div>
  );

}

export default SignInForm;