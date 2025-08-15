// src/pages/Profile.jsx
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Profile = () => {
  const [user] = useAuthState(auth);

  if (!user) return <p style={{ fontSize: '1.1rem', textAlign: 'center', marginTop: '2rem' }}>Please log in to view your profile.</p>;

  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <img
          src={user.photoURL}
          alt="Profile"
          style={{
            height: '150px',
            width: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        />
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Profile</h1>
        <p style={{ fontSize: '1.1rem', margin: '0.3rem 0' }}>
          <strong>Name:</strong> {user.displayName}
        </p>
        <p style={{ fontSize: '1.1rem', margin: '0.3rem 0' }}>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
