import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ✅ Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Google Auth provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// ✅ Login with Google (Popup fallback to Redirect)
export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (popupError) {
    console.warn('Popup blocked, falling back to redirect...');
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (redirectError) {
      console.error('Google login failed:', redirectError);
    }
  }
};

// ✅ Generate invisible reCAPTCHA for phone login
export const generateRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha',
      {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA verified:', response);
        },
      },
      auth
    );
  }
};

// ✅ Sign in with Phone Number
export const signInWithPhone = async (phoneNumber) => {
  generateRecaptcha();
  const appVerifier = window.recaptchaVerifier;
  return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};
