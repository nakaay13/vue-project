<!-- src/components/RegisterForm.vue -->
<template>
    <div class="register-container">
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
  

  <style scoped>
.register-container {
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