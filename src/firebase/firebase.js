import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCeAQiILRXH1SjOeyWhIsJ4JE5H6z4670o",
    authDomain: "quizzler-c0f68.firebaseapp.com",
    projectId: "quizzler-c0f68",
    storageBucket: "quizzler-c0f68.firebasestorage.app",
    messagingSenderId: "173614606441",
    appId: "1:173614606441:web:e92d95d48a16e7b5a19af8",
    measurementId: "G-VXQSV19PRR"
};

initializeApp(firebaseConfig)

export const db = getFirestore()

export const userColRef = collection(db, 'User')

export const userDocRef = doc( userColRef, "GQ7vQMWav8YNlqQPNXF4" )

export const quizColRef = collection(db, 'Quizzes')

export const quizDocRef = doc (quizColRef, 'CFURYKKH1bMNwbJYrypg')

export const auth = getAuth()

export const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = () => {
    return(
        auth.signOut()
            .then(() => {
                localStorage.setItem("userLoggedIn", JSON.stringify(false))
            })  
    )
}

export const getAuthState = () => {
    return onAuthStateChanged(auth, (user) => {
        console.log('User is logged in: ', user)
    })
}


