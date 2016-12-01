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

  kubernetes.controller('KubernetesController', function($scope, $rootScope,$sce, $location, DataService, $window,$uibModal) {

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
       kc.kube_url = "https://"+kc.selectedProject.project_username+":"+kc.selectedProject.project_password+"@"+kc.selectedProject.project_url+"/ui";  
    }
    
  };

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.cardNumber = 0;
  $scope.selectProject = function($event,index, project) {
    
    kc.userProjects = kc.userProjects.move(index, 0);
    kc.selectedProject = project;
    kc.kube_url = "https://"+kc.selectedProject.project_username+":"+kc.selectedProject.project_password+"@"+kc.selectedProject.project_url+"/ui";

    $window.scrollTo(0, 0);
    angular.element("#scrollToTop")[0].scrollTop=0;    
  };

  Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; 
  };


});

})();
