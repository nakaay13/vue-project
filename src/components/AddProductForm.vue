<!-- src/components/AddProductForm.vue -->
<template>
    <div class="form">
      <h1>Add Product</h1>
      <form @submit.prevent="addProduct">
        <input v-model="newProduct.name" placeholder="Name" />
        <input v-model="newProduct.price" placeholder="Price" type="number" />
        <input v-model="newProduct.image" placeholder="Image URL" />
        <input v-model="newProduct.weight" placeholder="Weight" type="number" />
        <button type="submit">Add Product</button>
      </form>
    </div>
  </template>
  
  <style scoped>
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px 0;
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
  </style>
  
  <script setup>
    import { useProducts } from '../modules/useProducts';
    // Use the composable to access products functionality
    const { addProduct, newProduct } = useProducts();
  </script>
  