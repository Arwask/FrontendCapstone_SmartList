smartApp.factory('UserFactory', function($http, $q, FBCreds) {
    

    var config = {
        apiKey: FBCreds.apiKey,
        authDomain: FBCreds.authDomain
    };

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

    return {createUser, loginUser};
})