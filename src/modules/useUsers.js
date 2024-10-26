// src/modules/useUsers.js
import { ref } from 'vue';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const user = ref(null);
const error = ref(null);

const useUsers = () => {
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      // Save the user to your Firestore database (add role as 'user')
      // Assuming you have Firestore setup and imported
    } catch (err) {
      error.value = err.message;
      console.error('Registration Error:', error.value);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
    } catch (err) {
      error.value = err.message;
      console.error('Login Error:', error.value);
    }
  };

  const logout = async () => {
    await signOut(auth);
    user.value = null;
  };

  return {
    user,
    error,
    register,
    login,
    logout,
  };
};

export default useUsers;
