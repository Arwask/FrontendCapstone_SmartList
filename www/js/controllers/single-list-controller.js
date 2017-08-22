'use strict';

smartApp.controller('SingleListCtrl', function($scope, $stateParams,$ionicPopup, $ionicLoading, $ionicListDelegate, $window, fbDataFactory) {

    let listId = $stateParams.shoppingListId;
    fbDataFactory.getAllListItems(listId) //<---- get all items for this
    .then( (allItems) => {
        $scope.items = Object.values(allItems);
    })
    .catch( (err) => {
        console.log("err", err);
    });

    fbDataFactory.getListName(listId)
    .then( (singleRecievedList) => {
      $scope.NavTitle = singleRecievedList.data.listName; // <--- nav title for this page.
    });

    $scope.data = {
    showDelete: false
    };
  
  $scope.editItemPopup = function(item) {  //<---- edit popup
    $scope.data = item;
    var editPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.item_name" autofocus>',
        title: 'Edit the Item Name',
        scope: $scope,
        buttons: [
          { text: 'Cancel' ,
            onTap: $ionicListDelegate.closeOptionButtons()
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.item_name) {
                e.preventDefault();
              } 
              else 
                return $scope.data;
                $ionicListDelegate.closeOptionButtons();
            }
          }
        ]
    });
    editPopup.then( (editedItem) => {
        fbDataFactory.EditItemInFB(editedItem)
        .then( (recievedData) => {
        });
    });
};

$scope.addNewItemPopup = () => { // <---- add new item popup
    $scope.data = {};
    var addPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.newItem" autofocus>',
        title: 'Add New Item',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.newItem) {
                e.preventDefault();
              } 
              else 
                return $scope.data.newItem;
            }
          }
        ]
    });
    addPopup.then( (newItem) => {
      if(newItem != (null || "" || undefined))
      {
       let itemObj = {
          item_name: newItem,
          list_id : listId
        };
          console.log("itemObj", itemObj);
          fbDataFactory.addNewItemToFB(itemObj)
          .then( (data) => {
              $window.location.reload();
              // $scope.hide($ionicLoading)
          })
          .catch( (err) => {
              console.log("err",err );
          });
        }
      });
};

  $scope.moveItem = function(item, fromIndex, toIndex) {   //<---- rearrange items
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  

  //delete one item
  $scope.onItemDelete = function(item) { //<--- delete one selected item
    $scope.items.splice($scope.items.indexOf(item), 1);
    fbDataFactory.deleteOneItemFromFB(item.item_id)
    .then( (data) => {
    });
  };

});