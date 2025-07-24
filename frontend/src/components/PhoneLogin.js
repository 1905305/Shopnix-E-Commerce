import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

...

const { setUser } = useContext(AuthContext);
const navigate = useNavigate();

const handleVerifyOTP = async () => {
  try {
    const result = await confirmationResult.confirm(otp);
    const user = result.user;

    // ✅ Save user profile to Firestore if it's not already there
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        phone: user.phoneNumber,
        createdAt: new Date().toISOString(),
        cart: [],
      });
    }

    setUser(user); // 🔑 Set user in AuthContext
    alert("Phone login successful");
    navigate('/'); // Go to homepage
  } catch (err) {
    console.error(err);
    alert("Invalid OTP");
  }
};
