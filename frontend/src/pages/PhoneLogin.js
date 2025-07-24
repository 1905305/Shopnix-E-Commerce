import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => handleSendOtp(),
      });
    }
  }, []);

  const handleSendOtp = async () => {
    if (!phoneNumber) return alert('Enter phone number');

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert('OTP sent');
    } catch (err) {
      console.error(err);
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) return alert('Enter OTP');

    try {
      await confirmationResult.confirm(otp);
      alert('Phone login successful');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Invalid OTP');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Phone Login</h2>
      <input
        type="tel"
        placeholder="+91XXXXXXXXXX"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{ margin: '10px', padding: '5px' }}
      />
      <br />
      <div id="recaptcha-container"></div>
      <button onClick={handleSendOtp}>Send OTP</button>
      <br />
      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ margin: '10px', padding: '5px' }}
          />
          <br />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default PhoneLogin;
