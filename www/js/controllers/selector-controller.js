'use strict';

smartApp.controller('SelectorCtrl', function($scope, $q, $stateParams, $ionicLoading, $state, $window,$location, $ionicPopup, fbDataFactory, RecipeFactory, UserFactory) {
    

  $scope.show = function() {
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner>'
    });
    };

     $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.show($ionicLoading)
    
    let RecipeId = $stateParams.recipeId;
    console.log("RecipeId",RecipeId );
   let responseArr = [];
   let listIdArr = [];
   fbDataFactory.getAllUserLists()
   .then( (listData) => {
    $scope.lists = Object.values(listData.data); //<----get all lists for a user
    $scope.hide($ionicLoading);
   });

   $scope.update = (item) => {
      $scope.selectedList = item.selected;
   };
   let selectedItemArr = [];

   $scope.getSelectedItems = (item) => {
    if(selectedItemArr.indexOf(item.name) == -1)
        selectedItemArr.push(item.name);
    else {
        let index = selectedItemArr.indexOf(item.name);
        selectedItemArr.splice(index, 1);
    }
   };

   $scope.addToShoppingList = () => {
     if($scope.selectedList == ( "" || null || undefined))
     {
        var alertPopup = $ionicPopup.alert({
        title: 'You have not selected a list',
        template: 'Please select a list you would like to add items to'
        });
        alertPopup.then(function(res) {
         console.log('They better select a list');
        });
     }
     else 
     {

      let arr = selectedItemArr.map( (item, i) => {
        let tempObj = {
          item_name: item,
          list_id : $scope.selectedList.list_id
        }; 
        fbDataFactory.addItemToFB(tempObj)
        .then( (dataItem) => {
          let url = ($window.location.href).split("/");
          url.pop();
          url.pop();
          url = url.join('/');
          // console.log("$window.location.href", $window.location.href);
         console.log("url", url);
         $window.location.href = `${url}shopping-list/${$scope.selectedList.list_id}`;
        $window.location.reload();
        });
      });
     }
   };

    RecipeFactory.getSingleRecipeById(RecipeId)
    .then( (dataRecipe) => {
        $scope.items = dataRecipe.data.extendedIngredients;
      });

    // $scope.closePopup = () => {
    //   $ionicPopup.close();
    // }


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
    if(res != (null || "" || undefined))
    {
      $scope.show($ionicLoading)

      let currentUser = null;
      let listObj = {};
      UserFactory.isAuthenticated()
      .then( (user) => {
      currentUser = UserFactory.getUser(); 
      console.log("currentUser", currentUser);
       listObj = {
          listName: res,
          uid : currentUser
      };


          console.log("listObj", listObj);
          fbDataFactory.addNewListToFB(listObj)
          .then( (data) => {
              $window.location.reload();
            $scope.hide($ionicLoading)

          })
          .catch( (err) => {
              console.log("err",err );
          });
      });
      
    }
  });
};
});