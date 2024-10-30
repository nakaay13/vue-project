<template>
  <div class="cart-container">
    <div v-if="cartItems.length === 0"> <!-- Accessing cartItems directly -->
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.product.id" class="cart-item">
          <img :src="item.product.image" alt="Product Image" />
          <div class="in-cart">
            <h3>{{ item.product.name }}</h3>
            <p>{{ item.product.price }} DKK</p>
            <div class="quantity">
              <p>Quantity:</p>
              <input
                type="number"
                v-model="item.quantity"
                min="1"
                 @input="$emit('update-cart', { productId: item.product.id, quantity: item.quantity })"
              />
            </div>
            <button @click="$emit('remove-from-cart', item.product.id)">Remove</button>
          </div>
        </li>
      </ul>
      <h4>Total: {{ cartTotal }} DKK</h4>
    </div>
  </div>
</template>

<script setup>


import { defineProps, computed } from 'vue';

const props = defineProps({
  cart: {
    type: Array,
    required: true
  }
});

// Use props.cart to access cart items
const cartItems = props.cart;
console.log('Cart props:', props.cart);
// Computed property for total cart amount
const cartTotal = computed(() => {
  return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
});
</script>

<style scoped>
.cart-container {
  font-size: 24px;
}
.cart-item {
  display: flex;
  margin-bottom: 40px;
}
.cart-item img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  object-fit: cover;
}
.quantity {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
}
input {
  width: 50%;
  padding: 12px 20px;
  margin-left: 10px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 30px;
  box-sizing: border-box;
}
button {
  background-color: #306614;
  color: #fff;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 30px;
}
p {
  padding: 0;
  margin: 0;
}
</style>
