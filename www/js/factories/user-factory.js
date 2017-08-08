smartApp.factory('UserFactory', function($http, $q, FBCreds) {
    

    var config = {
        apiKey: FBCreds.apiKey,
        authDomain: FBCreds.authDomain
    };
    let currentUser = "";
    firebase.initializeApp(config);

    let createUser = (userObj) => {
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .catch( (err) => {
            console.log("Error creating User", err.message);
        });
    };

    let loginUser = (userObj) => {
    return $q( (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
      .then( (user) => {
        currentUser = user.uid;
        console.log("currentUser",currentUser );
        resolve(user);
      })
      .catch( (err) => {
        console.log("error loggin in", err.message);
      });
    });
  };

  let isAuthenticated = () => {
    return $q( (resolve, reject) => {
      firebase.auth().onAuthStateChanged( (user) => {
        if(user) {
          currentUser = user.uid;
          resolve(true);
        }
        else { //on logout we need to set it back to null.
          currentUser = null;
          resolve(false);
        }
      });
    });
  };

  let getUser = () => {
    return currentUser;
  }
    return {createUser, loginUser, getUser, isAuthenticated};
})