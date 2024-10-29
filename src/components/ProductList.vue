<!-- src/components/ProductList.vue -->
<template>
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
  
  .products-container {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  
  .products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    justify-items: center;
    width: 80%;
    max-width: 1200px;
  }
  
  /* Responsive adjustments */
  @media (max-width: 1200px) {
    .products {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (max-width: 992px) {
    .products {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 576px) {
    .products {
      grid-template-columns: 1fr;
    }
  }
  
  .card {
    width: 100%;
    max-width: 17rem;
  }
  </style>
  

  
  <script setup>
  import { defineProps } from 'vue';
  
  // Accept products as a prop
  const props = defineProps({
    products: {
      type: Array,
      required: true,
    },
  });
  </script>
  