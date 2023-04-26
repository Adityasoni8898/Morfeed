import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { getDatabase, ref, set, onValue  } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getStorage, uploadBytes, ref as imageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

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
const storage = getStorage(app);
const auth = getAuth(app);


var mentorNo = 0;

function addItemsToPage(img, name, designation){
    var mentorOptions = document.querySelector(".mentor_options");

    let mentorItem = `<div class="mentor_select">
                        <p class="free">Free</p>
                        <img class="mentor_img" src="${img}">
                        <div class="mentor_name">
                            <h3>${name}</h3>
                            <h4>${designation}</h4>
                        </div>
                        <div class="black_gradient"></div>
                    </div>`;

    mentorOptions.insertAdjacentHTML("beforeend", mentorItem);
}

function fetchData(){
    const db = getDatabase();
    const dbRef = ref(db, 'Mentors');

    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
                let img = childSnapshot.val().img;
                let name = childSnapshot.val().name;
                let designation = childSnapshot.val().designation;

                addItemsToPage(img, name, designation)
            }
        )
    })
}

window.onload(fetchData());