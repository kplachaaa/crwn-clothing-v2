import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils"

const SignIn = () => {
    useEffect(async () => {
        const response = await getRedirectResult(auth);
        
        if(response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    },[])



    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}> Sign in with google </button>
            <button onClick={signInWithGoogleRedirect}> Sign in with google redirect </button>

        </div>
    )
}

export default SignIn;