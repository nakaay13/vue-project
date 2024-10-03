<template>
    <div class="cart-container">
      <div v-if="cart.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="item in cart" :key="item.product.id" class="cart-item">
            <img :src="item.product.image" alt="Product Image" />
            <div>
              <p>{{ item.product.name }}</p>
              <p>{{ item.product.price }} DKK</p>
              <p>Quantity: {{ item.quantity }}</p>
              <input type="number" v-model="item.quantity" min="1" @change="updateCart(item.product.id, item.quantity)" />
              <button @click="removeFromCart(item.product.id)">Remove</button>
            </div>
          </li>
        </ul>
        <h4>Total: {{ cartTotal }} DKK</h4>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cart: Array,
    },
    computed: {
      cartTotal() {
        return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
    },
    methods: {
      updateCart(productId, quantity) {
        this.$emit('update-cart', { productId, quantity });
      },
      removeFromCart(productId) {
        this.$emit('remove-from-cart', productId);
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-container {
    padding: 20px;
  }
  .cart-item {
    display: flex;
    margin-bottom: 20px;
  }
  .cart-item img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  </style>
  