smartApp.controller('RecipeBookCtrl', function($scope, RecipeFactory, fbDataFactory, UserFactory, RecipeFactory) {

    UserFactory.isAuthenticated()
    .then( (user) => {
        let currentUser = UserFactory.getUser();   
        console.log("currentUser??",currentUser );
        fbDataFactory.getUserRecipes(currentUser)
        .then( (userData) => {
            // console.log("userData here yet??", userData.data);
            // $scope.recipes = userData.data;
            let userRecipes = userData.data;
            let idArray = [];
            // call the api using user's recipe_id and give that data to scope
            for(let key in userRecipes) {
                idArray.push(userRecipes[key].recipe_id);
            };
            console.log("idArray", idArray);
            RecipeFactory.getRecipeById(idArray)
            .then( (recievedData) => {
                console.log("recieved fav recipe Data?", recievedData);
                $scope.recipes = recievedData;
            })
            .catch( (err) => {
                console.log("err",err );
            })
        })
         })   
});