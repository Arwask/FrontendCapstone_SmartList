smartApp.factory('RecipeFactory', function($q, $http, RecipeCreds) {

        // let myRequest = new XMLHttpRequest();
    function get10Recipes() {
    return $q( (resolve, reject) => {
        // ----working API call-----
        $http({                          
            method:"GET",
            url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=5&tags=vegetarian%2Cdessert`,
            headers: {
                "x-mashape-key": RecipeCreds.apiKey,
                "cache-control": "no-cache"
              }
        }).
        then( (AllData) => {
            console.log("data", AllData );
            resolve(AllData);
        })
        .catch( (err) => {
            console.log("Error:",err );
        }); 
    });
}
    let searchedRecipes = (searchstring) => {
        return $q( (resolve, reject) => {
            // working
            $http({
                method:"GET",
                url: ` https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=2&query=${searchstring}`,
                headers: {
                    "x-mashape-key": RecipeCreds.apiKey,
                    "cache-control": "no-cache"
                  }
            })
            .then( (searchedData) => {
                console.log("searchedData",searchedData );
                resolve(searchedData);

            })
        })
    }

    let getRecipeById = (idArray) => {
        let recipePromises = [];
        return $q( (resolve, reject) => {
            // working
            for(i=0;i<idArray.length;i++)
            {
                console.log("idArray", idArray[i]);
                $http({
                method:"GET",
                url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${idArray[i]}/information?`,
                headers: {
                    "x-mashape-key": RecipeCreds.apiKey,
                    "cache-control": "no-cache"
                  }
                })
            .then( (actualData) => {
                // console.log("searchedData",actualData );
                // resolve(actualData.data);
                recipePromises.push(actualData.data);
                resolve(recipePromises);
            })
            .catch( (err) => {
                console.log("err",err );
            });
        }
        })
    }


    let getSingleRecipeById = (recipeId) => {
        return $q( (resolve, reject) => {
                $http({
                method:"GET",
                url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/information?`,
                headers: {
                    "x-mashape-key": RecipeCreds.apiKey,
                    "cache-control": "no-cache"
                  }
                })
            .then( (actualData) => {
                // console.log("searchedData",actualData );
                // resolve(actualData.data);
                resolve(actualData);
            })
            .catch( (err) => {
                console.log("err",err );
            });
        })
    }

return { get10Recipes, searchedRecipes, getRecipeById, getSingleRecipeById };
});
