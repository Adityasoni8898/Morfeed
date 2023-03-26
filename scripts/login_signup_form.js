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


//------------- Mentor Mentee selection ----------------

  var isMentor;
  var isMentee;

  $("#mentor-profile").click(function(){
    isMentor = true ;
    document.getElementById("popup_cards").style.display = "none";
    document.querySelector(".registration_form").style.display = "block";
  });

  $("#mentee-profile").click(function(){
    isMentee = true ;
    document.getElementById("popup_cards").style.display = "none";
    document.querySelector(".registration_form").style.display = "block";
  }); 
 

// ------------------adding data to DB ----------------------------


  $("#register-btn").click(function(){
    console.log("adding...");
    const userBasicData = {
      id: currentUser.uid,
      name : $("#name").val(),
      designation : $("#designation").val(),
      experience : $("#experience").val(),
      country : $("#country").val(),
      bio : $("#bio").val(),
    };

    addDataToDB(userBasicData);

    if (isMentor) {
      addDataToMentor(userBasicData);
    };
    
    if (isMentee) {
      addDataToMentee(userBasicData);
    };

    setTimeout(() => {
      window.location.href = "../Pages/find_a_mentor.html";
    }, 2000); 

  })

  function addDataToDB(currentUser){
    console.log(`Hello ${currentUser.name}`);
    console.log(currentUser.id);
    const db = getDatabase();
    set(ref(db, 'Users/'+ currentUser.id + '/Basic-Data' ), currentUser);
    console.log("Your Data have been added Successfully");
  }

  function addDataToMentor(currentUser){
    const db = getDatabase();
    set(ref(db, 'Users/'+ currentUser.id + '/Mentor-data/Mentorship_sessions_attended' ), {data : "null"});
    set(ref(db, 'Users/'+ currentUser.id + '/Mentor-data/Feedback_sessions_attended' ), {data : "null"});
    console.log("Mentor data added");

    const mentorData = {
      img: "null",
      status : "free",
      name : currentUser.name,
      designation : currentUser.designation
    }

    set(ref(db, 'Mentors/'+ currentUser.id), mentorData);
  }

  function addDataToMentee(currentUser){
    const db = getDatabase();
    set(ref(db, 'Users/'+ currentUser.id + '/Mentee-data/Mentorship_sessions_attended' ), {data : "null"});
    set(ref(db, 'Users/'+ currentUser.id + '/Mentee-data/Feedback_sessions_attended' ), {data : "null"});
    console.log("Mentee data added");
  }
  

// -----close button--- Moved to login_signup.js
