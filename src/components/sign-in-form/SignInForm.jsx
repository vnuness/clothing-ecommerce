import { useState, useEffect } from "react";
import FormInput from "../form-input/FormInput";
import Button, { BUTTON_TYPE_CLASSES } from "../button/ButtonComponent";
import './SignInForm.scss'
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase";
import { getRedirectResult, getAuth } from "firebase/auth";


const SignInForm = () => {

  useEffect(() => {
    const fetchRedirectResult = async () => {
      const auth = getAuth();
      await getRedirectResult(auth);
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
      await signInAuthUserWithEmailAndPassword(email, password);

    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Invalid credentials!!')
      }
    }
  }

  const signInWithGoogle = () => {
    signInWithGooglePopup();
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
          <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>

    </div>
  );

}

export default SignInForm;