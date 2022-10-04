import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";

import { useDispatch } from "react-redux";

import {SignUpContainer} from  "./sign-up-form.styles";

import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}


const SignUpForm = () => {
    const dispatch = useDispatch();
    const [ formFields,setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword ) {
            alert( "passwords do not match" );
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();

        } catch(error) {
            if ( error.code === "auth/email-already-in-use") {
                alert( "email is already used" );
            } else {
            console.log("creation error", error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value })
    }

    return (
        <SignUpContainer>
            <h2>Dont have an account ? </h2>
            <span> Sign up with email </span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label="Display Name"
                type="text" 
                required  
                onChange={handleChange} 
                name="displayName" 
                value={displayName} />

                <FormInput
                label="Email"
                type="email" 
                required 
                onChange={handleChange} 
                name="email" 
                value={email} />

                <FormInput
                label="Password"
                type="password" 
                required 
                onChange={handleChange} 
                name="password" 
                value={password} />

                <FormInput
                label="Confirm Password"
                type="password" 
                required 
                onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword} />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;