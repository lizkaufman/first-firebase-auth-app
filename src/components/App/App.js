import React, { useState } from 'react';
import './App.css';
import firebase from '../../firebase';

//our test users:
// const sampleUser = { email: 'tonythecat@tony.com', password: 'wetfood' };
//const secondUser = { email: 'pigeon@neighborsroof.com', password: 'ihatetony' };

//can look in application tab of dev tools and find the global authentication object in Firebase's localStorage once a user is logged in

//TODO: Move firebase functions over to firebase.js and then import them here for neatness!
//TODO: Move firebase config credentials to REACT_APP_XYZ environment variables in a .env folder (that way, we don't have to .gitignore firebase.js)

function App() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  //add a state for the logged in user! This way it'll trigger a re-render and store the user object in here.
  const [loggedInUser, setLoggedInUser] = useState(null);

  //This is the observer that watches out for change of auth state (i.e. a login):
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //var displayName = user.displayName;
      var email = user.email;
      //var emailVerified = user.emailVerified;
      //var photoURL = user.photoURL;
      //var isAnonymous = user.isAnonymous;
      //var uid = user.uid;
      //var providerData = user.providerData;
      console.log(`${email} is logged in`);
    } else {
      // User is signed out.
      console.log('no user signed in');
    }
    setLoggedInUser(user);
    console.log(user);
  });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormState({ ...formState, [name]: value });
  }

  function handleSignup() {
    const email = formState.email;
    const password = formState.password;
    console.log({ email, password });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        console.error(error);
      });
    setFormState({ email: '', password: '' });
    console.log(`new user signed up with email ${email}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const email = formState.email;
    const password = formState.password;
    console.log({ email, password });
    // if (!loggedInUser) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    setFormState({ email: '', password: '' });
    console.log('login finished');
  }

  function handleSignout() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log('user logged out');
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  console.log(loggedInUser);

  //Sign in with google:
  function handleSignInWithPopup() {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.error(error);
      });
  }

  return (
    <div className="App">
      <p>Log in (or register) here:</p>
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={formState.email}
        />
        <br />
        <label>Password: </label>
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={formState.password}
        />
        <br />
        <input type="submit" />
      </form>
      <button onClick={handleSignInWithPopup}>
        Sign in with your Google account
      </button>
      <br />
      <button onClick={handleSignup}>Sign up as new user</button>
      {loggedInUser && (
        <p>This is the secret message for {loggedInUser.email}!</p>
      )}
      <button onClick={handleSignout}>Sign out</button>
    </div>
  );
}

export default App;
