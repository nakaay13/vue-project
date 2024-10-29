<template>
  <div class="row g-0">
    <div class="hero-img-vapes col-12">
      <div class="text-hero-vapes col-3">
        <p class="fs-1 text-end">Our products</p>
      </div>
    </div>
  </div>
  
  <ProductList :products="products" @addToCart="handleAddToCart"/>
  <AddProductForm v-if="userRole  === 'admin'" @product-added="refreshProducts" />
</template>

<style scoped>
/* Add any necessary styles here */
</style>

<script setup>
import { onMounted, defineEmits } from 'vue';
import { useProducts } from '../modules/useProducts';
import ProductList from '../components/ProductList.vue';
import AddProductForm from '../components/AddProductForm.vue';
import { useUsers } from '../modules/useUsers';

const emit = defineEmits(['addToCart']);
const { products, fetchProducts } = useProducts();
const { userRole } = useUsers();

// Fetch products when the component is mounted
onMounted(fetchProducts);

// Handle refreshing products after a new product is added
function refreshProducts() {
  fetchProducts();
}

// Method to handle adding a product to the cart
const handleAddToCart = (product, quantity) => {
  emit('addToCart', product, quantity);
};
</script>