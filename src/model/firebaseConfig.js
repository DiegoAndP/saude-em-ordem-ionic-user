import {initializeApp} from "firebase/app"
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore";
import { connectAuthEmulator, initializeAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAgVlnn-ehRBdEHHbmshTwilbW7ucMEM1g",
  authDomain: "agendafacil-ebddf.firebaseapp.com",
  projectId: "agendafacil-ebddf",
  storageBucket: "agendafacil-ebddf.firebasestorage.app",
  messagingSenderId: "1074246277837",
  appId: "1:1074246277837:web:7d2f3a0c16c111c35fa784",
  measurementId: "G-PQ1PN9EXYK"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = initializeAuth(app)

// if (location.hostname === 'localhost') {
//   connectFirestoreEmulator(db, '127.0.0.1', 8080);
//   connectAuthEmulator(auth, 'http://127.0.0.1:9099')
// }

export {db, auth}