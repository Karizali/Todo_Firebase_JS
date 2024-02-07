 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
 import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDi65QPjKmqchgo_r21lSVwLQHXtpDwdck",
   authDomain: "chat-app-smit-firsebase.firebaseapp.com",
   projectId: "chat-app-smit-firsebase",
   storageBucket: "chat-app-smit-firsebase.appspot.com",
   messagingSenderId: "883629760619",
   appId: "1:883629760619:web:9c12fffb6c6e56d610912e"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 // Initialize Cloud Firestore and get a reference to the service
 const db = getFirestore(app);