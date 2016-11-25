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

  kubernetes.controller('KubernetesController', function($scope, $rootScope, $location, DataService, $window,$uibModal) {

  var kc = this;

/**ng init for fetching all projects of an user**/
  kc.getProjectDetails = function() {

    kc.currentUser = angular.fromJson($window.localStorage.currentUser);

    // if local storage is empty, redirect to login page
    if(!kc.currentUser){

      var modalInstance = $uibModal.open({
        templateUrl : 'app/pages/loginNotification/loginNotification.html',
        controller : 'LoginNotificationCtrl',
        controllerAs : 'lnc',
      });

      modalInstance.result.then(function() {
        //modal success
      }, function() {
         $location.path('/login');
      });
    }
    else{
      $rootScope.profileButtonVisible=true;
       kc.userProjects = $rootScope.userAllProjects;
       kc.selectedProject = kc.userProjects[0];

       
    }
    
  };

  $scope.cardNumber = 0;
  $scope.selectProject = function($event,index, project) {
    $scope.cardNumber = index;
    kc.selectedProject = project;
  };


});

})();
