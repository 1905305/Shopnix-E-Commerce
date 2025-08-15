import React from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

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
      <img
        src="/assets/logingi.gif"
        alt="Logging in"
        style={{ width: '250px', height: 'auto', marginBottom: '20px' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={loginWithGoogle}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: '#fff'
          }}
        >
          <GoogleIcon style={{ fontSize: '20px' }} /> Login with Google
        </button>
        <button
          onClick={goToPhoneLogin}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: '#fff'
          }}
        >
          <PhoneIphoneIcon style={{ fontSize: '20px' }} /> Login with Phone
        </button>
      </div>
    </div>
  );
};

export default Login;

