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

document.getElementById("bookNow_form").style.display = "none";

function openForm() {
  document.getElementById("bookNow_form").style.display = "block";
}

const close = document.querySelector(".close");
close.addEventListener("click",()=>{
  document.getElementById("bookNow_form").style.display = "none";
})

const apiKey = 'BLV7euzdQ6uAmZc9hYsq-w';
const apiSecret = 'ahkOuYq0XHF3J4VvgSo6CnHer2YHyDpuh8Bx';

// IM Chat History Token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJRUlhySlY0QVQ4ZWROakRidFhoeFRBIn0.OtCJ9MREf5c71ps4eJSSqrkZ_tnOZ4RVwgOF-tFKEPo'
// const secretToken = '-_Z9Q4-CRDiyXj0uL-RhEA';
// const verificationToken = 'ZnQ7v4mnS2a3dhFADs2B0Q';

// Replace with your meeting details
const meetingTopic = document.getElementById("topic").value;
const meetingDuration = 60; // in minutes
const meetingTimezone = '(GMT+5:30) India'; // see https://zoom.github.io/api/#time-zones

const origin = "http://127.0.0.1:5500";

// Add a click event listener to the button
document.getElementById('book-session-btn').addEventListener('click', () => {
  // Make a POST request to the Zoom API to create a new meeting
  fetch(`https://api.zoom.us/v2/users/me/meetings`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Authorization': `Bearer ${apiKey}.${apiSecret}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${origin}`,
    },
    body: JSON.stringify({
      topic: meetingTopic,
      type: 2,
      duration: meetingDuration,
      timezone: meetingTimezone,
    }),
  })
    .then(response => response.json())
    .then(data => {
      // Redirect the user to the Zoom meeting URL
      const joinUrl = data.join_url;
      // window.location.href = joinUrl;
    })
    .catch(error => {
      console.log(error);
    });
});