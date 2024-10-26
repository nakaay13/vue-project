<!-- src/components/Login.vue -->
<template>
    <div>
      <h3 class="text-center">LOGIN</h3>
      <h6 class="text-center">Please enter your e-mail and password:</h6>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label fs-5">E-mail address</label>
          <input type="email" v-model="email" class="form-control bg-primary" id="email" required>
          <div id="emailHelp" class="form-text fs-6">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label fs-5">Password</label>
          <input type="password" v-model="password" class="form-control bg-primary" id="password" required>
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary mt-3">Login</button>
        </div>
        <div v-if="error" class="text-danger text-center">{{ error }}</div>
      </form>
      <div class="text-center mt-3">
        <button class="btn btn-secondary" @click="handleRegister">Register</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import useUsers from '../modules/useUsers';
  
  const email = ref('');
  const password = ref('');
  const { login, register, error } = useUsers();
  
  const handleLogin = () => {
    login(email.value, password.value);
  };
  
  const handleRegister = () => {
    register(email.value, password.value);
  };
  </script>
  
  <style>
  /* Add any specific styles for your login component here */
  </style>
  