(function () {
  'use strict';

var kubernetes = angular.module('BlurAdmin.pages.kubernetes', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {

    $stateProvider
        .state('kubernetes', {
          url: '/kubernetes',
          templateUrl: 'app/pages/kubernetes/kubernetes.html',
          title: 'Kubernetes UI',
          sidebarMeta: {
            order: 800,
          },
          controller: 'KubernetesController'
        });
  }
/*
  kubernetes.controller('KubernetesController', function($scope, $rootScope, $location, DataService, $window,$uibModal) {

  var kc = this;

  $scope.currentUser = angular.fromJson($window.localStorage.currentUser);

});
*/

})();
