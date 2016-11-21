
(function () {
  'use strict';

  var page = angular.module('BlurAdmin.theme.components');

  page.directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      controller: function($scope){
      $scope.currentUser = {};
      $scope.currentUser.email = "abc@sddy.com";
      //$scope.currentUser = angular.fromJson($window.localStorage.currentUser);
      //$scope.profileButtonVisible=true;
      console.log($scope.currentUser.email);
      }
    };
  }


})();
