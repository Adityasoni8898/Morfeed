// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
// import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
// import { getStorage, uploadBytes, ref as imageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyAxmU8ngD4BQwLOrGz8v3YOfD82vmP2BfY",
//     authDomain: "morfeed.firebaseapp.com",
//     databaseURL: "https://morfeed-default-rtdb.firebaseio.com",
//     projectId: "morfeed",
//     storageBucket: "morfeed.appspot.com",
//     messagingSenderId: "650817798515",
//     appId: "1:650817798515:web:04d400054e7cc4c7880506",
//     measurementId: "G-DR1VSR1S30"
//   };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);
// const auth = getAuth(app);


// const mentorPicture = document.querySelector(".mentor_picture");

// const storageRef = imageRef(storage, "Mentor_profile_pic/kkk/profile.jpeg");


// getDownloadURL(storageRef).then((url) => {
//     console.log("hello");
//     mentorPicture.src = url;
//   }).catch((error) => {
//     console.log(error.message);
//   });