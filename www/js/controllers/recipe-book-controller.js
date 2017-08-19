'use strict';

smartApp.controller('RecipeBookCtrl', function($scope, $state, $window, fbDataFactory, UserFactory, RecipeFactory) {

    $scope.NavTitle = "Recipe Book"

    UserFactory.isAuthenticated()
    .then( (user) => {
        let currentUser = UserFactory.getUser();   
        fbDataFactory.getUserRecipes(currentUser)
        .then( (userData) => {
            let userRecipes = userData.data;
            let idArray = [];
            for(let key in userRecipes) {
                idArray.push(userRecipes[key].recipe_id);
            }

            RecipeFactory.getRecipeById(idArray)
            .then( (recievedData) => {
                
                $scope.recipes = recievedData;
                $state.reload();
            })
            .catch( (err) => {
                console.log("err",err );
            });
        });
         });   
});