<!-- src/components/RegisterForm.vue -->
<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p v-if="error">{{ error }}</p>
      <p>Already registered? <a @click="toggleForm">Login here</a></p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useUsers } from '../modules/useUsers';
  
  export default {
    props: ['toggleForm'],
    setup() {
      const { register, error } = useUsers();
      const email = ref('');
      const password = ref('');
  
      const handleRegister = () => register(email.value, password.value);
  
      return { email, password, handleRegister, error };
    }
  };
  </script>
  