// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
let smartApp = angular.module('smartApp', ['ionic']);

smartApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
smartApp.constant('FirebaseUrl', 'https://smart-list-d50e4.firebaseio.com/');
smartApp.constant('ActualURL',  "http://localhost:8100/?ionicplatform=android&http://localhost:8100/ionic-lab#")


smartApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    // abstract: true,
    templateUrl: '../templates/home.html',
    controller: 'HomeCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: '../templates/register.html',
    controller: 'RegisterCtrl'
  })
  .state('recipesView', {
    url: '/recipes/view',
    controller: 'RecipeViewCtrl',
    templateUrl: '../templates/recipe-list.html'
  })
  .state('recipeBook', {
    url: '/recipes/book',
    controller: 'RecipeBookCtrl',
    // cache: false,
    templateUrl: '../templates/recipe-book.html'
  })
  .state('favSingleRecipe', {
    url: '/recipes/favorite/{recipeId}',
    controller: 'SingleFavRecipeCtrl',
    templateUrl: '../templates/single-fav-recipe.html'
  })
  .state('mainOptions', {
    url: '/main-options',
    controller: 'MainOptionCtrl',
    templateUrl: '../templates/main-options.html'
  })
  .state('scan', {
    url: '/scanner',
    controller: 'ScanController',
    templateUrl: '../templates/scan.html'
  })
  .state('selector', {
    url: '/selector-list/{recipeId}',
    controller: 'SelectorCtrl',
    templateUrl: '../templates/selector-list.html'
  })
  .state('singleListView', {
    url: '/shopping-list/{shoppingListId}',
    controller: 'SingleListCtrl',
    templateUrl: '../templates/single-list-view.html'
  })
  .state('shoppingList', {
    url: '/shopping-list',
    controller: 'ShoppingListCtrl',
    templateUrl: '../templates/shopping-list.html'
  })
  .state('singleRecipe', {
    url: '/recipe/{recipeId}',
    controller: 'SingleRecipeCtrl',
    templateUrl: '../templates/single-recipe.html'
  });

  $urlRouterProvider.otherwise("/");

  });
