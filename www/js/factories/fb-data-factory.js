'use strict';

smartApp.factory('fbDataFactory', function($q, $http, FirebaseUrl, UserFactory) {
  // adds recipes to firebase when passed a recipe object containing current user's ID
  let addRecipeToFirebase = recipeObj => {
    return $q((resolve, reject) => {
      $http
        .post(`${FirebaseUrl}recipes.json`, angular.toJson(recipeObj))
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  //Gets all recipes by CurrentUser
  let getUserRecipes = currentUser => {
    return $q((resolve, reject) => {
      $http
        .get(`${FirebaseUrl}recipes.json?orderBy="uid"&equalTo="${currentUser}"`)
        .then(response => {
          for (let key in response.data) {
            response.data[key].fbKey = key;
          }
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  //get the fbkey of the selected user's recipe's key.
  let getUserRecipeKey = currentRecipeId => {
    return $q((resolve, reject) => {
      UserFactory.isAuthenticated()
        .then(user => {
          let currentUser = UserFactory.getUser();
          getUserRecipes(currentUser).then(userRecipes => {
            for (let key in userRecipes.data) {
              if (userRecipes.data[key].recipe_id == currentRecipeId) {
                resolve(key);
              }
            }
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  //gets the firebase key of the recipe to delete
  let keyOfRecipeToDelete;
  let deleteRecipeFromFB = currentRecipeId => {
    return $q((resolve, reject) => {
      keyOfRecipeToDelete = getUserRecipeKey(currentRecipeId)
        .then(keyOfRecipeToDelete => {
          return $http.delete(`${FirebaseUrl}recipes/${keyOfRecipeToDelete}.json`);
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  //get userlists which calls a function
  let getAllUserLists = () => {
    return $q((resolve, reject) => {
      UserFactory.isAuthenticated().then(user => {
        let currentUser = UserFactory.getUser();
        getLists(currentUser).then(allLists => {
          resolve(allLists);
        });
      });
    });
  };

  // get a user's all lists
  let getLists = currentUser => {
    return $q((resolve, reject) => {
      $http.get(`${FirebaseUrl}list.json?orderBy="uid"&equalTo="${currentUser}"`).then(response => {
        for (let key in response.data) response.data[key].list_id = key;
        resolve(response);
      });
    });
  };

  // Add new list to FB
  let addNewListToFB = listObj => {
    return $q((resolve, reject) => {
      $http
        .post(`${FirebaseUrl}list.json`, angular.toJson(listObj))
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  let getAllListItems = listId => {
    return $q((resolve, reject) => {
      $http.get(`${FirebaseUrl}items.json?orderBy="list_id"&equalTo="${listId}"`).then(response => {
        for (let key in response.data) {
          response.data[key].item_id = key; //save fb key to the retrieved obj
        }
        resolve(response.data);
      });
    });
  };

  let addItemToFB = itemObj => {
    return $q((resolve, reject) => {
      $http
        .post(`${FirebaseUrl}items.json`, angular.toJson(itemObj))
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  let deleteOneItemFromFB = itemId => {
    return $q((resolve, reject) => {
      $http
        .delete(`${FirebaseUrl}items/${itemId}.json`)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  let deleteOneListFromFB = listId => {
    return $q((resolve, reject) => {
      $http
        .delete(`${FirebaseUrl}list/${listId}.json`)
        .then(response => {
          deleteAllItemsOfAList(listId) //deletes all item with this list_id
            .then(someData => {
              resolve('Deleted');
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // Deletes all items on the list that is being deleted
  let deleteAllItemsOfAList = listId => {
    return $q((resolve, reject) => {
      $http
        .get(`${FirebaseUrl}items.json?orderBy="list_id"&equalTo="${listId}"`)
        .then(response => {
          Object.keys(response.data).forEach(item => {
            deleteOneItemFromFB(item).then(uselessData => {
              resolve('Deleted!');
            });
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  //Editing name of the list in firebase
  let EditListInFB = listObj => {
    return $q((resolve, reject) => {
      let listId = listObj.list_id;
      $http
        .put(`${FirebaseUrl}list/${listId}.json`, angular.toJson(listObj))
        .then(updatedList => {
          resolve(updatedList.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // Edit single item on the particular list in firebase
  let EditItemInFB = itemObj => {
    return $q((resolve, reject) => {
      let itemId = itemObj.item_id;
      $http
        .put(`${FirebaseUrl}items/${itemId}.json`, angular.toJson(itemObj))
        .then(updatedItem => {
          resolve(updatedItem.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  //Add new Item to Firebase
  let addNewItemToFB = itemObj => {
    return $q((resolve, reject) => {
      $http
        .post(`${FirebaseUrl}items.json`, angular.toJson(itemObj))
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  //Get the name of the list using its ID
  let getListName = listId => {
    return $q((resolve, reject) => {
      $http
        .get(`${FirebaseUrl}list/${listId}.json`)
        .then(singleList => {
          resolve(singleList);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  //Get the API credentials of the Recipe-API from Firebase to keep it secured(Spoonacular.com)
  let getRecipeCreds = () => {
    return $q((resolve, reject) => {
      $http
        .get(`${FirebaseUrl}api-creds.json`)
        .then(apiKey => {
          resolve(apiKey);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return {
    getRecipeCreds,
    addRecipeToFirebase,
    getUserRecipes,
    deleteRecipeFromFB,
    getAllUserLists,
    addNewListToFB,
    getAllListItems,
    addItemToFB,
    deleteOneItemFromFB,
    deleteOneListFromFB,
    EditListInFB,
    EditItemInFB,
    addNewItemToFB,
    getListName
  };
});
