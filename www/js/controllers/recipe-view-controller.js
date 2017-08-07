smartApp.controller('RecipeViewCtrl', function($scope, $window,$q, RecipeFactory) {

    RecipeFactory.get10Recipes()
    .then( (recievedRecipes) => {
        console.log("recipes recieved:", recievedRecipes.data);
        console.log("recipes recieved:", recievedRecipes.data.recipes[0].title);
        $scope.recipes = recievedRecipes.data.recipes;
    })
    .catch( (err) => {
        console.log("Error",err );
    })

    $scope.searchText = "";
    console.log("$scope.search", $scope.search);
    let recipeIdArray = [];
    $scope.searchedRecipe = (event) => {
        if(event.keyCode === 13)
        {
            console.log("$scope.search", $scope.searchText);
            RecipeFactory.searchedRecipes($scope.searchText)
            .then( (searchedData) => {
                console.log("searchedData", searchedData.data);
                searchedData.data.forEach( (recipe) => {
                    recipeIdArray.push(recipe.id);
                    console.log("recipeIdArray",recipeIdArray);
                })
                RecipeFactory.getRecipeById(recipeIdArray)  
                .then( (Recipedata) => {
                    console.log("data", Recipedata);
                $scope.recipes = RecipeData.data;
                })

            })
            .catch( (err) => {
                console.log("err",err );
            });
            $scope.searchText = "";
        }
        else
            $scope.searchText += event.key;
    }

});