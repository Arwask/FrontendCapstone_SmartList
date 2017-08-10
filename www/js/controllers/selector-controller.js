smartApp.controller('SelectorCtrl', function($scope, $q, $stateParams, $window, $ionicPopup, fbDataFactory, RecipeFactory, UserFactory) {
    
    let RecipeId = $stateParams.recipeId;
    console.log("RecipeId",RecipeId );
   let responseArr = [];
   let listIdArr = [];
   fbDataFactory.getAllUserLists()
   .then( (listData) => {
    $scope.lists = Object.values(listData.data); //<----get all lists for a user
    console.log("listData", $scope.lists);
   });

   $scope.update = (item) => {
      // $scope.selectedListItem = $scope.selectedList;
      console.log("$scope.selectedList", item.list_id); 
      $scope.selectedList = item.list_id
   }
   let selectedItemArr = [];

   $scope.getSelectedItems = (item) => {
    if(item)
    selectedItemArr.push(item.name);
   }

   $scope.addToShoppingList = () => {
      
    let arr = selectedItemArr.map( (item, i) => {
      let tempObj = {
        item_name: item,
        list_id : $scope.selectedList
      }; 
      fbDataFactory.addItemToFB(tempObj)
      .then( (dataItem) => {
        console.log("data after adding item", dataItem.data);
      })
    })


   }

    RecipeFactory.getSingleRecipeById(RecipeId)
    .then( (dataRecipe) => {
        $scope.items = dataRecipe.data.extendedIngredients;
      });

  $scope.showPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.newList">',
    title: 'Enter New List Name',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.newList) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.newList;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    let currentUser = null;
    let listObj = {};
    UserFactory.isAuthenticated()
    .then( (user) => {
    currentUser = UserFactory.getUser(); 
    console.log("currentUser", currentUser);
     listObj = {
        listName: res,
        uid : currentUser
    }


        console.log("listObj", listObj);
        fbDataFactory.addNewListToFB(listObj)
        .then( (data) => {
            $window.location.reload();

        })
        .catch( (err) => {
            console.log("err",err );
        });
    })
  });
}
});