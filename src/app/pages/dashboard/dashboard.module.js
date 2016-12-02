
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

  dashboard.controller('ProjectController', function($scope, $rootScope,$sce, $location, DataService, $window,$uibModal) {

  var pc = this;

/*
  // REMOVE THIS AFTERWARDS - temporary store current user in local storage
  var user = {'user_id' : 5, 'firstname' : 'John', 'lastname' : 'Teller',
                'email' : 'jax@soa.com', 'password' : null, 'organization' : 'SOA',
                'dateRegistered' : 1480043600129, 'managementEC2InstanceId' : 'TEMP_ID'
                }
              ;

  $window.localStorage.currentUser = angular.toJson(user);
*/

  /**ng init for fetching all projects of an user**/
  pc.getProjectDetails = function() {

    pc.currentUser = angular.fromJson($window.localStorage.currentUser);
//    $rootScope.profileButtonVisible=true;
//    pc.getUserProjects();

    // if local storage is empty, redirect to login page
    if(!pc.currentUser){

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

    pc.currentUser = angular.fromJson($window.localStorage.currentUser);
/*
    // DUMMY DATA
    pc.userProjects = [{'project_id':'jdshakjdhsakd','projectName':'Project 1',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '18 Nov 2016', 'project_url':'http://12.34.56.78:9876',
                  'app_url': 'http://98.43.55.65:8000', 'master_size':'t1.large',
                  'node_size':'t2.micro', 'node_numbers': '3', 'volume_size': '20'},
                  {'project_id':'iyyyqewyiq','projectName':'Kube Project 2',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '19 Nov 2016', 'project_url':'http://65.34.59.78:9276',
                  'app_url': undefined, 'master_size':'t1.large',
                  'node_size':'t2.micro', 'node_numbers': '2', 'volume_size': '200'},
                  {'project_id':'bndmnasdb','projectName':'Cloud Project 3',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '20 Nov 2016', 'project_url':'http://88.96.76.78:9676',
                  'app_url': 'http://48.43.22.76:8000', 'master_size':'t1.large',
                  'node_size':'t2.micro', 'node_numbers': '3', 'volume_size': '40'},
                  {'project_id':'opoptyoptoypt','projectName':'Project 4',
                  'description': 'This is a dummy project.','cloudProvider':'AWS',
                  'dateCreated': '21 Nov 2016', 'project_url':'http://15.38.53.75:9696',
                  'app_url': 'http://98.43.51.69:8000', 'master_size':'t1.large',
                  'node_size':'t2.micro', 'node_numbers': '1', 'volume_size': '200'}];

    // default, first project in the list.
    pc.selectedProject = pc.userProjects[0];              

    // remove this afterwards
    $rootScope.userAllProjects = pc.userProjects;
*/
    DataService.getData(urlConstants.DAAS_USER+pc.currentUser.user_id+"/projects",[])
    .success(function(data) {

      // sort projects by recently created
      data.sort(function(a, b){
        return a.dateCreated - b.dateCreated
      });
      data.reverse();      

      pc.userProjects = data;
      pc.selectedProject = pc.userProjects[0];

      // TODO:
       if(pc.userProjects.length!=0){
          pc.cpuUtilUrl = "https://"+pc.selectedProject.project_username+":"+pc.selectedProject.project_password+"@"+pc.selectedProject.project_url+"/api/v1/proxy/namespaces/kube-system/services/monitoring-grafana/dashboard/db/cluster?var-nodename=&panelId=3&fullscreen";
          pc.memoryUtilUrl = "https://"+pc.selectedProject.project_username+":"+pc.selectedProject.project_password+"@"+pc.selectedProject.project_url+"/api/v1/proxy/namespaces/kube-system/services/monitoring-grafana/dashboard/db/cluster?var-nodename=&panelId=1&fullscreen";
       } 

      $rootScope.userAllProjects = pc.userProjects;
    }).error(function(err){
      console.log(err);
    });
  };

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $rootScope.$on("GetUserProjects", function(){
     pc.getUserProjects();
  });

  $scope.cardNumber = 0;
  $scope.selectProject = function($event,index, project) {
    
    pc.userProjects = pc.userProjects.move(index, 0);
    pc.selectedProject = project;

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

  pc.addProject = function (){
    var modalInstance1 = $uibModal.open({
      templateUrl : 'app/pages/addProject/addProject1.html',
      controller : 'AddProjectCtrlOne',
      controllerAs : 'apco',
      backdrop: 'static'
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

  pc.deployApp = function(project){

    var modalInstance1 = $uibModal.open({
      templateUrl : 'app/pages/addProject/addProject5.html',
      controller : 'AddProjectCtrlFifth',
      controllerAs : 'apcfi',
      resolve : {
        project : function() {
          return project;
        }
      },
      backdrop: 'static'
    });

    modalInstance1.result.then(function() {
    //  pc.getUserProjects();
    }, function() {
      $rootScope.$emit("GetUserProjects", {});
    });

  };

  pc.goToCluster = function(project_url) {
    console.log(project_url);
    $location.path("/kubernetes");
  };

  pc.openTree = function(project) {

    var modalInstance = $uibModal.open({
      templateUrl : 'app/pages/projectTree/projectTree.html',
      controller : 'ProjectTreeCtrl',
      controllerAs : 'ptc',
      size : 'lg',
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
