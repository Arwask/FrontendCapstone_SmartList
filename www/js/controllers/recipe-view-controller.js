smartApp.controller('RecipeViewCtrl', function($scope, $window, RecipeFactory) {

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

    $scope.searchedRecipe = (event) => {
        if(event.keyCode === 13)
        {
            console.log("$scope.search", $scope.searchText);
            RecipeFactory.searchedRecipes($scope.searchText)
            .then( (searchedData) => {
                console.log("searchedData", searchedData);
                $scope.recipes = searchedData.data.recipes;
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