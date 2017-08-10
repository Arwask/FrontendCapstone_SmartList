smartApp.controller('SingleListCtrl', function($scope, $stateParams, fbDataFactory) {
    
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
  
  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
    fbDataFactory.deleteOneItemFromFB(item.item_id)
    .then( (data) => {
        console.log("data", data);
    })
  };

});