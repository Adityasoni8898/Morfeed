      // Initialize Firebase
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
      firebase.initializeApp(firebaseConfig);

      // Get a reference to the database service
      const database = firebase.database();

      // Get a reference to the users collection
      const usersRef = database.ref('users');

      // Listen for changes to the data
      usersRef.on('value', (snapshot) => {
        const users = snapshot.val();
        // clear any previous data displayed
        document.getElementById('user-list').innerHTML = '';
        // loop through the users and display them
        for (let userId in users) {
          const userData = users[userId];
          const userElement = document.createElement('div');
          userElement.innerHTML = `<p>${userData.name}, ${userData.email}</p>`;
          document.getElementById('user-list').appendChild(userElement);
        }
      });