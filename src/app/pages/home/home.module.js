
(function () {
  'use strict';

  var home = angular.module('BlurAdmin.pages.home', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/app/pages/home/home.html',
          controller: 'homeController',
        });
  }

  home.controller('homeController', function($scope, $rootScope, $location, DataService, $window,$uibModal) {

    $scope.load = function() {
       // do your $() stuff here
       console.log("calling");
      // $("#homeCarousel").carousel();
   };

   //don't forget to call the load function
   $scope.load();

  });

})();
