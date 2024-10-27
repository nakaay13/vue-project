// src/modules/useProducts.js
import { ref, onMounted } from 'vue';
import { db } from './firebase'; // Import your Firestore database instance
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Composable function to manage products
export const useProducts = () => {
  const products = ref([]);
  const newProduct = ref({
    name: '',
    price: null,
    image: '',
    weight: null,
    description: ''
  });

  // Fetch all products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      products.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching products: ", error);
      products.value = []; // Return an empty array on error
    }
  };

  // Function to add a new product
const addProduct = async () => {
  if (!newProduct.value.name || !newProduct.value.price) return; // Ensure fields are filled
  try {
    const docRef = await addDoc(collection(db, 'products'), newProduct.value);
    console.log("Product added with ID: ", docRef.id);
    alert('Product added successfully!'); // Show alert
    newProduct.value = { name: '', price: null, image: '', weight: null, description: '' }; // Reset form
    await fetchProducts(); // Refresh the product list
  } catch (error) {
    console.error("Error adding product: ", error);
  }
};

  // Function to update a product
  const updateProduct = async (productId, updatedData) => {
    try {
      await updateDoc(doc(db, 'products', productId), updatedData);
      await fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      await fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  // Load products on mounted
  onMounted(fetchProducts);

  return {
    products,
    newProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
  };
};
