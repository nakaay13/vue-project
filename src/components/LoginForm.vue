<!-- src/components/LoginForm.vue -->
<template>
    <div class="login-container">
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

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
}
.login-container h2 {
  margin-bottom: 20px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  background-color: #306614;
  color: #fff;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 30px;
}
input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 30px;
    box-sizing: border-box;
  }
  a {
    cursor: pointer;
  }
</style>
  