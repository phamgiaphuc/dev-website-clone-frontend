import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyBwt3NzR_8K0w2Mv0wT6VmvL0971zcmd2o",
  authDomain: "dev-website-clone.firebaseapp.com",
  projectId: "dev-website-clone",
  storageBucket: "dev-website-clone.appspot.com",
  messagingSenderId: "487536238146",
  appId: "1:487536238146:web:7d55ca89851e03ce0d17db",
  measurementId: "G-TZPRLVM4Z9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const googleProvide = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, googleProvide)
    .then((result) => {
      user = result.user;
    })
    .catch((error) => {
      toast.log(error.message);
    })

  return user;
}