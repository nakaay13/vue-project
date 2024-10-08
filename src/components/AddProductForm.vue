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
  
  <script>
  import { addProduct } from '../modules/products';
  
  export default {
    data() {
      return {
        newProduct: {
          name: '',
          price: null,
          image: '',
          weight: null,
        },
      };
    },
    methods: {
      async addProduct() {
        await addProduct(this.newProduct);
        this.$emit('product-added'); // Emit an event to notify parent about the new product
        this.resetForm(); // Reset form fields
      },
      resetForm() {
        this.newProduct = {
          name: '',
          price: null,
          image: '',
          weight: null,
        };
      },
    },
  };
  </script>
  