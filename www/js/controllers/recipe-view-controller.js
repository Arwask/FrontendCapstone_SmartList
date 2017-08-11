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

    // $scope.searchText = "";
    // console.log("$scope.search", $scope.searchText);
    let recipeIdArray = [];

    $scope.searchedRecipe = (searchText) => {
            console.log("$scope.search", searchText);
            RecipeFactory.searchedRecipes(searchText)
            .then( (searchedData) => {
                console.log("searchedData", searchedData.data);
                searchedData.data.forEach( (recipe) => {
                    recipeIdArray.push(recipe.id);
                    console.log("recipeIdArray",recipeIdArray);
                })
                RecipeFactory.getRecipeById(recipeIdArray)  
                .then( (Recipedata) => {
                    console.log("data", Recipedata);
                $scope.recipes = Recipedata;
                })

            })
            .catch( (err) => {
                console.log("err",err );
            });
    }

});