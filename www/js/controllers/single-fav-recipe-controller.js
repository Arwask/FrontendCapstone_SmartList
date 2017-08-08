smartApp.controller('SingleFavRecipeCtrl', function($scope, $stateParams, fbDataFactory, RecipeFactory) {
    
    let currentRecipeId = $stateParams.recipeId;
    console.log("currentRecipeId", currentRecipeId);
    

    $scope.deleteRecipe = () => {
        fbDataFactory.deleteRecipeFromFB(currentRecipeId)
        // .then( (response) => {
        //     console.log("response check?", response);
        // })
        // .catch( (err) => {
        //     console.log("err", err);
        // })
    };

    RecipeFactory.getSingleRecipeById(currentRecipeId)
    .then( (recievedData) => {
        console.log("recievedData",recievedData.data );
        $scope.recipes = recievedData.data;
        // console.log("$scope.recipes",$scope.recipes.title);
    })
    .catch( (err) => {
        console.log("err",err );
    });
});