var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

function currentDate() {
  const currentLink = this
  const activeDate = document.querySelector(".date.current")
  activeDate.classList.remove("current")
  currentLink.classList.add("current")
}

const dateLinks = document.getElementsByClassName("date");
[...dateLinks].forEach(dateLink => dateLink.addEventListener("click", currentDate));

function openForm() {
  document.getElementById("bookNow_form").style.display = "block";
}

const close = document.querySelector(".close");
close.addEventListener("click",()=>{
  document.getElementById("bookNow_form").style.display = "none";
})


//-------------------------------------------------------------------------------------------------


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";


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

document.addEventListener("DOMContentLoaded", function(event) {
    fetchMainData();
    fetchAdditionalData();
});

const clickedId = sessionStorage.getItem("clickedMentorId");
console.log(clickedId);

function fetchMainData(){
    const db = getDatabase();
    const dbRef = ref(db, 'Mentors/' + clickedId);

    onValue(dbRef, (snapshot) => {
            let id = snapshot.key;
            let img = snapshot.val().img;
            let name = snapshot.val().name;
            let designation = snapshot.val().designation;

            addItemsToPage(id, img, name, designation)
        }
    )
}

function fetchAdditionalData(){
  const db = getDatabase();
  const dbRef = ref(db, 'Users/' + clickedId + '/Basic-Data');

  onValue(dbRef, (snapshot) => {
          let bio = snapshot.val().bio;
          let country = snapshot.val().country;
          let experience = snapshot.val().experience;

          const mentorBio = document.querySelector(".mentor_bio");
          const mentorExperience = document.querySelector(".mentor_experience");

          mentorBio.innerHTML = bio;
          mentorExperience.innerHTML = experience;
      }
  )
}

function addItemsToPage(id, img, name, designation){
    const mentorImage = document.querySelector(".mentor_image");
    const mentorName = document.querySelector(".mentor_name");
    const mentorDesignation = document.querySelector(".mentor_desig");
    const mentorBio = document.querySelector(".mentor_bio");

    mentorImage.src = img;
    mentorName.innerHTML = name;
    mentorDesignation.innerHTML = designation;
    
}
