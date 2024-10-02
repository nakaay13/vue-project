// src/modules/productService.js
import { db } from './firebase'; // Import your Firestore database instance
import { collection, getDocs } from 'firebase/firestore';

export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching products: ", error);
    return []; // Return an empty array on error
  }
};
