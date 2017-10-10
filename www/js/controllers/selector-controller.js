'use strict';

smartApp.controller('SelectorCtrl', function(
  $scope,
  $q,
  $stateParams,
  $ionicLoading,
  $state,
  $window,
  $location,
  $ionicPopup,
  fbDataFactory,
  RecipeFactory,
  UserFactory
) {
  $scope.NavTitle = 'Selector List';

  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };

  $scope.show($ionicLoading);

  let RecipeId = $stateParams.recipeId;
  let responseArr = [];
  let listIdArr = [];
  fbDataFactory.getAllUserLists().then(listData => {
    $scope.lists = Object.values(listData.data); //<----get all lists for a user
    $scope.hide($ionicLoading);
  });

  // gets the item to be updated and updates it in firebase
  $scope.update = item => {
    $scope.selectedList = item.selected;
  };
  let selectedItemArr = [];

  $scope.getSelectedItems = item => {
    // When user selects an item, it checks to see if the item already exists in the selected array. if it was selected once, user is trying to unselect an item so pop it out of the list
    if (selectedItemArr.indexOf(item.name) == -1) selectedItemArr.push(item.name);
    else {
      let index = selectedItemArr.indexOf(item.name);
      selectedItemArr.splice(index, 1);
    }
  };

  // makes sure that user has selected a list to add the items to. And shows a pop up if they did not
  $scope.addToShoppingList = () => {
    if ($scope.selectedList == ('' || null || undefined)) {
      var alertPopup = $ionicPopup.alert({
        title: 'You have not selected a list',
        template: 'Please select a list you would like to add items to'
      });
      alertPopup.then(function(res) {});
    } else {
      if (selectedItemArr.length > 0) {
        let arr = selectedItemArr.map((item, i) => {
          //<----takes all the selected items on the list
          let tempObj = {
            item_name: item,
            list_id: $scope.selectedList.list_id
          };
          fbDataFactory.addItemToFB(tempObj).then(dataItem => {
            let url = $window.location.href.split('/');
            url.pop();
            url.pop();
            url = url.join('/');
            $window.location.href = `${url}shopping-list/${$scope.selectedList.list_id}`;
            $window.location.reload();
          });
        });
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'You have not selected any items',
          template: 'Please select items you would like to add to the list'
        });
        alertPopup.then(function(res) {});
      }
    }
  };

  RecipeFactory.getSingleRecipeById(RecipeId).then(dataRecipe => {
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
              //don't allow the user to click DONE unless they enter something
              e.preventDefault();
            } else {
              return $scope.data.newList;
            }
          }
        }
      ]
    });

    myPopup.then(function(res) {
      if (res != (null || '' || undefined)) {
        $scope.show($ionicLoading);

        let currentUser = null;
        let listObj = {};
        UserFactory.isAuthenticated().then(user => {
          currentUser = UserFactory.getUser();
          listObj = {
            listName: res,
            uid: currentUser
          };

          fbDataFactory
            .addNewListToFB(listObj)
            .then(data => {
              $window.location.reload();
              $scope.hide($ionicLoading);
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    });
  };
});
