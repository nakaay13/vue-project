<template>
  <div class="row g-0">
    <div class="hero-img-vapes col-12">
      <div class="text-hero-vapes col-3">
        <p class="fs-1 text-end">Our products</p>
      </div>
    </div>
  </div>
  
  <ProductList :products="products" />
  <AddProductForm @product-added="fetchProducts" />
</template>

<style scoped>
/* Add any necessary styles here */
</style>

<script setup>
import { onMounted } from 'vue';
import { useProducts } from '../modules/useProducts'; // Import the composable
import ProductList from '../components/ProductList.vue';
import AddProductForm from '../components/AddProductForm.vue';

const { products, fetchProducts } = useProducts(); // Destructure the products and fetch function

// Fetch products when the component is mounted
onMounted(() => {
  fetchProducts();
});
</script>
