<template>
    <div class="cart-container">
      <div v-if="cart.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="item in cart" :key="item.product.id" class="cart-item">
            <img :src="item.product.image" alt="Product Image" />
            <div class="in-cart">
              <h3>{{ item.product.name }}</h3>
              <p>{{ item.product.price }} DKK</p>
              <div class="quantity">
                <p>Quantity:</p>
                <input type="number" v-model="item.quantity" min="1" @change="updateCart(item.product.id, item.quantity)" />
              </div>
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

  input{
    width: 50%;
    padding: 12px 20px;
    margin-left: 10px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 30px;
    box-sizing: border-box;
    
  }

  button{
    background-color: #306614;
    color: #fff;
    padding: 8px 15px;
    border: none;
    cursor: pointer;
    width: 100%;
    border-radius: 30px;
}

p{
    padding: 0;
    margin: 0;
}
  </style>
  