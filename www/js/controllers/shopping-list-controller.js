smartApp.controller('ShoppingListCtrl', function($scope, fbDataFactory) {
    // $scope.scanBarcode = function() {

    //     console.log("click click");
    //     $cordovaBarcodeScanner.scan()
    //     .then( (imageData) => {
    //         alert(imageData.text);
    //     })
    //     .catch( (err) => {
    //         console.log("Error", err);
    //     })
    // }

    fbDataFactory.getAllUserLists().
    then( (listData) => {
        $scope.lists = Object.values(listData.data)
        console.log("listData", $scope.lists);
    })
    .catch( (err) => {
        console.log("err", err);
    });

        $scope.data = {
    showDelete: false
    };
  
$scope.edit = function(list) {
    alert('Edit Item: ' + list.id);
};



$scope.onItemDelete = function(list) {
    console.log("list???", list);
    $scope.lists.splice($scope.lists.indexOf(list), 1);
    fbDataFactory.deleteOneListFromFB(list.list_id)
    .then( (data) => {
        console.log("data", data);
    })
};
   
});