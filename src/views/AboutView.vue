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
        <div class="card last-card text-primary bg-secondary rounded-4 text-center" style="width: 17rem;">
            <img :src="product.image" class="card-img-top rounded-top-4" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.price }} DKK</p>
            </div>
        </div>
    </div>
  </div>

  </div>
</template>

<script>
import { db } from '../modules/firebase'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      products: [] // Initialize an empty array to hold the product data
    };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      // Map the documents to an array, including the Firestore document ID
      this.products = querySnapshot.docs.map(doc => ({
        id: doc.id, // Get the Firestore document ID
        ...doc.data() // Get the document fields
      }));
      console.log("Fetched products:", this.products);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  }
};
</script>
