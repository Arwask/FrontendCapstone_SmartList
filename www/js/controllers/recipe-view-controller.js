'use strict';

smartApp.controller('RecipeViewCtrl', function($scope, $window,$q,$ionicLoading, RecipeFactory) {

    $scope.show = function() {
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner>'
    });
    };

     $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.show($ionicLoading)
    RecipeFactory.get10Recipes()
    .then( (recievedRecipes) => {
        $scope.recipes = recievedRecipes.data.recipes;
        $scope.hide($ionicLoading);
    })
    .catch( (err) => {
        console.log("Error",err );
    })
    // .finally( ($ionicLoading) => {
    // })

    $scope.loadMore = () => {
        RecipeFactory.get10Recipes()
        .then( (recievedRecipes) => {
        $scope.recipes.push(recievedRecipes.data.recipes);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    })
    .catch( (err) => {
        console.log("Error",err );
    })
    };

    $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
    });

    let recipeIdArray = [];

    $scope.searchedRecipe = (searchText) => {
        $scope.show($ionicLoading); 
        RecipeFactory.searchedRecipes(searchText)
        .then( (searchedData) => {
            searchedData.data.forEach( (recipe) => {
                recipeIdArray.push(recipe.id);
            });
            RecipeFactory.getRecipeById(recipeIdArray)  
            .then( (Recipedata) => {
                $scope.recipes = Recipedata;
                $scope.hide($ionicLoading);
            });
        })
        .catch( (err) => {
            console.log("err",err );
        });
    };

});