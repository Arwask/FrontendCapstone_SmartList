smartApp.controller('RecipeViewCtrl', function($scope, $window, DataFactory) {

    DataFactory.get10Recipes()
    .then( (recievedRecipes) => {
        console.log("recipes recieved:", recievedRecipes.data);
        console.log("recipes recieved:", recievedRecipes.data.recipes[0].title);
        $scope.recipes = recievedRecipes.data.recipes;
    })
    .catch( (err) => {
        console.log("Error",err );
    })

});