'use strict';

smartApp.controller('RecipeViewCtrl', function($scope, $window, $q, $ionicLoading, RecipeFactory) {
  $scope.NavTitle = 'Browse Recipes';

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
      console.log('reciecedRecipes', recievedRecipes);
      $scope.recipes = recievedRecipes.data.recipes;
      $scope.hide($ionicLoading);
    })
    .catch(err => {
      console.log('Error', err);
    });
  // .finally( ($ionicLoading) => {
  // })

  let recipeIdArray = [];

  $scope.searchedRecipe = searchText => {
    // $scope.show($ionicLoading);
    // console.log(searchText);
    RecipeFactory.searchedRecipes(searchText)
      .then(searchedData => {
        console.log('SearchedData', searchedData);
        searchedData.data.forEach(recipe => {
          recipeIdArray.push(recipe.id);
        });
        RecipeFactory.getRecipeById(recipeIdArray).then(Recipedata => {
          $scope.recipes = Recipedata;
          $scope.hide($ionicLoading);
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };
});
