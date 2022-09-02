import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyChXa-LN4bzHYcYoznO9BxUx1Xsqf2ljRg",
    authDomain: "crwn-clothing-20e77.firebaseapp.com",
    projectId: "crwn-clothing-20e77",
    storageBucket: "crwn-clothing-20e77.appspot.com",
    messagingSenderId: "300992437786",
    appId: "1:300992437786:web:9521030caaf9cc16e57ba3"
  };
  
 
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log("error creating user")
      }
    }


    return userDocRef;

  };