'use strict';

smartApp.controller('ShoppingListCtrl', function($scope,$ionicPopup,$window,  fbDataFactory, UserFactory) {
    

    // $scope.scanBarcode = function() {

    //     console.log("click click");
    //     $cordovaBarcodeScanner.scan()
    //     .then( (imageData) => {
    //         alert(imageData.text);
    //     })
    //     .catch( (err) => {
    //         console.log("Error", err);
    //     });
    // };

    fbDataFactory.getAllUserLists().
    then( (listData) => {
        $scope.lists = Object.values(listData.data);
        console.log("listData", $scope.lists);
    })
    .catch( (err) => {
        console.log("err", err);
    });

        $scope.data = {
    showDelete: false
    };
  
$scope.showEditPopup = function(list) {
    $scope.data = list;
    var editPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.listName">',
        title: 'Edit the List Name',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.listName) {
                //don't allow the user to close unless he enters data
                e.preventDefault();
              } 
              else 
                return $scope.data;
            }
          }
        ]
    });

    editPopup.then( (editedList) => {
        fbDataFactory.EditListInFB(editedList)
        .then( (recievedData) => {
            console.log("recievedData", recievedData);
        });
    });
};



$scope.onItemDelete = function(list) {
    $scope.lists.splice($scope.lists.indexOf(list), 1);
    fbDataFactory.deleteOneListFromFB(list.list_id)
    .then( (data) => {
        console.log("data", data);
    });
};
 
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
          } 
          else 
            return $scope.data.newList;
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
    };
        fbDataFactory.addNewListToFB(listObj)
        .then( (data) => {
            $window.location.reload();

        })
        .catch( (err) => {
            console.log("err",err );
        });
    });
  }); 
  };
});