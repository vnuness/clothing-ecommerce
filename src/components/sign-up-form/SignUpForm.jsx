import { useState } from "react";
import FormInput from "../form-input/FormInput";
import './SignUpForm.scss'
import Button from '../button/ButtonComponent'
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

const SignUpForm = () => {

  const dispatch = useDispatch();

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
      dispatch(signUpStart(email, password, displayName));

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