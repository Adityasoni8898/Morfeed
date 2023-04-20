
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

// const apiKey = 'BLV7euzdQ6uAmZc9hYsq-w';
// const apiSecret = 'ahkOuYq0XHF3J4VvgSo6CnHer2YHyDpuh8Bx';

// // IM Chat History Token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJRUlhySlY0QVQ4ZWROakRidFhoeFRBIn0.OtCJ9MREf5c71ps4eJSSqrkZ_tnOZ4RVwgOF-tFKEPo'
// const secretToken = '-_Z9Q4-CRDiyXj0uL-RhEA';
// const verificationToken = 'ZnQ7v4mnS2a3dhFADs2B0Q';

// // Replace with your meeting details
// const meetingTopic = 'New Meet';
// const meetingDuration = 60; // in minutes
// const meetingTimezone = '(GMT+5:30) India'; // see https://zoom.github.io/api/#time-zones

// // const origin = "http://127.0.0.1:5500";

// const jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkJMVjdldXpkUTZ1QW1aYzloWXNxLXciLCJleHAiOjE2ODE1NTc3MzQsImlhdCI6MTY4MTQ3MTMzNX0.naJ2H4v_yQ2IidxC62piAowIld5Mo7soG5Tlt8bc2kM';

// // // Add a click event listener to the button
// document.getElementById('book-session-btn').addEventListener('click', () => {
//   // Make a POST request to the Zoom API to create a new meeting
//   fetch(`https://api.zoom.us/v2/users/me/meetings`, {
//     method: 'POST',
//     mode: 'no-cors',
//     headers: {
//       'Authorization': `Bearer ${jwtToken}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       topic: meetingTopic,
//       type: 2,
//       duration: meetingDuration,
//       timezone: meetingTimezone,
//     }),
//   })
//   // .then(response => response.json())
//   .then(data => {
//       // Redirect the user to the Zoom meeting URL
//       const joinUrl = data.join_url;
//       // window.location.href = joinUrl;
//   })
//   // .catch(error => {
//   //   console.log(error);
//   // });
// });

// function generateZoomLink() {
//   const apiKey = 'BLV7euzdQ6uAmZc9hYsq-w';         
//   const apiSecret = 'ahkOuYq0XHF3J4VvgSo6CnHer2YHyDpuh8Bx';   
//   const jwToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkJMVjdldXpkUTZ1QW1aYzloWXNxLXciLCJleHAiOjE2ODEzMTc0NTAsImlhdCI6MTY4MTIzMTA1MX0.aq-HdX-OQwyFKCNV28ipWsUDAbx8VzWBvj3Qek47jPA';   
//   const meeting = {           
//     topic: 'New Zoom Meeting',
//     type: '2',           
//     password: Math.random().toString(36).slice(-8),
//     settings: {  
//     host_video: true,            
//     participant_video: true,            
//     waiting_room: false           
//   }         
//   }; 
//   const meetingData = btoa(JSON.stringify(meeting));
//   const apiUrl = `https://api.zoom.us/v2/users/me/meetings?access_token=${jwToken}`;
//   // const apiUrl = `https://api.zoom.us/v2/users/me/meetings?api_key=${apiKey}&api_secret=${apiSecret}`;
//   const url = `${apiUrl}&data=${meetingData}`;                  
//   const zoomLink = document.getElementById('zoom-link');         
//   zoomLink.textContent = url;
//   console.log(zoomLink.textContent);
// }

// function generateZoomLink() {
//   // Initialize the Zoom Web SDK
//   ZoomMtg.init({
//     leaveUrl: 'https://zoom.us/',
//     isSupportAV: true,
//     success: function() {
//       // Generate a new meeting link
//       ZoomMtg.generateSignature({
//         apiKey: 'BLV7euzdQ6uAmZc9hYsq-w',
//         apiSecret: 'ahkOuYq0XHF3J4VvgSo6CnHer2YHyDpuh8Bx',
//         meetingNumber: null,
//         role: 0,
//         success: function(res) {
//           // Construct the URL for the new meeting
//           const meetingNumber = res.meetingNumber;
//           const signature = res.signature;
//           const zoomLink = `https://zoom.us/j/${meetingNumber}?s=${signature}`;

//           // Update the HTML with the new meeting link
//           const zoomLinkElement = document.getElementById('zoom-link');
//           zoomLinkElement.textContent = zoomLink;
//         }
//       });
//     }
//   });
// }

// function generateZoomLink() {
//   const jwToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkJMVjdldXpkUTZ1QW1aYzloWXNxLXciLCJleHAiOjE2ODE0ODkyODYsImlhdCI6MTY4MTQwMjg4Nn0.eJvcutNzOjE-cGXsCkc3o8O32sJEUxU5Vw-4Ib-urwE';
//   const apiUrl = `https://api.zoom.us/v2/users/me/meetings?access_token=${jwToken}`;

//   fetch(apiUrl, {
//     mode: 'no-cors',
//   })
//   .then(response => response.json())
//   .then(data => {
//     const zoomURL = data.join_url;
//     console.log(zoomURL);
//   })
//   .catch(error => {
//     console.log(error);
//   });
// }

const generateZoomLink = async () => {
  // Obtain an access token using the OAuth authorization process
  const accessToken = await obtainAccessToken();

  // Specify the details for the new meeting
  const meetingDetails = {
    topic: "My Zoom Meeting",
    type: 2,
    start_time: "2023-04-14T09:00:00Z",
    duration: 60,
    password: "myzoompassword",
    timezone: "America/Los_Angeles",
    settings: {
      join_before_host: true,
    },
  };

  // Send a request to create the new meeting
  const response = await fetch(
    `https://api.zoom.us/v2/users/me/meetings`,
    {
      method: "POST",
      mode: 'no-cors',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetingDetails),
    }
  );

  // Parse the response JSON to obtain the meeting URL
  const { join_url } = await response.json();

  document.getElementById('zoom-link').innerHTML = join_url;

  // Return the meeting URL
  return join_url;
};

const obtainAccessToken = async () => {
  // Specify the OAuth authorization endpoint and parameters
  const authEndpoint = "https://zoom.us/oauth/authorize";
  const responseType = "code";
  const clientId = "_FAEZ32uRnKkoZGuJoWs3A";
  const redirectUri = "https://oauth.pstmn.io/v1/callback";
  // const scope = "YOUR_SCOPES";

  // Redirect the user to the Zoom authorization page
  const authUrl = `${authEndpoint}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}`;
  window.location.href = authUrl;

  // After the user grants permission, they will be redirected back to your redirect URL
  // with an authorization code in the query string
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");

  // Use the authorization code to obtain an access token
  const tokenEndpoint = "https://zoom.us/oauth/token";
  const grantType = "authorization_code";
  const clientSecret = "EqxjmsTBJDwwibHVmGHvwI2lFLaKRfuO";

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    mode: 'no-cors',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: grantType,
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  // Parse the response JSON to obtain the access token
  const { access_token } = await response.json();

  console.log(access_token);
  // Return the access token
  return access_token;
};