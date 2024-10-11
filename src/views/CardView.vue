<template>
  <div v-if="product">
    <div class="details-container">
      <div class="product-container">
        <img :src="product.image" alt="Product Image" />
        <div class="description-container">
          <h1>{{ product.name }}</h1>
          <h4>{{ product.weight }} g</h4>
          <p>{{ product.description }}</p>
          <h4>{{ product.price }} DKK</h4>
          <div class="input-cart">
            <input type="number" v-model.number="quantity" class="quantity-input" min="1" />
            <button @click="addToCart">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    
    <EditProduct :product="product" :onUpdate="fetchProduct" />

  </div>
  <div v-else>
    <p>Loading product details...</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProducts } from '../modules/useProducts'; // Import your composable
import EditProduct from '../components/EditProduct.vue';
import { useCart } from '../modules/useCart'; // Import the useCart composable

// Initialize composables
const { products, fetchProducts } = useProducts();
const { addToCart: addToCartMethod } = useCart(); // Destructure addToCart from useCart
const route = useRoute();
const quantity = ref(1);
const product = ref(null);

// Fetch product on mount
const fetchProduct = async () => {
  await fetchProducts(); // Ensure products are fetched
  // Find the product by ID
  product.value = products.value.find(p => p.id === route.params.id);
};

// Watch for changes in products to update product details
watch(products, () => {
  product.value = products.value.find(p => p.id === route.params.id);
});

// Fetch the product when the component mounts
onMounted(fetchProduct);

// Add to cart function
const addToCart = () => {
  if (product.value) {
    addToCartMethod(product.value, quantity.value); // Call the method from useCart
  }
};
</script>


<style scoped>
.details-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 80%;
  margin-top: 100px;
  margin-bottom: 50px;
}
.product-container img {
  width: 600px;
  height: 600px;
  border-radius: 10px;
  object-fit: cover;
}
.description-container {
  margin-left: 50px;
  width: 100%;
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
input {
  width: 20%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 30px;
  box-sizing: border-box;
}
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
</style>


