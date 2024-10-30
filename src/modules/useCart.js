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

  /* const removeFromCart = (productId) => {
    console.log('Removing product with ID:', productId);
    cartItems.value = cartItems.value.filter(item => item.product.id !== productId);
  }; */
  const removeFromCart = (productId) => {
    const index = cartItems.value.findIndex(item => item.product.id === productId); // Find the index of the item with the specified product ID
    if (index !== -1) {
      cartItems.value.splice(index, 1); // Use splice to maintain reactivity, splice modifies the original array and removes the item at the specified index
    }
  };

  return {
    cartItems,
    showCart,
    addToCart,
    updateCart,
    removeFromCart,
  };
};
