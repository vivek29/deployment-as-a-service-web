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

    $scope.currentUser = angular.fromJson($window.localStorage.currentUser);

    $rootScope.profileButtonVisible=true;
    kc.getUserProjects();

/*
    // if local storage is empty, redirect to login page
    if(!$scope.currentUser){

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
      pc.getUserProjects();
    }
    */
  };


  /**
   * Get users project details
   */
  kc.getUserProjects = function(){

    kc.userProjects = [{'projectName':'Project 1',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '18 Nov 2016', 'project_url':'http://12.34.56.78:9876',
                  'app_url': 'http://98.43.55.65:8000', 'masterSize':'t1.large',
                  'nodeSize':'t2.micro', 'nodeNumbers': '3', 'volumeSize': '20 GB'},
                  {'projectName':'Kube Project 2',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '19 Nov 2016', 'project_url':'http://65.34.59.78:9276',
                  'app_url': 'http://88.47.59.69:8080', 'masterSize':'t1.large',
                  'nodeSize':'t2.micro', 'nodeNumbers': '2', 'volumeSize': '200 GB'},
                  {'projectName':'Cloud Project 3',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '20 Nov 2016', 'project_url':'http://88.96.76.78:9676',
                  'app_url': 'http://48.43.22.76:8000', 'masterSize':'t1.large',
                  'nodeSize':'t2.micro', 'nodeNumbers': '3', 'volumeSize': '40 GB'},
                  {'projectName':'Project 4',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '21 Nov 2016', 'project_url':'http://15.38.53.75:9696',
                  'app_url': 'http://98.43.51.69:8000', 'masterSize':'t1.large',
                  'nodeSize':'t2.micro', 'nodeNumbers': '1', 'volumeSize': '200 GB'}];

    // default
    kc.selectedProject = kc.userProjects[0];
  
  };

   $scope.selectProject = function($event, project) {
    kc.selectedProject = project;
  };


});

})();
