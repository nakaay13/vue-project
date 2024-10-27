<template>
  <div class="row g-0">
    <div class="hero-img-vapes col-12">
      <div class="text-hero-vapes col-3">
        <p class="fs-1 text-end">Our products</p>
      </div>
    </div>
  </div>
  
  <ProductList :products="products" @addToCart="handleAddToCart"/>
  <AddProductForm v-if="userRole  === 'admin'" @product-added="fetchProducts" />
</template>

<style scoped>
/* Add any necessary styles here */
</style>

<script setup>
import { onMounted, defineEmits } from 'vue';
import { useProducts } from '../modules/useProducts'; // Import the composable
import ProductList from '../components/ProductList.vue';
import AddProductForm from '../components/AddProductForm.vue';
import { useUsers } from '../modules/useUsers'; // Import useUsers to access user role


const emit = defineEmits(['addToCart']); // Declare the event that AboutView will emit

const { products, fetchProducts } = useProducts(); // Destructure the products and fetch function
const { userRole } = useUsers(); // Get user role
// Fetch products when the component is mounted
onMounted(() => {
  fetchProducts();
});

// Method to handle adding a product to the cart
const handleAddToCart = (product, quantity) => {
  emit('addToCart', product, quantity); // Emit the event to the parent
};
</script>
