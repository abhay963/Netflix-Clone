// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import { toast } from "react-toastify";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBb1T8x0VdduiBFbjr8ZLcZwkEzAR_cPB4",
  authDomain: "netflix-clone-b72c8.firebaseapp.com",
  projectId: "netflix-clone-b72c8",
  storageBucket: "netflix-clone-b72c8.firebasestorage.app",
  messagingSenderId: "168064909222",
  appId: "1:168064909222:web:db9c88b1a16f6b5f319967",
  measurementId: "G-69TYVZSQQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

// Signup
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Store user in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    // Update display name in Auth
    await updateProfile(user, { displayName: name });

    return user;
  } catch (error) {
  const code = error.code || "auth/unknown";
  const message = code
    .split("/")[1]           // take part after "auth/"
    .replace(/-/g, " ")      // replace "-" with space
    .replace(/\b\w/g, c => c.toUpperCase()); // capitalize first letters

  toast.error(message); // ✅ shows "Invalid Email" instead of "auth/invalid-email"
}
};

// Login
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
  const code = error.code || "auth/unknown";
  const message = code
    .split("/")[1]           // take part after "auth/"
    .replace(/-/g, " ")      // replace "-" with space
    .replace(/\b\w/g, c => c.toUpperCase()); // capitalize first letters

  toast.error(message); // ✅ shows "Invalid Email" instead of "auth/invalid-email"
}
};

// Logout
const logout = async () => {
  await signOut(auth);
};

export { auth, db, login, signup, logout };
