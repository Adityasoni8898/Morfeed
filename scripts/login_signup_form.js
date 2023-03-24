import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAxmU8ngD4BQwLOrGz8v3YOfD82vmP2BfY",
    authDomain: "morfeed.firebaseapp.com",
    databaseURL: "https://morfeed-default-rtdb.firebaseio.com",
    projectId: "morfeed",
    storageBucket: "morfeed.appspot.com",
    messagingSenderId: "650817798515",
    appId: "1:650817798515:web:04d400054e7cc4c7880506",
    measurementId: "G-DR1VSR1S30"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

var currentUser = {};

$("#create-new-user").click(function(){
    var email = $("#signup_email").val();
    var password = $("#signup_password").val();
    createNewUser(email, password);
    console.log("Sign up Successfull!");
});

$("#login-btn").click(function(){
  var loginEmail = $("#login-email").val();
  var loginPassword = $("#login-password").val();
  SignIn(loginEmail, loginPassword);
  console.log(`${loginEmail} logged in!`);
});

function createNewUser(email, password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {
     var errorCode = error.code;
     var errorMessage = error.message;
     console.log(errorMessage);
    });
}

function SignIn(email, password){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      var email = user.email;
      currentUser = user;
    } else {

    }
  });

// ------------------adding data to DB ----------------------------


  $("#register-btn").click(function(){
    console.log("adding...");
    const userBasicData = {
      id: currentUser.uid,
    //   owner: currentUser.uid,
      name : $("#name").val(),
      designation : $("#designation").val(),
      experience : $("#experience").val(),
      country : $("#country").val(),
      bio : $("#bio").val(),
    };

    addDataToDB(userBasicData);
  })

  function addDataToDB(currentUser){
    console.log("Hello ${currentUser.name}");
    console.log(currentUser.id);

    const db = getDatabase();
    set(ref(db, 'Users/'+ userBasicData.id + '/Basic-Data' ), userBasicData);
    console.log("Your Data have been added Successfully");
  }

  function addDataToMentor(currentUser){
    console.log(`Hello ${currentUser.name}`);
    console.log(currentUser.id);

    const db = getDatabase();
    set(ref(db, 'Users/'+ currentUser.id + '/Mentor' ), currentUser);
  }

  function addDataToMentee(currentUser){
    console.log(`Hello ${currentUser.name}`);
    console.log(currentUser.id);

    const db = getDatabase();
    set(ref(db, 'Users/'+ currentUser.id + '/Mentor' ), currentUser);
  }

   // -----close button---
   const registrationForm = document.querySelector(".registration_form");
   const close = document.querySelector(".close");
   close.addEventListener("click",()=>{
   registrationForm.style.display="none"
   document.querySelector(".overlay").style.display = "none";
   
})