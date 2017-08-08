smartApp.factory('fbDataFactory', function($q, $http, FirebaseUrl, UserFactory) {

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
                for(let key in response.data)
                {
                    response.data[key].fbKey = key;
                }
                
                console.log("response", response.data);
                resolve(response);
            })
            .catch( (err) => {
                reject(err);
            });
        })
    }

    

    let getUserRecipeKey = (currentRecipeId) => {
        return $q( (resolve, reject) => {
            UserFactory.isAuthenticated()
            .then( (user) => {
                let currentUser = UserFactory.getUser();   
                getUserRecipes(currentUser)
                .then( (userRecipes) => {
                    console.log("userRecipes check!", userRecipes.data);
                    for(let key in userRecipes.data) {
                        if(userRecipes.data[key].recipe_id == currentRecipeId) {
                            console.log("key", key);
                            resolve(key);
                            // return key;
                        }
                    }
                })
            }) 
            .catch( (err) => {
                console.log("err", err);
            });  
            
        })
    }
    let keyOfRecipeToDelete;
    let deleteRecipeFromFB = (currentRecipeId) => {
       keyOfRecipeToDelete = getUserRecipeKey(currentRecipeId)
       .then( (keyOfRecipeToDelete) => {
           return $q( (resolve, reject) => {
                $http.delete(`${FirebaseUrl}recipes/${keyOfRecipeToDelete}.json`)
                .then( (response) => {
                    resolve(response);
                })
                .catch( (err) => {
                    reject(err);
                });
            })
       // console.log("keyOfRecipeToDelete",keyOfRecipeToDelete );
        
       })
    }

return { addRecipeToFirebase, getUserRecipes, deleteRecipeFromFB};

});