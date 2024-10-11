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
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { updateProduct, deleteProduct } from '../modules/products';
  
  // Accept props and emit events
  const props = defineProps(['product']);
  const emit = defineEmits(['update']);
  const router = useRouter();
  
  const isEditing = ref(false);
  const editedProduct = ref({ ...props.product });
  
  // Watch for changes in `product` prop and update `editedProduct`
  watch(() => props.product, (newProduct) => {
    editedProduct.value = { ...newProduct };
  });
  
  function toggleEditMode() {
    isEditing.value = !isEditing.value;
  }
  
  async function saveProduct() {
    try {
      await updateProduct(editedProduct.value.id, editedProduct.value);
      isEditing.value = false;
      emit('update'); // Notify parent to refresh data
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }
  
  async function deleteProduct() {
    try {
      await deleteProduct(editedProduct.value.id);
      alert('Product deleted successfully!');
      router.push('/about'); // Redirect after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
  </script>
  