// src/composables/useUsers.js
import { ref } from 'vue';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export function useUsers() {
  const user = ref(null);
  const error = ref(null);

  const register = async (email, password) => {
    try {
      // Register the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      error.value = null;

      // Store additional user data in Firestore with a default role
      await addDoc(collection(db, 'users'), {
        uid: user.value.uid,
        email: user.value.email,
        role: 'user' // Assign default role
      });
    } catch (err) {
      error.value = err.message;
    }
  };


  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      error.value = null;
    } catch (err) {
      error.value = err.message;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      error.value = null;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { user, error, register, login, logout };
}
