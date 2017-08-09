smartApp.factory('fbDataFactory', function($q, $http,FirebaseUrl, UserFactory) {

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

    
//get the fbkey of the selected user's recipe's key.
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
                    console.log("response????", response);
                    resolve(response.data);
                })
                .catch( (err) => {
                    reject(err);
                });
            })
       // console.log("keyOfRecipeToDelete",keyOfRecipeToDelete );
       })
    }
    
    //get userlists which calls a function
    let getAllUserLists = () => {
        return $q( (resolve, reject) => {
            UserFactory.isAuthenticated()
            .then( (user) => {
                let currentUser = UserFactory.getUser(); 
                 getLists(currentUser);
            });
        });
    }

    // get a user's all lists
    let getLists = (currentUser) => {
        return $q( (resolve, reject) => {
            $http.get(`${FirebaseUrl}list.json?orderBy="uid"&equalTo="${currentUser}"`)
            .then( (response) => {
                console.log("response", response);
            })
        })
    }

    // Add new list to FB
    let addNewListToFB = (listObj) => {
        return $q( (resolve, reject) => {
            $http.post(`${FirebaseUrl}list.json`,
                angular.toJson(listObj))
            .then( (response) => {
                resolve(response);
            })
            .catch( (err) => {
                reject(err);
            });
        })
    }
return { addRecipeToFirebase, getUserRecipes, deleteRecipeFromFB, getAllUserLists, addNewListToFB};

});