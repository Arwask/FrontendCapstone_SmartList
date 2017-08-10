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
      return $q( (resolve, reject) => {
       keyOfRecipeToDelete = getUserRecipeKey(currentRecipeId)
       .then( (keyOfRecipeToDelete) => {
               return $http.delete(`${FirebaseUrl}recipes/${keyOfRecipeToDelete}.json`)
        })
        .then( (response) => {
            console.log("response????", response);
            resolve(response.data);
        })
        .catch( (err) => {
            reject(err);
        });
       // console.log("keyOfRecipeToDelete",keyOfRecipeToDelete );
       })
    }
    
    //get userlists which calls a function
    let getAllUserLists = () => {
        return $q( (resolve, reject) => {
            UserFactory.isAuthenticated()
            .then( (user) => {
                let currentUser = UserFactory.getUser(); 
                // console.log("currentUser", currentUser);
                 getLists(currentUser).
                 then( (allLists) => {
                    // console.log("allLists", allLists);
                    resolve(allLists);
                 })
            });
        });
    }

    // get a user's all lists
    let getLists = (currentUser) => {
        return $q( (resolve, reject) => {
            // console.log("currentUser", `${FirebaseUrl}list.json?orderBy="uid"&equalTo="${currentUser}"`);
            $http.get(`${FirebaseUrl}list.json?orderBy="uid"&equalTo="${currentUser}"`)
            .then( (response) => {
                for(let key in response.data)
                    response.data[key].list_id = key;
                // console.log("listData", response.data);
                resolve(response);
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

    let getAllListItems = (listId) => {
            return $q( (resolve,reject) => {
                $http.get(`${FirebaseUrl}items.json?orderBy="list_id"&equalTo="${listId}"`)
                .then( (response) => {
                    for(let key in response.data) {
                        response.data[key].item_id = key; //save fb key to the retrieved obj
                    }                       
                        resolve(response.data);
                })
            })
    }

    let addItemToFB = (itemObj) => {
        return $q( (resolve, reject) => {
            $http.post(`${FirebaseUrl}items.json`,
                angular.toJson(itemObj))
            .then( (response) => {
                resolve(response);
            })
            .catch( (err) => {
                reject(err);
            });
        })
    }

    let deleteOneItemFromFB = (itemId) => {
        return $q( (resolve, reject) => {
           $http.delete(`${FirebaseUrl}items/${itemId}.json`)
            .then( (response) => {
                resolve(response);
            })
            .catch( (err) => {
                reject(err);
            });
        })
    }

    let deleteOneListFromFB = (listId) => {
        return $q( (resolve, reject) => {
           $http.delete(`${FirebaseUrl}list/${listId}.json`)
            .then( (response) => {
                console.log("deleted???", response);
                deleteAllItemsOfAList(listId) //deletes all item with this list_id
                .then( (someData) => {
                    console.log("someData", someData);
                    // resolve(someData);
                })
            })
            .catch( (err) => {
                reject(err);
            });
        });
    }

    let deleteAllItemsOfAList = (listId) => {
     return $q( (resolve, reject) => {   
        $http.get(`${FirebaseUrl}items.json?orderBy="list_id"&equalTo="${listId}"`)
        .then( (response) => {
            Object.keys(response.data).forEach( (item) => {
                deleteOneItemFromFB(item).
                then( (uselessData) => {
                    console.log("uselessData", uselessData);
                })
            })
        })
        .catch( (e) => {
            console.log("error", e);
        });
    });
    }
return { 
    addRecipeToFirebase, 
    getUserRecipes, 
    deleteRecipeFromFB, 
    getAllUserLists, 
    addNewListToFB, 
    getAllListItems,
    addItemToFB,
    deleteOneItemFromFB,
    deleteOneListFromFB
    };

});