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

function createNewUser(email, password){
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      const user = userCredential.user;
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
  });
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

  function addDataToDB(userBasicData){
    console.log("Hello " + userBasicData.name);
    
    const db = getDatabase();
    set(ref(db, 'Users/'+ userBasicData.id + '/Basic-Data' ), userBasicData);
    console.log("Your Data have been added Successfully");
  }