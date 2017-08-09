smartApp.controller('SelectorCtrl', function($scope, $q, $stateParams, fbDataFactory, RecipeFactory ) {
    
    let RecipeId = $stateParams.recipeId;
    console.log("RecipeId",RecipeId );
   let responseArr = [];
   let listIdArr = [];
   fbDataFactory.getAllUserLists()
   .then( (listData) => {
    $scope.lists = Object.values(listData.data); //<----get all lists for a user
    console.log("listData", $scope.lists);
    // for( let key in  $scope.lists)
    //     listIdArr.push($scope.lists[key].list_id)//<---- put all ids in an array
    // console.log("listIdArr", listIdArr)
   // return listIdArr;
   // $scope.selectedList = "";
   // console.log("$scope.selected", $scope.selectedList);
   })
   // .then( (listIdArr) => {
   //    listIdArr.forEach( (listId) => {
   //       fbDataFactory.getAllListItems(listId)// <---- get items for each list
   //      .then( (recievedItems) => {
   //          // console.log("recievedItems???", recievedItems.data);
   //          responseArr.push(recievedItems.data)
   //    console.log("recievedItems",  responseArr);  
   //         })
   //    })
   // })

   $scope.update = (item) => {
      // $scope.selectedListItem = $scope.selectedList;
      console.log("$scope.selectedList", item.list_id); 
   }
   let selectedItemArr = [];

   $scope.getSelectedItems = (item) => {
    if(item)
    selectedItemArr.push(item.name);
   }

   $scope.addToShoppingList = () => {
      
    console.log("selectedItemArr", selectedItemArr);
   }

    RecipeFactory.getSingleRecipeById(RecipeId)
    .then( (dataRecipe) => {
        $scope.items = dataRecipe.data.extendedIngredients;
      });
});