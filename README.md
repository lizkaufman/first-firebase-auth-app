# First Firebase Project: Login Page

### Dependencies:

- npm i to install the dependencies
- Includes Firebase (npm i firebase if you need to install it separately)

### To run:

- Add the config details for your own Firebase app (from the Firebase site) in a firebase.js file in src level and export it (the App has a line that will import it):

import firebase from 'firebase';
const firebaseConfig = {
//copy and paste from app section w/in project on Firebase website
};
firebase.initializeApp(firebaseConfig);
export default firebase;

- For now, run via npm start for the test build
- Option to add hosting via Firebase (or elsewhere) in future
