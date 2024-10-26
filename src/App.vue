<template>
  <header>

    <div class="row top g-0">
      <ul class="nav fs-2 d-flex align-items-center">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link">HOME</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/about" class="nav-link">PRODUCTS</RouterLink>
        </li>
        <li class="col"></li>
        <li type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
          </svg>
        </li>
        <div class="offcanvas offcanvas-end bg-danger" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header">
            <!-- <h5 class="offcanvas-title" id="offcanvasRightLabel"></h5> -->
            <div class="col"></div>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <h3 class="text-center">LOGIN</h3>
            <h6 class="text-center">Please enter your e-mail and password:</h6>
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fs-5">E-mail address</label>
                <input type="email" class="form-control bg-primary" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text fs-6">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label fs-5">Password</label>
                <input type="password" class="form-control bg-primary" id="exampleInputPassword1">
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary mt-3">Login</button>
              </div>
            </form>
          </div>
        </div>
        <li class="mx-3"  type="button" @click="toggleCart">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
          </svg>
        </li>
         <!-- Cart Offcanvas -->
         <div class="offcanvas offcanvas-end bg-danger" tabindex="-1" id="offcanvasRight1" aria-labelledby="offcanvasRightLabel" v-show="showCart">
          <div class="offcanvas-header">
            <h3 class="offcanvas-title" id="offcanvasRightLabel">CART</h3>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click="toggleCart"></button>
          </div>
          <div class="offcanvas-body">
            <Cart :cart="cartItems" @update-cart="updateCart" @remove-from-cart="removeFromCart" />
          </div>
        </div>
      </ul>
    </div>
  </header>


  <RouterView @add-to-cart="handleAddToCart" />
  <Footer />
</template>


<script>
import { Offcanvas } from 'bootstrap';
import Footer from './components/Footer.vue';
import Cart from './components/Cart.vue';
import { useCart } from './modules/useCart'; // Import the useCart composable

export default {
  components: { Footer, Cart },
  setup() {
    const { cartItems, showCart, addToCart, updateCart, removeFromCart } = useCart(); // Use the composable

    // Define toggleBootstrapOffcanvas inside setup
    const toggleBootstrapOffcanvas = (id) => {
      const offcanvasElement = document.getElementById(id);
      const offcanvas = new Offcanvas(offcanvasElement); // Use the imported Offcanvas class
      showCart.value ? offcanvas.show() : offcanvas.hide();
    };

    // Method to handle adding to cart
    const handleAddToCart = (product, quantity) => {
      try {
        addToCart(product, quantity);
        // showCart.value = true; // Removed this line
        toggleBootstrapOffcanvas('offcanvasRight1'); // Use this for opening the cart
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };

    const toggleCart = () => {
      showCart.value = !showCart.value; // Toggling the showCart variable
      toggleBootstrapOffcanvas('offcanvasRight1'); // Ensure this is correctly defined
    };

    return {
      cartItems,
      showCart,
      addToCart,
      updateCart,
      removeFromCart,
      toggleCart,
      handleAddToCart,
      toggleBootstrapOffcanvas, // Ensure this is returned
    };
  },
};
</script>

