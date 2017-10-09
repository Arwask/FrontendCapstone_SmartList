'use strict';

smartApp.factory('RecipeFactory', function($q, $http, fbDataFactory) {
  // The API creds are stored in firebase and the key is retrieved by making a request to firebase
  function RecipeCreds() {
    return $q((resolve, reject) => {
      fbDataFactory.getRecipeCreds().then(creds => {
        let key = Object.keys(creds.data);
        let apiKey = creds.data[key].apiKey;
        resolve(apiKey);
      });
    });
  }

  //On load of the page, it randomly loads 10 Recipes
  function get10Recipes() {
    return $q((resolve, reject) => {
      RecipeCreds().then(apiKey => {
        $http({
          method: 'GET',
          url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=10&tags=dessert`,
          headers: {
            'x-mashape-key': apiKey,
            'cache-control': 'no-cache'
          }
        })
          .then(AllData => {
            resolve(AllData);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  //the key word that user enters on the search bar, the call is made for 10 recipes with that keyword
  let searchedRecipes = searchstring => {
    return $q((resolve, reject) => {
      RecipeCreds().then(apiKey => {
        // working
        $http({
          method: 'GET',
          url: ` https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=10&query=${searchstring}`,
          headers: {
            'x-mashape-key': apiKey,
            'cache-control': 'no-cache'
          }
        }).then(searchedData => {
          resolve(searchedData);
        });
      });
    });
  };

  // loads all the recipe's information using its IDs
  let getRecipeById = idArray => {
    let recipePromises = [];
    return $q((resolve, reject) => {
      RecipeCreds().then(apiKey => {
        for (let i = 0; i < idArray.length; i++) {
          $http({
            method: 'GET',
            url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${idArray[i]}/information?`,
            headers: {
              'x-mashape-key': apiKey,
              'cache-control': 'no-cache'
            }
          })
            .then(actualData => {
              recipePromises.push(actualData.data);
              resolve(recipePromises);
            })
            .catch(err => {
              reject(err);
            });
        }
      });
    });
  };

  // getting a specific Recipe by its ID. used in single recipe view.
  let getSingleRecipeById = recipeId => {
    return $q((resolve, reject) => {
      RecipeCreds().then(apiKey => {
        $http({
          method: 'GET',
          url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/information?`,
          headers: {
            'x-mashape-key': apiKey
          }
        })
          .then(actualData => {
            resolve(actualData);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  };

  return { get10Recipes, searchedRecipes, getRecipeById, getSingleRecipeById };
});
