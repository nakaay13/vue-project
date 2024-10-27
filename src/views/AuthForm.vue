<!-- src/views/AuthForm.vue -->
<template>
  <div class="form-container">
    <div v-if="!user">
      <LoginForm v-if="isLogin" :toggleForm="toggleForm" />
      <RegisterForm v-else :toggleForm="toggleForm" />
    </div>
    <div v-else>
      <p>You are logged in as {{ user.email }}</p>
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
    
  </template>
  
  <script>
  import { ref } from 'vue';
  import LoginForm from '../components/LoginForm.vue';
  import RegisterForm from '../components/RegisterForm.vue';
  import { useUsers } from '../modules/useUsers';
  
  export default {
    components: { LoginForm, RegisterForm },
    setup() {
      const { user, logout } = useUsers();
      const isLogin = ref(true);
  
      const toggleForm = () => {
        isLogin.value = !isLogin.value;
      };
  
      const handleLogout = () => {
        logout();
        isLogin.value = true; // Reset to login form after logout
      };
  
      return { isLogin, toggleForm, user, handleLogout };
    }
  };
  </script>
  
  <style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>