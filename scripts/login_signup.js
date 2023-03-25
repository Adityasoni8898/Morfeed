const loginForm = document.querySelector('#login_form');
const signupForm = document.querySelector('#signup_form');
const loginToggle = document.querySelector('#login_toggle');
const signupToggle = document.querySelector('#signup_toggle');

loginToggle.classList.add("selected");
signupForm.style.display = 'none';

loginToggle.addEventListener('click', () => {
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
  loginToggle.classList.add("selected");
  signupToggle.classList.remove("selected");
});

signupToggle.addEventListener('click', () => {
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  signupToggle.classList.add("selected");
  loginToggle.classList.remove("selected");
});
// ----------- Form control ------------------

document.querySelector(".registration_form").style.display = "none";
document.getElementById("popup_cards").style.display = "none";

function openForm() {
  document.getElementById("popup_cards").style.display = "block";
  document.querySelector(".overlay").style.display = "block";
}

     // -----close button---
     const registrationForm = document.querySelector(".registration_form");
     const close = document.querySelector(".close");
     close.addEventListener("click",()=>{
       registrationForm.style.display="none"
       document.querySelector(".overlay").style.display = "none";
      })
   