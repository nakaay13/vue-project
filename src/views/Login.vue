<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <button @click="handleLogout" v-if="user">Logout</button>
    <p v-if="error">{{ error }}</p>
    <p v-if="user">Logged in as {{ user.email }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useUsers } from '../modules/useUsers';

export default {
  setup() {
    const { user, error, login, register, logout } = useUsers();
    const email = ref('');
    const password = ref('');

    const handleLogin = () => login(email.value, password.value);
    const handleRegister = () => register(email.value, password.value);
    const handleLogout = () => logout();

    return { email, password, handleLogin, handleRegister, handleLogout, user, error };
  }
};
</script>


<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0;
}
</style>