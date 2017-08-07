smartApp.factory('DataFactory', function($q, $http, APICreds) {

    function get10Recipes() {
    return $q( (resolve, reject) => {
        var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=2&query=chicken",
  "method": "GET",
  
}
        $http({
            method:"GET",
            url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=5&tags=vegetarian%2Cdessert`,
            headers: {
                "x-mashape-key": "YVT7SsuTkdmshZQEWbr9NK74ZAEOp150cmVjsn5NAjYZHpg4vc",
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
            
        })
    }

return { get10Recipes };
});
