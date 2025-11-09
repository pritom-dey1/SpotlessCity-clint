import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
 apiKey: "AIzaSyAIIzLvEafSNzyzaQpOx35kTekfo6KaAuE",
  authDomain: "spotlesscity-c442b.firebaseapp.com",
  projectId: "spotlesscity-c442b",
  storageBucket: "spotlesscity-c442b.firebasestorage.app",
  messagingSenderId: "949871977896",
  appId: "1:949871977896:web:13d2522b4a98e3162fe99d",
  measurementId: "G-K0K5356KSL"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
