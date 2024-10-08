// src/modules/productService.js
import { db } from './firebase'; // Import your Firestore database instance
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';


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

// function to delete a product
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    console.error("Error deleting product: ", error);
  }
};

//  function to update a product
export const updateProduct = async (productId, updatedData) => {
  try {
    await updateDoc(doc(db, 'products', productId), updatedData);
  } catch (error) {
    console.error("Error updating product: ", error);
  }
};

//  function to add a product
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), product);
    console.log("Product added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
  }
};