smartApp.controller('SingleRecipeCtrl', function($scope, $stateParams) {
    console.log("stateParams", $stateParams.recipeId);

    $scope.id = $stateParams.recipeId;
});