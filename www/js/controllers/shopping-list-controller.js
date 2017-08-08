smartApp.controller('ShoppingListCtrl', function($scope, $cordovaBarcodeScanner) {
    $scope.scanBarcode = function() {

        console.log("click click");
        $cordovaBarcodeScanner.scan()
        .then( (imageData) => {
            alert(imageData.text);
        })
        .catch( (err) => {
            console.log("Error", err);
        })
    }

   
});