'use strict';

smartApp.controller('RecipeViewCtrl', function($scope, $window, $q, $ionicLoading, RecipeFactory) {
  $scope.NavTitle = 'Browse Recipes';

  // The loading spinner
  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };

  $scope.show($ionicLoading);
  RecipeFactory.get10Recipes()
    .then(recievedRecipes => {
      $scope.recipes = recievedRecipes.data.recipes;
      $scope.hide($ionicLoading); // Hide the loading spinner once the data is back from the API call
    })
    .catch(err => {
      reject(err);
    });

  let recipeIdArray = [];

  // Get the keyword typed by user and making an API call to to get recipes using searchedRecipes() function

  $scope.searchedRecipe = searchText => {
    RecipeFactory.searchedRecipes(searchText)
      .then(searchedData => {
        searchedData.data.forEach(recipe => {
          recipeIdArray.push(recipe.id);
        });
        RecipeFactory.getRecipeById(recipeIdArray).then(Recipedata => {
          $scope.recipes = Recipedata;
          $scope.hide($ionicLoading);
        });
      })
      .catch(err => {
        reject(err);
      });
  };
});
