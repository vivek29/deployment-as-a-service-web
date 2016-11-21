
(function () {
  'use strict';

var dashboard = angular.module('BlurAdmin.pages.dashboard', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/dashboard/dashboard.html',
          title: 'Dashboard',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
          controller: 'ProjectController'
        });
  }

  dashboard.controller('ProjectController', function($scope, $rootScope, $location, DataService, $window,$uibModal) {

  var pc = this;

  /**ng init for fetching all projects of an user**/
  pc.getProjectDetails = function() {

    $scope.currentUser = angular.fromJson($window.localStorage.currentUser);

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
  };


  /**
   * Get users project details
   */
  pc.getUserProjects = function(){

    DataService.getData(urlConstants.DAAS_USER+$scope.currentUser.user_id+"/projects",[])
    .success(function(data) {
      
      pc.userProjects = data;
      console.log(pc.userProjects);
      $window.localStorage.Projects = angular.toJson(data);

    }).error(function(err){
      console.log(err);
    });
  };

  pc.addProject = function (){
    console.log("inside addproject");
    var modalInstance1 = $uibModal.open({
      templateUrl : 'app/pages/addProject/addProject.html',
      controller : 'AddProjectCtrl',
      controllerAs : 'apc',
      resolve : {
        user : function(){
          return $scope.currentUser;
        }
      }
    });

    modalInstance1.result.then(function() {
      pc.getUserProjects();
    }, function() {
      //modal exited 
    }); 
  };

  /**
   * Remove Project Handler
   */
  pc.removeProject=function(project){
    var modalInstance = $uibModal.open({
      templateUrl : 'app/pages/deleteProject/deleteProject.html',
      controller : 'DeleteProjectCtrl',
      controllerAs : 'dpc',
      size : 'sm',
      resolve : {
        project : function() {
          return project;
        }
      }
    });
    modalInstance.result.then(function() {
      //update user projects on dashboard
      pc.getUserProjects();
      //modal closed success
    }, function() {
      //modal exited
    });
  };

});

})();


