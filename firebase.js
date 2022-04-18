import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDDeg6Sa-0CEs-FUSMTaBZaN1_8YVwDtxk",
	authDomain: "copy-49f3d.firebaseapp.com",
	projectId: "copy-49f3d",
	storageBucket: "copy-49f3d.appspot.com",
	messagingSenderId: "111225248805",
	appId: "1:111225248805:web:0f59d500d32d792fe9f3cc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
