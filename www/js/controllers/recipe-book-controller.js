'use strict';

smartApp.controller('RecipeBookCtrl', function(
  $scope,
  $state,
  $window,
  $ionicLoading,
  fbDataFactory,
  UserFactory,
  RecipeFactory
) {
  $scope.NavTitle = 'Recipe Book';
  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };

  $scope.show();
  // get user's recipe using current active user
  UserFactory.isAuthenticated().then(user => {
    let currentUser = UserFactory.getUser();
    fbDataFactory.getUserRecipes(currentUser).then(userData => {
      let userRecipes = userData.data;
      let idArray = [];
      for (let key in userRecipes) {
        idArray.push(userRecipes[key].recipe_id);
      }

      RecipeFactory.getRecipeById(idArray)
        .then(recievedData => {
          $scope.hide();
          $scope.recipes = recievedData;
          $state.reload();
        })
        .catch(err => {
          reject(err);
        });
    });
  });
});
