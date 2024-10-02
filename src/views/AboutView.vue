<template>
   <div class="row g-0">
    <div class="hero-img-vapes col-12">
      <div class="text-hero-vapes col-3">
        <p class="fs-1 text-end">Our products</p>
      </div>
    </div>
  </div>
  <div class="products-container">
    <div class="products"> 
      <div v-for="product in products" :key="product.id">
        <RouterLink :to="{ name: 'CardView', params: { id: product.id } }" class="router-link">
        <div class="card last-card text-primary bg-secondary rounded-4 text-center" style="width: 17rem;">
            <img :src="product.image" class="card-img-top rounded-top-4" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.price }} DKK</p>
            </div>
        </div>
        </RouterLink>
    </div>
  </div>

  </div>
</template>

<style scoped>
.router-link {
  text-decoration: none;
}
</style>

<script>
import { fetchProducts } from '../modules/products';
export default {
  data() {
    return {
      products: [],
    };
  },
  async created() {
    this.products = await fetchProducts(); // Fetch products when the component is created
    console.log("Fetched products:", this.products);
  }
};
</script>

