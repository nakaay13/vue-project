import { ref } from 'vue';
import { auth, db  } from './firebase'; // Adjust this path to your Firebase setup
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import doc and setDoc

export const useUsers = () => {
  const user = ref(null);
  const error = ref('');

  const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      error.value = '';

      // Add new user to the Firestore 'users' collection
      const userDocRef = doc(db, 'users', user.value.uid);
      await setDoc(userDocRef, {
        email: user.value.email,
        role: 'user',  // default role
        createdAt: new Date(), // optional: timestamp for when the user registered
      });
    } catch (err) {
      console.error("Registration error:", err); // Log the error details
      error.value = err.message; // Display error message to the user
    }
  };


const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      error.value = '';
    } catch (err) {
      console.error("Login error:", err); // Log the error details
      error.value = err.message; // Display error message to the user
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
    user.value = null;
  };

  return {
    user,
    error,
    registerUser,
    loginUser,
    logoutUser,
  };
};
