smartApp.factory('fbDataFactory', function($q, $http, FirebaseUrl) {

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

    let getUserRecipes = (currentUser) => {
        return $q( (resolve, reject) => {
            $http.get(`${FirebaseUrl}recipes.json?orderBy="uid"&equalTo="${currentUser}"`)
            .then( (response) => {
                console.log("response", response.data);
                resolve(response);
            })
            .catch( (err) => {
                reject(err);
            });
        })
    }

return { addRecipeToFirebase, getUserRecipes};

});