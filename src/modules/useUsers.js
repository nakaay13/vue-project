// src/composables/useUsers.js
import { ref } from 'vue';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export function useUsers() {
  const user = ref(null);
  const error = ref(null);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email format.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'Email is already registered.';
      case 'auth/weak-password':
        return 'Password is too weak.';
      default:
        return 'An unknown error occurred.';
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      error.value = null;
      await addDoc(collection(db, 'users'), {
        uid: user.value.uid,
        email: user.value.email,
        role: 'user'
      });
    } catch (err) {
      error.value = getErrorMessage(err.code);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      error.value = null;
    } catch (err) {
      error.value = getErrorMessage(err.code);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      error.value = null;
    } catch (err) {
      error.value = getErrorMessage(err.code);
    }
  };

  return { user, error, register, login, logout };
}
