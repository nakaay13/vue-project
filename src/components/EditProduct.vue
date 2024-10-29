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
      <input v-model="editedProduct.name" placeholder="Product Name" />
      <input v-model.number="editedProduct.weight" placeholder="Weight (g)" />
      <textarea v-model="editedProduct.description" placeholder="Description"></textarea>
      <input v-model.number="editedProduct.price" placeholder="Price (DKK)" />
      <input v-model="editedProduct.image" placeholder="Image URL" />
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
import { useProducts } from '../modules/useProducts';

const props = defineProps(['product']);
const emit = defineEmits(['update']);
const router = useRouter();
const { updateProduct, deleteProduct: deleteProductFromDB } = useProducts();

const isEditing = ref(false);
const editedProduct = ref({ ...props.product });

watch(() => props.product, (newProduct) => {
  editedProduct.value = { ...newProduct };
});

function toggleEditMode() {
  isEditing.value = !isEditing.value;
}

async function saveProduct() {
  try {
    await updateProduct(props.product.id, { ...editedProduct.value });
    isEditing.value = false;
    emit('update');
    alert('Product updated successfully!');
  } catch (error) {
    console.error('Error saving product:', error);
  }
}

async function deleteProduct() {
  try {
    await deleteProductFromDB(editedProduct.value.id);
    alert('Product deleted successfully!');
    router.push('/about');
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}
</script>