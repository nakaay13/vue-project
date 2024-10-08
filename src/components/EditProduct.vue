<!-- src/components/EditProduct.vue -->
<template>
    <div v-if="product">
      <div class="edit">
        <button @click="deleteProduct">Delete</button>
        <button @click="isEditing ? saveProduct() : toggleEditMode()">
          {{ isEditing ? 'Save' : 'Edit' }}
        </button>
      </div>
      <div v-if="isEditing" class="edit-mode">
        <h3>Edit Product Details:</h3>
        <input v-model="product.name" placeholder="Product Name" />
        <input v-model.number="product.weight" placeholder="Weight (g)" />
        <textarea v-model="product.description" placeholder="Description"></textarea>
        <input v-model.number="product.price" placeholder="Price (DKK)" />
        <input v-model="product.image" placeholder="Image URL" />
      </div>
    </div>
    <div v-else>
      <p>Loading product details...</p>
    </div>
  </template>
  
  <style scoped>
  .edit {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
  }
  .edit-mode {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
  }
  .edit-mode input,
  .edit-mode textarea {
    margin: 5px 0;
    width: 80%; /* Adjust as necessary */
  }
  button {
    background-color: #306614;
    color: #fff;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 50%;
    border-radius: 30px;
    margin-left: 20px;
  }
  input, textarea {
  width: 20%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 30px;
  box-sizing: border-box;
}
  </style>
  
  <script>
  import { updateProduct, deleteProduct } from '../modules/products';
  
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
      onUpdate: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        isEditing: false, // Track whether we are in edit mode
      };
    },
    methods: {
      toggleEditMode() {
        this.isEditing = !this.isEditing; // Toggle edit mode
      },
      async saveProduct() {
        await updateProduct(this.product.id, {
          name: this.product.name,
          weight: this.product.weight,
          description: this.product.description,
          price: this.product.price,
          image: this.product.image,
        });
        this.isEditing = false; // Exit edit mode after saving
        this.onUpdate(); // Call the parent update function to refresh the data
        alert('Product updated successfully!');
      },
      async deleteProduct() {
        await deleteProduct(this.product.id);
        alert('Product deleted successfully!');
        this.$router.push('/about'); // Redirect to the products list after deletion
      },
    },
  };
  </script>
  