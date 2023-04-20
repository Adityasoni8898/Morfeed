import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getStorage, uploadBytes, ref as imageRef, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

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

const storage = getStorage(app);

const auth = getAuth(app);

// const storageRef = ref(storage, 'images');

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Auth state persistence enabled.");
  })
  .catch((error) => {
    console.log(error.message);
  });


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
        localStorage.setItem("userToken", user.getIdToken());
        document.getElementsByClassName("error").style.display = "none";
    })
    .catch((error) => {
     var errorCode = error.code;
     var errorMessage = error.message;
     console.log(errorMessage);
     document.getElementsByClassName("error").style.display = "block";
    });
}

function SignIn(email, password){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    document.getElementsByClassName("error").style.display = "none";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    document.getElementsByClassName("error").style.display = "block"; 
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

const mentorForm = document.querySelector(".mentor_form");


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

      registrationForm.style.display="none";
      mentorForm.style.display = "block";

      $("#register-mentor-data").click(function() {
        addDataToMentor(userBasicData);
        mentorProfilePic(userBasicData);
      })
    };
    
    if (isMentee) {
      addDataToMentee(userBasicData);
      setTimeout(() => {
        window.location.href = "../Pages/find_a_mentor.html";
      }, 2000); 
    };
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
      // id: currentUser.id,
      name : $("#name").val(),
      designation : $("#designation").val(),
      img: "image-link",
      status: $("#status").val(),
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

// ----------------profile pic upload-------------------

function mentorProfilePic(currentUser){
  document.getElementById('register-mentor-data').innerHTML = "Please wait...";
  document.getElementById('register-mentor-data').style.opacity = "0.75";
  
  //moved the entire code here because on a seperate file, the code was not working...

  const inputFile = document.getElementById('mentor-image');
  const outputimage = document.querySelector('.mentordisplay');
  
  // Code for Compressing and cropping the image
  const file = inputFile.files[0];

  // Create a new image element
  const img = new Image();

  // Load the input file into the image element
  img.onload = () => {
    // Create a canvas element
    const canvas = document.createElement('canvas');

    // Calculate the aspect ratio of the input image
    const ctx = canvas.getContext("2d");
    const maxSize = 200 * 1024;
    let width = img.width;
    let height = img.height;
    // Compress the image
    let compressionRatio = 1;
    const fileSize = file.size;

    if (fileSize > maxSize) {
      compressionRatio = Math.sqrt(maxSize / fileSize);
    }
    const newWidth = width * compressionRatio;
    const newHeight = height * compressionRatio;
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    // Crop the image to a square with the maximum middle part of the image
    let offsetX = 0;
    let offsetY = 0;
    let cropWidth = width;
    let cropHeight = height;

    if (width > height) {
      cropWidth = height;
      offsetX = (width - height) / 2;
    } else {
      cropHeight = width;
      offsetY = (height - width) / 2;
    }
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);


    // Compress the image by converting it to JPEG with a variable quality
    let quality = 0.8;
    let compressedImageData = canvas.toDataURL('image/jpeg', quality);
    while (compressedImageData.length > 200000 && quality > 0.1) {
      quality -= 0.1;
      compressedImageData = canvas.toDataURL('image/jpeg', quality);
    }

    //display the image
    outputimage.innerHTML = "<img src='" + compressedImageData + "' width='" + 100 + "' height='" + 100 + "'>";

    // Convert the data URL to a Blob object
    const compressedImageBlob = dataURLToBlob(compressedImageData);
    
    // Upload the compressed image to Firebase Storage
    const storageRef = imageRef(storage, "Mentor_profile_pic/" + currentUser.name + "/profile.jpeg");
    uploadBytes(storageRef, compressedImageBlob).then(snapshot => {
      // console.log('File available at', snapshot.ref.getDownloadURL());


        getDownloadURL(storageRef).then((url) => {
            const db = getDatabase();
            set(ref(db, 'Mentors/'+ currentUser.id), {img : url});
            console.log("added image link");
        }).catch((error) => {
          console.log(error.message);
        });

        //to find a mentor page
        // setTimeout(() => {
        //   window.location.href = "../Pages/find_a_mentor.html";
        // }, 500); 
    }).catch(error => {
      console.error(error);
    });
  };

  // Set the source of the image element to the input file
  img.src = URL.createObjectURL(file);

  // Convert a data URL to a Blob object
  function dataURLToBlob(dataURL) {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
  }

  // const storageRef = imageRef(storage, "Mentor_profile_pic/kkk/profile.jpeg");

  // getDownloadURL(storageRef).then((url) => {
  //   console.log("hello");
  //   mentorPicture.src = url;
  // }).catch((error) => {
  //   console.log(error.message);
  // });

  // const db = getDatabase();
  // set(ref(db, 'Mentors/'+ currentUser.id), {img : "image-link"});

}
