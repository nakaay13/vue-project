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

<script>
import { fetchProducts } from '../modules/products';
import ProductList from '../components/ProductList.vue';
import AddProductForm from '../components/AddProductForm.vue';

export default {
  components: {
    ProductList,
    AddProductForm,
  },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.products = await fetchProducts(); // Fetch products when the component is created
      console.log("Fetched products:", this.products);
    },
  },
};
</script>
