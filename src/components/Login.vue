<template>
    <div>
      <h3 class="text-center">{{ user ? 'You are logged in as: ' + user.email : 'Login / Register' }}</h3>
      <h6 v-if="error" class="text-danger text-center">{{ error }}</h6>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required>
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary mt-3">{{ user ? 'Logout' : 'Login' }}</button>
        </div>
        <div class="d-flex justify-content-center mt-2">
          <button type="button" @click="toggleRegister" class="btn btn-link">{{ isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register' }}</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useUsers } from '../modules/useUsers';
  
  export default {
    setup() {
      const { user, error, registerUser, loginUser, logoutUser } = useUsers();
      const email = ref('');
      const password = ref('');
      const isRegistering = ref(false);
  
      const handleSubmit = () => {
        if (isRegistering.value) {
          registerUser(email.value, password.value);
        } else {
          loginUser(email.value, password.value);
        }
      };
  
      const toggleRegister = () => {
        isRegistering.value = !isRegistering.value;
        email.value = ''; // Clear email on toggle
        password.value = ''; // Clear password on toggle
      };
  
      return {
        user,
        error,
        email,
        password,
        isRegistering,
        handleSubmit,
        toggleRegister,
        logoutUser,
      };
    },
  };
  </script>
  