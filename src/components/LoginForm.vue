<!-- src/components/LoginForm.vue -->
<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
      <p>Don’t have an account? <a @click="toggleForm">Register here</a></p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useUsers } from '../modules/useUsers';
  
  export default {
    props: ['toggleForm'],
    setup() {
      const { login, error } = useUsers();
      const email = ref('');
      const password = ref('');
  
      const handleLogin = () => login(email.value, password.value);
  
      return { email, password, handleLogin, error };
    }
  };
  </script>
  