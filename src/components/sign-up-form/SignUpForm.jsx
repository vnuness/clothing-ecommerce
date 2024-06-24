import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase";
import FormInput from "../form-input/FormInput";
import './SignUpForm.scss'
import Button from '../button/ButtonComponent'

import { UserContext } from "../../contexts/Users";

const SignUpForm = () => {

  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use!')
      } else {
        console.log(error)
      }

    }
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            name: "displayName",
            required: true,
            onChange: handleChange,
            value: displayName
          }}
        />

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

        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "password",
            autoComplete: "new-password",
            required: true,
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword
          }}
        />

        <Button type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}


export default SignUpForm;