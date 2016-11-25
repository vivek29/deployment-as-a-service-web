
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

    $rootScope.profileButtonVisible=true;
    pc.getUserProjects();

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
  pc.getUserProjects = function(){

    pc.userProjects = [{'project_id':'jdshakjdhsakd','projectName':'Project 1',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '18 Nov 2016', 'project_url':'http://12.34.56.78:9876',
                  'app_url': 'http://98.43.55.65:8000', 'masterSize':'t1.large',
                  'nodeSize':'t2.micro', 'nodeNumbers': '3', 'volumeSize': '20 GB'},
                  {'project_id':'iyyyqewyiq','projectName':'Kube Project 2',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '19 Nov 2016', 'project_url':'http://65.34.59.78:9276',
                  'app_url': 'http://88.47.59.69:8080', 'masterSize':'t1.large',
                  'nodeSize':'t2.micro', 'nodeNumbers': '2', 'volumeSize': '200 GB'},
                  {'project_id':'bndmnasdb','projectName':'Cloud Project 3',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '20 Nov 2016', 'project_url':'http://88.96.76.78:9676',
                  'app_url': 'http://48.43.22.76:8000', 'masterSize':'t1.large',
                  'nodeSize':'t2.micro', 'nodeNumbers': '3', 'volumeSize': '40 GB'},
                  {'project_id':'opoptyoptoypt','projectName':'Project 4',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '21 Nov 2016', 'project_url':'http://15.38.53.75:9696',
                  'app_url': 'http://98.43.51.69:8000', 'masterSize':'t1.large',
                  'nodeSize':'t2.micro', 'nodeNumbers': '1', 'volumeSize': '200 GB'}];

    // default
    pc.selectedProject = pc.userProjects[0];              

    DataService.getData(urlConstants.DAAS_USER+$scope.currentUser.user_id+"/projects",[])
    .success(function(data) {

      pc.userProjects = data;
      console.log(pc.userProjects);
      $window.localStorage.Projects = angular.toJson(data);

    }).error(function(err){
      console.log(err);
    });
  };

  $scope.cardNumber = 0;
  $scope.selectProject = function($event,index, project) {
    $scope.cardNumber = index;
    pc.selectedProject = project;
  };

  pc.addProject = function (){
    console.log("inside addproject");
    var modalInstance1 = $uibModal.open({
      templateUrl : 'app/pages/addProject/addProject.html',
      controller : 'AddProjectCtrl',
      controllerAs : 'apc'
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
      size : 'md',
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

  pc.goToCluster = function(project_url) {
    console.log(project_url);
    $location.path("/kubernetes");
  };
});

})();
