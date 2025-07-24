import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ADMIN_UID = 'wPDMZRDkBtPiocHPCa0VKDs3cl43'; // your actual UID

const Admin = () => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    image: '',
    category: ''
  });

  const [isAdmin, setIsAdmin] = useState(null); // null = loading

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === ADMIN_UID) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return alert('You are not authorized');
    try {
      await addDoc(collection(db, 'products'), {
        title: form.title,
        price: Number(form.price),
        image: form.image,
        category: form.category
      });
      alert('Product added');
      setForm({ title: '', price: '', image: '', category: '' });
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  if (isAdmin === null) return <p style={{ padding: '20px' }}>🔄 Checking access...</p>;
  if (!isAdmin) return <p style={{ padding: '20px' }}>⛔ Access Denied</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required type="number" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
        <button type="submit" style={{ marginTop: '10px' }}>Add</button>
      </form>
    </div>
  );
};

export default Admin;
