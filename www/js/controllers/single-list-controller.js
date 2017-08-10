smartApp.controller('SingleListCtrl', function($scope, $stateParams,$ionicPopup, $window, fbDataFactory) {
    
    let listId = $stateParams.shoppingListId;
    console.log("listId on single page view", listId);
    fbDataFactory.getAllListItems(listId).
    then( (allItems) => {
        console.log("allItems", allItems);
        $scope.items = Object.values(allItems);
    })
    .catch( (err) => {
        console.log("err", err);
    });

    $scope.data = {
    showDelete: false
    };
  
  //edit popup
  $scope.editItemPopup = function(item) {
    $scope.data = item;
    var editPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.item_name">',
        title: 'Edit the Item Name',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.item_name) {
                e.preventDefault();
              } 
              else 
                return $scope.data;
            }
          }
        ]
    });
    editPopup.then( (editedItem) => {
        console.log("editedItem", editedItem);
        fbDataFactory.EditItemInFB(editedItem)
        .then( (recievedData) => {
            console.log("recievedData", recievedData);
        })
    })
};

$scope.addNewItemPopup = () => {
    $scope.data = {};
    var addPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.newItem">',
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

       itemObj = {
          item_name: newItem,
          list_id : listId
      }
          console.log("itemObj", itemObj);
          fbDataFactory.addNewItemToFB(itemObj)
          .then( (data) => {
              $window.location.reload();

          })
          .catch( (err) => {
              console.log("err",err );
          });
      })
};

  //rearrange items
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  

  //delete one item
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
    fbDataFactory.deleteOneItemFromFB(item.item_id)
    .then( (data) => {
        console.log("data", data);
    })
  };

});