smartApp.factory('fbDataFactory', function($q, $http, FBCreds, FirebaseUrl) {

    let addRecipeToFirebase = (recipeObj) => {
        return $q( (resolve, reject) => {
            $http.post(`${FirebaseUrl}recipes.json`,
                angular.toJson(recipeObj))
            .then( (response) => {
                resolve(response);
            })
            .catch( (err) => {
                reject(err);
            });
        })
    }

return { addRecipeToFirebase};

});