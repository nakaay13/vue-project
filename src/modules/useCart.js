// src/modules/useCart.js
import { ref } from 'vue';

export const useCart = () => {
  const cartItems = ref([]);
  const showCart = ref(false);

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.value.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.value.push({ product, quantity });
    }
    console.log('Cart items:', JSON.stringify(cartItems.value, null, 2));
  };

  const updateCart = ({ productId, quantity }) => {
    const item = cartItems.value.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(item => item.product.id !== productId);
  };

  return {
    cartItems,
    showCart,
    addToCart,
    updateCart,
    removeFromCart,
  };
};
