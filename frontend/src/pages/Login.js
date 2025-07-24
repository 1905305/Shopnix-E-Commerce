import React from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Login successful');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const goToPhoneLogin = () => {
    navigate('/phone-login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      <button onClick={loginWithGoogle} style={{ margin: '10px' }}>
        Login with Google
      </button>
      <br />
      <button onClick={goToPhoneLogin}>Login with Phone</button>
    </div>
  );
};

export default Login;
