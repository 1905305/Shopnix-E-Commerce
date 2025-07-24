import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const products = [
  {
    title: 'iPhone 14 Pro',
    price: 129999,
    image: 'https://m.media-amazon.com/images/I/61XO4bORHUL.jpg',
    category: 'Mobiles',
  },
  {
    title: 'Redmi Note 12',
    price: 14999,
    image: 'https://m.media-amazon.com/images/I/71V--WZVUIL.jpg',
    category: 'Mobiles',
  },
  {
    title: 'ASUS TUF Gaming F15',
    price: 57999,
    image: 'https://m.media-amazon.com/images/I/71lYhcc++UL.jpg',
    category: 'Laptops',
  },
  {
    title: 'HP Pavilion x360',
    price: 62999,
    image: 'https://m.media-amazon.com/images/I/71vfkRK7G7L.jpg',
    category: 'Laptops',
  },
  {
    title: 'Boat Airdopes 141',
    price: 1199,
    image: 'https://m.media-amazon.com/images/I/618YI9vYIIL.jpg',
    category: 'Electronics',
  },
];

const insertProducts = async () => {
  for (const prod of products) {
    await addDoc(collection(db, 'products'), prod);
  }
  console.log('✅ Products inserted');
};

insertProducts();
