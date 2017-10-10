'use strict';

smartApp.factory('UserFactory', function($http, $q, FBCreds) {
  var config = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain
  };
  let currentUser = '';
  firebase.initializeApp(config);
  var provider = new firebase.auth.GoogleAuthProvider();

  // Create new user
  let createUser = userObj => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(userObj.email, userObj.password)
      .catch(err => {
        console.log('Error creating User', err.message);
      });
  };

  //Login the existng user
  let loginUser = userObj => {
    return $q((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(userObj.email, userObj.password)
        .then(user => {
          currentUser = user.uid; // global variable that can be accessed everywhere
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // Checks if user is authenticated when refreshing the page and keeps them logged in
  let isAuthenticated = () => {
    return $q((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          currentUser = user.uid;
          resolve(true);
        } else {
          //on logout we need to set it back to null.
          currentUser = null;
          resolve(false);
        }
      });
    });
  };

  let logUserWithGoogle = () => {
    return $q((resolve, reject) => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(data => {
          currentUser = data.user.uid;
          resolve(currentUser);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  let getUser = () => {
    return currentUser;
  };

  //Logging out the logged in user
  let logout = () => {
    return firebase
      .auth()
      .signOut()
      .catch(err => {
        console.log('Error logging out', err.message);
      });
  };

  return { createUser, loginUser, getUser, isAuthenticated, logUserWithGoogle, logout };
});
