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

<script>
import { fetchProducts } from '../modules/products';
import EditProduct from '../components/EditProduct.vue'; // Import the new component

export default {
  props: ['id'], // Accept the product ID as a prop from the route
  components: {
    EditProduct,
  },
  data() {
    return {
      product: null,
      products: [],
      quantity: 1,
    };
  },
  async created() {
    await this.fetchProduct(); // Fetch the product details
  },
  methods: {
    async fetchProduct() {
      this.products = await fetchProducts();
      this.product = this.products.find(product => product.id === this.id);
    },
    addToCart() {
      this.$emit('add-to-cart', this.product, this.quantity);
    },
  },
};
</script>
