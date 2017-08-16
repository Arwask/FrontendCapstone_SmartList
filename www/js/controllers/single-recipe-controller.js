'use strict';

smartApp.controller('SingleRecipeCtrl', function($scope, $stateParams, RecipeFactory, fbDataFactory, UserFactory) {
    console.log("stateParams", $stateParams.recipeId);

    let Recipeid = $stateParams.recipeId;
    RecipeFactory.getSingleRecipeById(Recipeid)
    .then( (recievedData) => {
        // console.log("recievedData",recievedData.data );
        $scope.recipes = recievedData.data;
        console.log("$scope.recipes",$scope.recipes);
    })
    .catch( (err) => {
        console.log("err",err );
    });

    $scope.saveRecipe = () => {
        console.log("clicked save");
        UserFactory.isAuthenticated()
        .then( (user) => {
            let currentUser = UserFactory.getUser();   
            console.log("currentUser??",currentUser );
            let recipeObj = {
                uid: currentUser,
                recipe_id: Recipeid
                };
            fbDataFactory.addRecipeToFirebase(recipeObj)
            .then( (data) => {
                console.log("data", data);
            });
        });
    };
});