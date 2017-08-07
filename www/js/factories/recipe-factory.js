smartApp.factory('RecipeFactory', function($q, $http, RecipeCreds) {

        // let myRequest = new XMLHttpRequest();
    function get10Recipes() {
    return $q( (resolve, reject) => {
        // ----working API call-----
        // $http({                          
        //     method:"GET",
        //     url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=5&tags=vegetarian%2Cdessert`,
        //     headers: {
        //         "x-mashape-key": RecipeCreds.apiKey,
        //         "cache-control": "no-cache"
        //       }
        // }).
        // then( (AllData) => {
        //     console.log("data", AllData );
        //     resolve(AllData);
        // })
        // .catch( (err) => {
        //     console.log("Error:",err );
        // }); 
    });
}
    let searchedRecipes = (searchstring) => {
        return $q( (resolve, reject) => {
            $http({
                method:"GET",
                url: ` https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=10&query=${searchstring}`,
                headers: {
                    "x-mashape-key": RecipeCreds.apiKey,
                    "cache-control": "no-cache"
                  }
            })
            .then( (searchedData) => {
                console.log("searchedData",searchedData );
            })
        })
    }
return { get10Recipes, searchedRecipes };
});
