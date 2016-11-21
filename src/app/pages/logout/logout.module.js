
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.logout', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('logout', {
          url: '/logout',
          templateUrl: '/app/pages/logout/logout.html',
       
          title: 'Logout',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
           controller: function($scope, $rootScope,$location,$window,DataService){

           $scope.logout = function()
          {
            delete $window.localStorage.currentUser;
            $rootScope.profileButtonVisible=false;
            $location.path('/logout');
            }
          }  
        //  $scope.logout();
        });
  }

})();
