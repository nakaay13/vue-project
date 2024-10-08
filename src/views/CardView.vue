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
    <div class="edit">
      <button @click="deleteProduct">Delete</button>
      <button @click="isEditing ? saveProduct() : editProduct()">
        {{ isEditing ? 'Save' : 'Edit' }}
      </button>
      
    </div>
    <!-- Editable Fields appear here -->
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
input, textarea {
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
import { fetchProducts, updateProduct, deleteProduct } from '../modules/products'; // Ensure you import these functions

export default {
  props: ['id'], // Accept the product ID as a prop from the route
  data() {
    return {
      product: null,
      products: [],
      quantity: 1,
      isEditing: false, // Track whether we are in edit mode
    };
  },
  async created() {
    this.products = await fetchProducts();
    this.product = this.products.find(product => product.id === this.id);
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product, this.quantity);
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
      alert('Product updated successfully!');
    },
    async deleteProduct() {
      await deleteProduct(this.product.id);
      alert('Product deleted successfully!');
      this.$router.push('/about'); // Redirect to the products list after deletion
    },
    editProduct() {
      this.isEditing = !this.isEditing; // Toggle edit mode
    },
  },
};
</script>
