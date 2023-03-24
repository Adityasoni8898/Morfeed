import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

console.log("hello");

const firebaseConfig = {
    apiKey: "AIzaSyAm6aFImVN9qhwCX4ugmTEPCR1Uvb4QqrA",
    authDomain: "hero-maker-930ba.firebaseapp.com",
    projectId: "hero-maker-930ba",
    storageBucket: "hero-maker-930ba.appspot.com",
    messagingSenderId: "651547303745",
    appId: "1:651547303745:web:5dd775a7b058cda1444bc0"
};

const app = initializeApp(firebaseConfig);
// const auth = firebase.auth();

// -------------------------------------------

const auth = getAuth(app);

// -------------------------------------------

var currentUser = {};

$("#create-new-user").click(function(){
var email = $("#signup_email").val();
var password = $("#signup_password").val();
console.log("Registered " + email + " " + password);
createNewUser(email, password);
});

// $("#sign-in-button").click(function(){
// var email = $("#signup_email").val();
// var password = $("#signup_password").val();
// SignIn(email, password);
// console.log("Signed In " + email);
// });

// $("#create-newhero-btn").click(function(){

//     const userBasicData = {
//         id: currentUser.uid,
//       //   owner: currentUser.uid,
//         name : $("#name").val(),
//         designation : $("#designation").val(),
//         experience : $("#experience").val(),
//         country : $("#country").val(),
//         bio : $("#bio").val(),
//       };
  
//     addDataToDB(userBasicData);
// })

// function addDataToDB(currentUser){
//     console.log("Hello ${currentUser.name}");
//     console.log(currentUser.id);

//     const db = getDatabase();
//     set(ref(db, 'Users/'+ currentUser.id + '/Basic-Data' ), currentUser);
//   }

function createNewUser(email, password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
    });
}

// function SignIn(email, password){
//   signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     // const errorCode = error.code;
//     // const errorMessage = error.message;
//     alert("Incorrect Password...")
//   });
// }

function writeUserData(user) {
  const db = getDatabase();
  set(ref(db, 'users/' + user.uid), {
    email: user.email
  });
}



onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    var email = user.email;
    currentUser = user;
    writeUserData(user);
    console.log(currentUser.email + " logged in")

    // ...
  } else {
    // User is signed out
    // ...
  }
});