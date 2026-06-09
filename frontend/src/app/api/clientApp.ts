// Import the functions you need from the SDKs you need
import {getApps, initializeApp} from "firebase/app";
import {getAnalytics, isSupported} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: "G-7G8Q6W9FGH",
};

// Initialize Firebase (only once)
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Analytics only works in browser
if (typeof window !== "undefined") {
	isSupported().then((supported) => {
		if (supported) getAnalytics(firebase_app);
	});
}

export default firebase_app;
