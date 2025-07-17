// backend/seed/seedCategories.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnaZI9Mfc743F5cS3e60FH5CHaFVGQ2aM",
  authDomain: "flipkart-clone-3a8cd.firebaseapp.com",
  projectId: "flipkart-clone-3a8cd",
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const categories = [
  { name: 'Mobiles', image: 'https://via.placeholder.com/150x100?text=Mobiles' },
  { name: 'Laptops', image: 'https://via.placeholder.com/150x100?text=Laptops' },
  { name: 'Fashion', image: 'https://via.placeholder.com/150x100?text=Fashion' },
  { name: 'Electronics', image: 'https://via.placeholder.com/150x100?text=Electronics' },
  { name: 'Home Appliances', image: 'https://via.placeholder.com/150x100?text=Home+Appliances' },
  { name: 'Books', image: 'https://via.placeholder.com/150x100?text=Books' },
  { name: 'Toys', image: 'https://via.placeholder.com/150x100?text=Toys' },
  { name: 'Beauty', image: 'https://via.placeholder.com/150x100?text=Beauty' },
  { name: 'Health', image: 'https://via.placeholder.com/150x100?text=Health' },
  { name: 'Furniture', image: 'https://via.placeholder.com/150x100?text=Furniture' },
  { name: 'Grocery', image: 'https://via.placeholder.com/150x100?text=Grocery' },
  { name: 'Footwear', image: 'https://via.placeholder.com/150x100?text=Footwear' },
  { name: 'Watches', image: 'https://via.placeholder.com/150x100?text=Watches' },
  { name: 'Jewellery', image: 'https://via.placeholder.com/150x100?text=Jewellery' },
  { name: 'Gaming', image: 'https://via.placeholder.com/150x100?text=Gaming' },
  { name: 'Stationery', image: 'https://via.placeholder.com/150x100?text=Stationery' },
  { name: 'Music', image: 'https://via.placeholder.com/150x100?text=Music' },
  { name: 'Travel', image: 'https://via.placeholder.com/150x100?text=Travel' },
  { name: 'Sports', image: 'https://via.placeholder.com/150x100?text=Sports' },
  { name: 'Fitness', image: 'https://via.placeholder.com/150x100?text=Fitness' },
  { name: 'Baby Care', image: 'https://via.placeholder.com/150x100?text=Baby+Care' },
  { name: 'Pet Supplies', image: 'https://via.placeholder.com/150x100?text=Pet+Supplies' },
  { name: 'Office Supplies', image: 'https://via.placeholder.com/150x100?text=Office+Supplies' },
  { name: 'Bags & Luggage', image: 'https://via.placeholder.com/150x100?text=Bags+%26+Luggage' },
  { name: 'Automotive', image: 'https://via.placeholder.com/150x100?text=Automotive' },
  { name: 'Lighting', image: 'https://via.placeholder.com/150x100?text=Lighting' },
  { name: 'Kitchenware', image: 'https://via.placeholder.com/150x100?text=Kitchenware' },
  { name: 'Home Decor', image: 'https://via.placeholder.com/150x100?text=Home+Decor' },
  { name: 'Tools & Hardware', image: 'https://via.placeholder.com/150x100?text=Tools+%26+Hardware' },
  { name: 'Crafts', image: 'https://via.placeholder.com/150x100?text=Crafts' },
];

async function insertCategories() {
  for (const cat of categories) {
    await addDoc(collection(db, 'categories'), cat);
    console.log(`✅ Inserted: ${cat.name}`);
  }
  console.log('✅ All categories inserted.');
}

insertCategories();