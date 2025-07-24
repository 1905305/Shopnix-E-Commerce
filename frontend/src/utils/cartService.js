import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const saveCartToFirestore = async (userId, cartItems) => {
  try {
    await setDoc(doc(db, 'carts', userId), { items: cartItems });
  } catch (err) {
    console.error('Error saving cart:', err);
  }
};

export const getCartFromFirestore = async (userId) => {
  try {
    const cartDoc = await getDoc(doc(db, 'carts', userId));
    if (cartDoc.exists()) {
      return cartDoc.data().items || [];
    }
    return [];
  } catch (err) {
    console.error('Error loading cart:', err);
    return [];
  }
};
